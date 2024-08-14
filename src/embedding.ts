import { pipeline, env } from '@huggingface/transformers';

env.cacheDir = "./cache"
env.localModelPath = "./cache/models"

const defaultModel = "Snowflake/snowflake-arctic-embed-m"

export type Embedding = number[]

export interface Embedder {
  createEmbedding(content: string): Promise<Embedding>
}

export class HuggingFaceEmbedder implements Embedder {

  pipePromise: Promise<any>

  constructor(modelName = defaultModel) {
    this.pipePromise = pipeline('feature-extraction', modelName)
  }

  async createEmbedding(content: string): Promise<Embedding> {
    console.time("createEmbedding")
    try {
      const pipe = await this.pipePromise
      const embedding = await pipe(content.replace(/\n/g, " ").trim(), { pooling: 'cls', normalize: true, dims: [1, 768] })
      return embedding.tolist()[0]
    } catch (err: any) {
      throw err
    } finally {
      console.timeEnd("createEmbedding")
    }
  }
}

let memoizedEmbedder: HuggingFaceEmbedder | null = null;

export function getDefaultEmbedder(): HuggingFaceEmbedder {
  if (!memoizedEmbedder) {
    memoizedEmbedder = new HuggingFaceEmbedder(defaultModel);
  }
  return memoizedEmbedder;
}

/*
  This is a null embedder that just returns an empty array.
  It's useful for when you are never going to search memory, but only want to 
  store and retrieve recent memories.
*/
export const nullEmbedder: Embedder = {
  createEmbedding: (_content: string) => {
    return Promise.resolve([])
  }
}
