"use client";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import React, { useRef, useState } from "react";
import Markdown from "markdown-to-jsx";
import { useReactToPrint } from "react-to-print";
import JSConfetti from "js-confetti";

export default function ContainerRpp() {
  const [summary, setSummary] = useState("");
  const [mapel, setMapel] = useState("");
  const [namaSd, setNamaSd] = useState("");
  const [kelas, setKelas] = useState("");
  const [namaSekolah, setNamaSekolah] = useState("");
  const [semester, setSemester] = useState("");
  const [materi, setMateri] = useState("");
  const [waktu, setWaktu] = useState("");
  const [namaGuru, setNamaGuru] = useState("");
  const [nipGuru, setNipGuru] = useState("");
  const [namaKepalaSekolah, setNamaKepalaSekolah] = useState("");
  const [nipKepalaSekolah, setNipKepalaSekolah] = useState("");
  const [tujuanPembelajaran, setTujuanPembelajaran] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({
    content: () => ref.current,
  });

  const startChat = async () => {
    setLoading(true);
    setSummary("");

    const data = await fetch("/data/rpp.txt");
    const text = await data.text();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo-0125",
          messages: [
            {
              role: "system",
              content: `You are a language model that can create an RPP (Rencana pelaksanaan pembelajaran) from indonesa and use indonesian languange as your responds, you will be provide by link to a certain data so you can make RPP around and base on that link to a data and other data that you heve. Make the responds on md format`,
            },
            {
              role: "user",
              content: `create RPP with main subject is ${mapel},nama sekolah = ${namaSekolah} nama sd = ${namaSd}, kelas = ${kelas}, semester = ${semester}, waktu = ${waktu}, tujuan pembelajaran = ${tujuanPembelajaran}, an the goals of that learning is tujuan pembelajaran = ${tujuanPembelajaran} base on this format ${text} change all the thing inside that format so the subject is base on this ${materi}. make it on md format you need to make it on a table`,
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
      // cofetti evvect
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        confettiColors: ["#a855f7", "#3b0764", "#ef4444", "#ec4899", "#2563eb"],
      });
      const data = res.body;
      if (!data) {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(summary);
  return (
    <div className="w-full flex justify-center bg-[#FAFAFA] h-full min-h-screen py-[3rem] z-10">
      <div className="w-[90%] space-y-[2rem] z-10">
        <div className="bg-white rounded-[1rem] p-[2rem] drop-shadow-3xl px-[3rem] py-[2rem] border-[1.5px] border-black md:flex md:space-x-[2rem] z-10 space-y-[2rem]">
          <div className="md:space-y-[1rem] text-[.8rem] font-normal md:w-[40%] z-10">
            <h1 className="text-[1rem] font-bold">Buat RPP</h1>
            <div className="grid grid-cols-2 gap-[1.5rem]">
              <div className="space-y-[.5rem]">
                <label htmlFor="mataPelajaran">Nama Sekolah</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="nama sekolah"
                  id=""
                  value={namaSekolah}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setNamaSekolah(e.target.value);
                  }}
                />
              </div>
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
                <label htmlFor="kd">Kelas</label>
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
              <div className="space-y-[.5rem]">
                <label htmlFor="sk">Semester</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="semester"
                  id=""
                  value={semester}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setSemester(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="metodePembelajaran">Materi</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="materi"
                  id=""
                  value={materi}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setMateri(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="mataPelajaran">Waktu</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="waktu"
                  id=""
                  value={waktu}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setWaktu(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="kelas">Nama Guru</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="nama guru"
                  id=""
                  value={namaGuru}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setNamaGuru(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="kelas">NIP Guru</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="nip guru"
                  id=""
                  value={nipGuru}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setNipGuru(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="kelas">Nama Kelapa Sekolah</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="nama kepala sekolah"
                  id=""
                  value={namaKepalaSekolah}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setNamaKepalaSekolah(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-[.5rem]">
                <label htmlFor="kelas">NIP Kepala Sekolah</label>
                <input
                  placeholder=""
                  className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                  name="nip kepala sekolah"
                  id=""
                  value={nipKepalaSekolah}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      startChat();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setNipKepalaSekolah(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="space-y-[.5rem]">
              <label htmlFor="kelas">Tujuan Pembelajaran</label>
              <textarea
                placeholder=""
                className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
                name="tujuan pembelajaran"
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
            <div>
              <button
                onClick={startChat}
                className="w-full bg-purple-500 border border-[1.8px] border-black rounded-md py-[1rem] flex justify-center drop-shadow-3xl mt-6"
              >
                Buat RPP
              </button>
            </div>
          </div>
          <div className="bg-gray-200 md:w-[60%] p-[2rem] h-[40rem] overflow-y-scroll relative">
            <div className="fixed bottom-5 transform-translate-x-1/2 -translate-y-1/2 w-[45%] px-[1rem] space-x-[1rem] flex text-[.6rem]">
              <button
                onClick={print}
                className="bg-purple-500 border border-[1.8px] border-black rounded-md py-[1rem] flex justify-center drop-shadow-3xl w-full"
              >
                Print
              </button>
              <div className="bg-purple-500 border border-[1.8px] border-black rounded-md py-[1rem] flex justify-center drop-shadow-3xl w-full">
                Copy
              </div>
            </div>
            {/* <div className="bg-white w-full p-[1rem] text-[.5rem] white whitespace-pre-wrap"> */}
            <div
              className="bg-white w-full p-[4rem] text-[.5rem] white font-serif"
              ref={ref}
            >
              <style type="text/css">
                {`
                   @page {
                     size: auto;
                     margin: 10mm 10mm 10mm 10mm;
                   }
                   body {
                     margin: 0;
                     padding: 0;
                   }
                     
                   `}
              </style>
              <div className="space-y-2">
                <h1 className={`text-center ${loading ? "block" : "hidden"}`}>
                  RENCANA PELAKSANAAN PEMBELAJARAN (RPP)
                </h1>
                <article className="prose prose-li:text-[.5rem] prose-h1:center prose-p:text-[.5rem] prose lg:prose-xl max-w-5xl mx-auto prose-headings:text-[.5rem] prose-tr:text-[.5rem] prose-th:bg-blue-200 prose-th:p-[.5rem] prose-td:border-[1px] prose-td:p-[.5rem] prose-h1:hidden">
                  <Markdown>{summary}</Markdown>
                </article>
                <div
                  className={`flex justify-between px-[1rem] ${
                    loading ? "block" : "hidden"
                  }`}
                >
                  <div className="space-y-[2.5rem]">
                    <div>{namaGuru}</div>
                    <div>{nipGuru}</div>
                  </div>
                  <div className="space-y-[2.5rem]">
                    <div>{namaKepalaSekolah}</div>
                    <div>{nipKepalaSekolah}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
