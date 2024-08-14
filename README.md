# Minimal failure case for cacheing models

If testing in node then run `npx tsx scripts/test-cache.ts` and notice that the first embedding downloads the model

If testing in bun then run `bun test` and notice that it *also* fails to cache the model.
