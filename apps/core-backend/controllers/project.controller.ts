import prisma from "db/client"
import asyncHandler from "../utils/asyncHandler";

const createProject = asyncHandler( async (req, res) => {
  
  const { prompt } = req.body;
  const description = prompt.split("\n")[0];

  const email = (req as any).user.email;

  const userId = await prisma.users.findFirst({
    where: { email },
    select: { id: true }
  });

  if(!userId){
    return res.status(404).json({
      message: "User does not exist"
    });
  };

  const projectData = await prisma.projects.create({
    data: {
      description,
      userId: userId.id
    },
    select: {
      id: true,
      description: true,
      createdAT: true,
      updatedAt: true
    }
  });

  if(!projectData){
    return res.status(500).json({
      message: "Error creating Project"
    });
  };

  return res.status(201).json({
    message: "Project created successfully",
    projectData
  });
});

export default createProject;