import asyncHandler from "../utils/asyncHandler";

const getHealthCheck = asyncHandler( async (req, res) => {

  return res.status(200).json({
    message: "Health Check Passed - core-backend"
  });
});

export default getHealthCheck;