
import * as llm from 'multi-llm-ts'

export default class ReadFilePlugin extends llm.Plugin {

  getName(): string {
    return "ReadFilePlugin"
  }

  getDescription(): string {
    return "A plugin that reads the content of a file given its path."
  }

  getPreparationDescription(tool: string): string {
    return `Preparing to read the file at the specified path.`
  }

  getRunningDescription(tool: string, args: any): string {
    return `Reading the file located at: ${args.path}`
  }

  getCompletedDescription(tool: string, args: any, results: any): string | undefined {
    return `Successfully read the file at: ${args.path}`
  }

  getParameters(): llm.PluginParameter[] {
    return [
      {
        name: "path",
        type: "string",
        description: "The path to the file to be read.",
        required: true
      }
    ]
  }

  async execute(context: llm.PluginExecutionContext, parameters: any): Promise<any> {
    const fs = await import('fs/promises')
    const path = parameters.path
    try {
      const content = await fs.readFile(path, 'utf-8')
      return { content }
    } catch (error) {
      console.error(`Error reading file at ${path}:`, error)
      throw new Error(`Failed to read file at ${path}`)
    }
  }

}

