import { Groq } from "groq-sdk";
const GROQ_API = process.env.GROQ_API_KEY;

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

console.log(GROQ_API);

export const requestGroqAi = async (content) => {
  const reply = await groq.chat.completitions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
  console.log(reply);

  return reply;
};
