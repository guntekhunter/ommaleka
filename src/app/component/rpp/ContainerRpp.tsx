"use client";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import Markdown from "markdown-to-jsx";
import React, { useState } from "react";

export default function ContainerRpp() {
  const [summary, setSummary] = useState("");
  const [input, setInput] = useState<string>("");
  const [mapel, setMapel] = useState("");
  const [kd, setKd] = useState("");
  const [sk, setSk] = useState("");
  const [metodePembelajaran, setMetodePembelajaran] = useState("");
  const [tujuanPembelajaran, setTujuanPembelajaran] = useState("");
  const [kelas, setKelas] = useState("");

  const startChat = async () => {
    const data = await fetch("/data/data.txt");
    const text = await data.text();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a language model that can create an RPP (Rencana pelaksanaan pembelajaran) from indonesa and use indonesian languange as your responds, you will be provide by link to a certain data so you can make RPP around and base on that link to a data and other data that you heve. Make the outpus as an mardawn format`,
            },
            {
              role: "user",
              content: `the RPP is should talk about mata pelajaran = ${mapel}, Kompetensi Dasar ${kd}, standar kompetensi = ${sk}, metode pembelajaran = ${metodePembelajaran}, tujuan pembelajaran = ${tujuanPembelajaran}, kelas = ${kelas} that is the example of the RPP xml format = ${text}, on the kegiatan pembelajaran part you need to make it on table so the information is clear to read.`,
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
    <div className="w-full flex justify-center bg-[#FAFAFA] h-full min-h-screen py-[3rem]">
      <div className="w-[80%] space-y-[2rem]">
        <div className="bg-white rounded-[1rem] p-[2rem] drop-shadow-3xl px-[3rem] py-[2rem] border-[1.5px] border-black">
          <div className="space-y-[1rem] text-[.8rem] font-normal">
            <h1 className="text-[1rem] font-bold">Buat RPP</h1>
            <div className="grid grid-cols-3 gap-[1.5rem]">
              <div className="space-y-[.5rem]">
                <label htmlFor="mataPelajaran">Mata Pelajaran</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="mataPelajaran"
                  id=""
                  value={mapel}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setMapel(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="kd">KD (Kompetensi Dasar)</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="kd"
                  id=""
                  value={kd}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setKd(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="sk">SK (Standar Kompetensi)</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="sk"
                  id=""
                  value={sk}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setSk(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="metodePembelajaran">Metode Pembelajaran</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="metodePembelajaran"
                  id=""
                  value={metodePembelajaran}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setMetodePembelajaran(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="mataPelajaran">Tujuan Pembelajaran</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="mataPelajaran"
                  id=""
                  value={tujuanPembelajaran}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setTujuanPembelajaran(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="kelas">Kelas</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="kelas"
                  id=""
                  value={kelas}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setKelas(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button
                onClick={startChat}
                className="w-full bg-white border border-[1.8px] border-black rounded-md py-[1rem] flex justify-center drop-shadow-3xl mt-6"
              >
                Buat RPP
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[1rem] p-[2rem] drop-shadow-3xl px-[3rem] py-[2rem] border-[1.5px] border-black">
          {/* <div className="whitespace-pre-wrap "> */}
          <Markdown>{summary}</Markdown>
        </div>
      </div>
    </div>
  );
}
