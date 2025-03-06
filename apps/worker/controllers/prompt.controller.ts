import { asyncHandler } from "common/asyncHandler";
import prisma from "db/client"

const createPrompt = asyncHandler( async (req, res) => {
  try {
    const { prompt, projectId } = req.body;

    const newPrompt = await prisma.prompts.create({
      data: {
        prompt,
        projectId
      }
    });

    return res.status(201).json({
      message: "prompt created successfully",
      newPrompt
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

export { createPrompt };