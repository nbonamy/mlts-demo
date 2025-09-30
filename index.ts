

import * as llm from 'multi-llm-ts'
import { config } from 'dotenv'
import ReadFilePlugin from './read.ts'
import WriteFilePlugin from './write.ts'

config()

console.log("Starting LLM engine with file read/write plugins...")
llm.logger.disable()

const provider: string = process.argv[2] || 'openai'
const model: string = process.argv[3] || 'gpt-4.1'
const apiKey: string = process.env[`${provider.toUpperCase()}_API_KEY`] || ''
if (!apiKey) {
  console.error(`API key for provider ${provider} not found in environment variables.`)
  process.exit(1)
}

const engine: llm.LlmEngine = llm.igniteEngine(provider, { apiKey })
engine.addPlugin(new ReadFilePlugin())
engine.addPlugin(new WriteFilePlugin())

const stream = await engine.generate(model, [
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