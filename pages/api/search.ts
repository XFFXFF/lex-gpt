import { PineconeStore } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeClient } from "@pinecone-database/pinecone";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {};
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.log("start search")
    // Query 
    const query = req.body.query;

    // Vector DB 
      const pinecone = new PineconeClient();
      await pinecone.init({
        environment: "us-central1-gcp", 
        apiKey: process.env.PINECONE_API_KEY ?? "",
      });
      const index = pinecone.Index("zhangxiaoyu");
      console.log(`index: ${index}`)
      const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({}, { basePath: process.env.OPENAI_BASE_PATH }), {pineconeIndex: index},
      );
      // Return chunks to display as references 
      const results = await vectorStore.similaritySearch(query, 7);
      console.log("end search")
      res.status(200).send(results); 
    }

export default handler;