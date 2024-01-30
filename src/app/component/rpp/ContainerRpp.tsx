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
    <div className="w-full flex justify-center">
      <div className="w-[80%]">
        <textarea
          placeholder="Matematika"
          className="text-gray-600 w-full border-[1.5px] px-5 border-gray-200 dark:border-gray-500 rounded-md appearance-none"
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
        <div className="whitespace-pre-wrap ">{summary}</div>
      </div>
    </div>
  );
}
