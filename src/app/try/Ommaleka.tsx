"use client";
import React, { useEffect } from "react";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export default function Ommaleka() {
  useEffect(() => {
    const fetchData = async () => {
      const model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
      });

      const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a helpful assistant"],
        ["human", "{input}"],
      ]);

      const chain = prompt.pipe(model);

      try {
        const response = await chain.invoke({
          input: "Hello",
        });
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <div></div>
    </div>
  );
}
