# multi-llm-ts Demo

A demonstration project showcasing the capabilities of [multi-llm-ts](https://github.com/nbonamy/multi-llm-ts), a TypeScript library for unified access to multiple LLM provider APIs.

## Features

This demo demonstrates:
- Using the `LlmModel` abstraction for simplified API calls
- Plugin system for extending LLM capabilities with custom tools
- Function calling across different LLM providers
- Streaming responses

The demo includes two custom plugins:
- **ReadFilePlugin**: Allows the LLM to read file contents
- **WriteFilePlugin**: Allows the LLM to write content to files

## Prerequisites

- Node.js installed
- API key for your chosen LLM provider (OpenAI, Anthropic, Google, etc.)

## Installation

```bash
npm install
```

## Usage

```bash
PROVIDER_API_KEY=your-api-key node index.ts [provider] [model]
```

### Parameters

- `provider` (optional): LLM provider to use (default: `openai`)
  - Supported: `openai`, `anthropic`, `google`, `mistralai`, `groq`, `cerebras`, `deepseek`, `xai`, `ollama`, etc.
- `model` (optional): Model name (default: `gpt-4.1`)

### Examples

**Using OpenAI:**
```bash
OPENAI_API_KEY=sk-... node index.ts openai gpt-4o
```

**Using Anthropic:**
```bash
ANTHROPIC_API_KEY=sk-ant-... node index.ts anthropic claude-3-5-sonnet-20241022
```

**Using Google:**
```bash
GOOGLE_API_KEY=... node index.ts google gemini-2.0-flash-exp
```

**Using local Ollama:**
```bash
node index.ts ollama llama3.2
```

### Using .env file

You can also create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
```

Then run:
```bash
node index.ts anthropic claude-3-5-sonnet-20241022
```

## What it does

The demo asks the LLM to:
1. Read the `read.ts` file
2. Convert it to C++
3. Write the result to `read.cpp`

This demonstrates how the LLM can autonomously use the provided plugins (tools) to complete complex tasks involving file system operations.

## Code Structure

- `index.ts` - Main application demonstrating `LlmModel` usage
- `read.ts` - Plugin for reading files
- `write.ts` - Plugin for writing files

## License

Apache-2.0
