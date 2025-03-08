import anthropic from "llm/anthropic";
import { 
  questionPrompt,
  basePrompt,
  reactBasePrompt,
  nodeBasePrompt
} from "common/questionPrompt";

const getTemplate = async (prompt: string) => {
  try {
    
    const response = await anthropic.messages.create({
      messages: [{ role: "user", content: prompt }],
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 200,
      system: questionPrompt
    });

    const answer = response.content
      .filter(item => item.type === "text")
      .map(item => item.text)
      .join("\n");
    
    if(answer === "react"){
      return {
        prompt: [basePrompt, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompt: [reactBasePrompt]
      }
    }

    if(answer === "node"){
      return {
        prompt: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompt: [nodeBasePrompt]
      }
    };

    return { message: "Hey! You can only create React or Node.js projects here."};

  } catch (error) {
    
    console.log(error);
    throw new Error("Invalid Request, only React or Node.js projects available");
  }
};

export { getTemplate };