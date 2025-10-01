

import * as llm from 'multi-llm-ts'
import { config } from 'dotenv'
import ReadFilePlugin from './read.ts'
import WriteFilePlugin from './write.ts'

config()

const provider: string = process.argv[2] || 'openai'
const modelName: string = process.argv[3] || 'gpt-4.1'
const apiKey: string = process.env[`${provider.toUpperCase()}_API_KEY`] || ''
if (!apiKey) {
  console.error(`Error: ${provider.toUpperCase()}_API_KEY not found in environment variables.\n`)
  console.error(`Usage: node index.ts [provider] [model]`)
  console.error(`  provider: openai, anthropic, google, etc. (default: openai)`)
  console.error(`  model: model name (default: gpt-4.1)`)
  console.error(`\nExample: OPENAI_API_KEY=your-key node index.ts openai gpt-4o`)
  process.exit(1)
}

console.log("Starting LLM engine with file read/write plugins...")
llm.logger.disable()

const model: llm.LlmModel = llm.igniteModel(provider, modelName, { apiKey })
model.addPlugin(new ReadFilePlugin())
model.addPlugin(new WriteFilePlugin())

const stream = await model.generate([
    new llm.Message('system', 'You are a helpful assistant that helps people find information.'),
    new llm.Message('user', 'Read read.ts and convert it to C++ and write it to read.cpp.'),
  ],
)

for await (const chunk of stream) {
  if (chunk.type === 'tool') {
    process.stdout.write(`\nTool ${chunk.name}: ${chunk.status}\n`)
  } else if (chunk.type === 'content') {
    process.stdout.write(chunk.text)
  }
}