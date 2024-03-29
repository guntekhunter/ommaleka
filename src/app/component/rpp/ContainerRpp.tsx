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
import ModalFinishRPP from "../modal/ModalFinishRPP";
import ButtonArticle from "../button/ButtonArticle";
import Input from "../input/Input";
import Image from "next/image";

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
  const [modal, setModal] = useState(false);
  const [template, setTemplate] = useState("/data/rpp.txt");
  const [sign, setSign] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({
    content: () => ref.current,
  });

  const startChat = async () => {
    setLoading(true);
    setSign(false);
    setSummary("");

    const data = await fetch(template);
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
              content: `take a break and then create RPP with main subject is ${mapel},nama sekolah = ${namaSekolah} nama sd = ${namaSd}, kelas = ${kelas}, semester = ${semester}, waktu = ${waktu}, tujuan pembelajaran = ${tujuanPembelajaran}, an the goals of that learning is tujuan pembelajaran = ${tujuanPembelajaran}, base on this format ${text} change all the thing inside that format so the subject is base on this ${materi}. make it on md format you need to make it on a table`,
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
      // show the modal here
      setModal(true);
      setSign(true);
      setTimeout(() => {
        setModal(false);
      }, 3000);

      const data = res.body;
      if (!data) {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: any, setterFunction: any) => {
    e.preventDefault();
    setterFunction(e.target.value);
  };

  const selected = (e: any) => {
    setTemplate(e);
  };
  return (
    <div className="w-full flex justify-center bg-[#FAFAFA] h-full min-h-screen py-[3rem] z-0">
      <div className="w-[90%] space-y-[2rem] z-0">
        <div className="bg-white rounded-[1rem] p-[2rem] drop-shadow-3xl px-[3rem] py-[2rem] border-[1.5px] border-black md:block md:space-y-[2rem] z-0 space-y-[2rem] block">
          <h1 className="text-[1rem] font-bold">Pilih Template RPP</h1>
          <div className="grid grid-cols-2 gap-[1.5rem]">
            <button
              onClick={(e) => {
                selected("/data/rpp-2.txt");
              }}
              className="bg-white rounded-[1rem] p-[2rem] drop-shadow-3xl px-[3rem] py-[2rem] border-[1.5px] border-black md:flex md:space-x-[2rem] z-0 space-y-[2rem]"
            >
              <Image
                className="object-cover h-full w-full ..."
                width={500}
                height={500}
                src="/rpp-1.jpg"
                alt={""}
              />
            </button>
            <button
              onClick={(e) => {
                selected("/data/rpp.txt");
              }}
              className="bg-white rounded-[1rem] p-[2rem] drop-shadow-3xl px-[3rem] py-[2rem] border-[1.5px] border-black md:flex md:space-x-[2rem] z-0 space-y-[2rem]"
            >
              <Image
                className="object-cover h-full w-full ..."
                width={500}
                height={500}
                src="/rpp-2.jpg"
                alt={""}
              />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-[1rem] p-[2rem] drop-shadow-3xl px-[3rem] py-[2rem] border-[1.5px] border-black md:flex md:space-x-[2rem] z-0 space-y-[2rem]">
          <div className="md:space-y-[1rem] text-[.8rem] font-normal md:w-[40%] z-10">
            <h1 className="text-[1rem] font-bold">Buat RPP</h1>
            <div className="grid grid-cols-2 gap-[1.5rem]">
              <Input
                value={namaSekolah}
                onChange={(e: any) => handleInputChange(e, setNamaSekolah)}
              >
                Nama Sekolah
              </Input>
              <Input
                value={mapel}
                onChange={(e: any) => handleInputChange(e, setMapel)}
              >
                Mata Pelajaran
              </Input>
              <Input
                value={kelas}
                onChange={(e: any) => handleInputChange(e, setKelas)}
              >
                Kelas
              </Input>
              <Input
                value={semester}
                onChange={(e: any) => handleInputChange(e, setSemester)}
              >
                Semester
              </Input>
              <Input
                value={materi}
                onChange={(e: any) => handleInputChange(e, setMateri)}
              >
                Materi
              </Input>
              <Input
                value={waktu}
                onChange={(e: any) => handleInputChange(e, setWaktu)}
              >
                Waktu
              </Input>
              <Input
                value={namaGuru}
                onChange={(e: any) => handleInputChange(e, setNamaGuru)}
              >
                Nama Guru
              </Input>
              <Input
                value={nipGuru}
                onChange={(e: any) => handleInputChange(e, setNipGuru)}
              >
                NIP Guru
              </Input>
              <Input
                value={namaKepalaSekolah}
                onChange={(e: any) =>
                  handleInputChange(e, setNamaKepalaSekolah)
                }
              >
                Nama Kelapa Sekolah
              </Input>
              <Input
                value={nipKepalaSekolah}
                onChange={(e: any) => handleInputChange(e, setNipKepalaSekolah)}
              >
                NIP Kelapa Sekolah
              </Input>
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
              <ButtonArticle className="" onClick={startChat}>
                Buat RPP
              </ButtonArticle>
            </div>
          </div>
          <div className="bg-gray-200 md:w-[60%] p-[2rem] h-[40rem] overflow-y-scroll relative scrollbar-thin scrollbar-track-black scrollbar-thumb-purple-500 py-[1rem] dark:scrollbar-track-purple-500 flex-col-reverse flex-1 flex">
            <div className="fixed bottom-5 transform-translate-x-1/2 -translate-y-1/2 w-[45%] px-[1rem] space-x-[1rem] flex text-[.6rem]">
              <ButtonArticle onClick={print} className="">
                Print
              </ButtonArticle>
              <ButtonArticle onClick={null} className="">
                Copy
              </ButtonArticle>
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
                    sign ? "opacity-1" : "hidden opacity-0"
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
      <div
        className={`transition-opacity duration-300 ${
          modal ? "opacity-1" : "hidden opacity-0"
        }`}
      >
        <ModalFinishRPP />
      </div>
    </div>
  );
}
