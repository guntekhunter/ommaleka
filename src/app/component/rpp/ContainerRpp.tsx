"use client";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import React, { useState } from "react";

export default function ContainerRpp() {
  const [summary, setSummary] = useState("");
  const [input, setInput] = useState<string>("");

  const startChat = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a language model that can create an RPP (Rencana pelaksanaan pembelajaran) from indonesa and use indonesian languange as your responds, the theme of the RPPS is base on this ${input}`,
            },
            {
              role: "user",
              content: `${input}`,
            },
          ],
          temperature: 0,
          stream: true,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const body = res.body;
      if (!body) {
        return;
      }

      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          try {
            const text = JSON.parse(data).text ?? "";
            setSummary((prev) => prev + text);
          } catch (e) {
            console.error(e);
          }
        }
      };

      const reader = body.getReader();
      const decoder = new TextDecoder();
      const parser = createParser(onParse);
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        parser.feed(chunkValue);
      }

      const data = res.body;
      if (!data) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(summary);
  return (
    <div>
      ommaleka
      <textarea
        placeholder="Contoh: Teknologi dapat diartikan sebagai penerapan ilmu pengetahuan, penemuan, dan keterampilan yang digunakan untuk merancang, membuat, dan memanfaatkan alat, mesin, perangkat lunak, sistem, dan proses untuk memecahkan masalah dan memenuhi kebutuhan pendidikan....."
        className="text-gray-600 w-full border-[1.5px] px-5 border-gray-200 dark:border-gray-500 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] mt-[1.4rem] whitespace-pre-wrap dark:scrollbar-track-[#0F0F0F] dark:text-white dark:bg-black"
        name=""
        id=""
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            startChat();
          }
        }}
        onChange={(e) => {
          e.preventDefault();
          setInput(e.target.value);
        }}
      />
      <div className="whitespace-pre-wrap">{summary}</div>
    </div>
  );
}
