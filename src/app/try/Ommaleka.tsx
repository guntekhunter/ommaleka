"use client";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { useEffect, useState } from "react";
import fetchData from "../api/groq/route";



export default function Ommaleka() {
  const [response, setResponse] = useState<string>("");
  
  useEffect(() => {
    fetchData("buatkan saya artikel")
      .then((res:any) => {
        return setResponse(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  return (
    <div>
      <div>{response}</div>
    </div>
  );
}
