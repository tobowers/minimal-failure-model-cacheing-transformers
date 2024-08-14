import { expect, it, describe } from "bun:test"
import { getDefaultEmbedder } from "../src/embedding"

describe("cacheing", () => {
  it('caches', async () => {
    const text = "Hello, world!"
    const embedder = getDefaultEmbedder()
    console.time("first embedding")
    const embedding1 = await embedder.createEmbedding(text)
    console.timeEnd("first embedding")

    console.time("second embedding")
    const embedding2 = await embedder.createEmbedding(text)
    console.timeEnd("second embedding")

    expect(embedding1).toHaveLength(768)
    expect(embedding2).toHaveLength(768)
  }, {
    timeout: 30_000
  })
})