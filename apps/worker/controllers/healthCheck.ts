import asyncHandler from "common/asyncHandler";

const healthCheck = asyncHandler( async (req, res) => {

  return res.status(200).json({
    message: "Health Check Passed - Worker Server"
  });
});

export { healthCheck };