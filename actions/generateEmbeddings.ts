"use server";

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId: string) {
  auth().protect();

  // turn a PDF into embeddings [0.012324, 0.234234, ...] which turns PDF into a string of numbers
  // and the reason we do that is because LLMs (large language models ) such as langue chain and chat gpt only can understand the input of something
  await generateEmbeddingsInPineconeVectorStore(docId);
  revalidatePath("/dashboard");
  return {completed: true}
}
