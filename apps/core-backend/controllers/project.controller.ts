import prisma from "db/client"
import asyncHandler from "../utils/asyncHandler";

const createProject = asyncHandler( async (req, res) => {
  //get prompt
  const { prompt } = req.body;
  const description = prompt.split("\n")[0];
  //get user id
  const userId = (req as any).userId;
  //create entry in project as description for that userId
  const projectData = await prisma.projects.create({
    data: {
      description,
      userId
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