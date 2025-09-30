
import * as llm from 'multi-llm-ts'

export default class WriteFilePlugin extends llm.Plugin {

  isEnabled(): boolean {
    return true
  }

  getName(): string {
    return "WriteFilePlugin"
  }
  getDescription(): string {
    return "A plugin that writes content to a file given its path."
  }
  getPreparationDescription(tool: string): string {
    return `Preparing to write to the file at the specified path.`
  }
  getRunningDescription(tool: string, args: any): string {
    return `Writing to the file located at: ${args.path}`
  }
  getCompletedDescription(tool: string, args: any, results: any): string | undefined {
    return `Successfully wrote to the file at: ${args.path}`
  }
  getParameters(): llm.PluginParameter[] {
    return [
      {
        name: "path",
        type: "string",
        description: "The path to the file to be written.",
        required: true
      },
      {
        name: "content",
        type: "string",
        description: "The content to write to the file.",
        required: true
      }
    ]
  }
  async execute(context: llm.PluginExecutionContext, parameters: any): Promise<any> {
    const fs = await import('fs/promises')
    const path = parameters.path
    try {
      await fs.writeFile(path, parameters.content, 'utf-8')
      return { success: true }
    } catch (error) {
      console.error(`Error writing file at ${path}:`, error)
      throw new Error(`Failed to write file at ${path}`)
    }
  }

}

