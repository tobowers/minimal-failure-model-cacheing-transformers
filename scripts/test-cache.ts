import { getDefaultEmbedder } from "../src/embedding"

export const testCache = async () => {

  const text = "Hello, world!"
  const embedder = getDefaultEmbedder()
  console.time("first embedding")
  const embedding1 = await embedder.createEmbedding(text)
  console.timeEnd("first embedding")

  console.time("second embedding")
  const embedding2 = await embedder.createEmbedding(text)
  console.timeEnd("second embedding")
}


testCache().then(() => {
  console.log("done")
}).catch((err) => {
  console.error(err)
})