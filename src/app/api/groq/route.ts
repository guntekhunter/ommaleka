import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


const fetchData = (inputText: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const model = new ChatGroq({
          apiKey: "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",
        });
  
        const prompt = ChatPromptTemplate.fromMessages([
          ["system", "You are a helpful assistant"],
          ["human", inputText],
        ]);
  
        const outputParser = new StringOutputParser();
        const chain = prompt.pipe(model).pipe(outputParser);
  
        const responseStream = await chain.stream({
          input: "Hello",
        });
  
        let res = "";
        for await (const item of responseStream) {
          res += item;
        }
  
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

export default fetchData;