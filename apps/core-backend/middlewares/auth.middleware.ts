import { clerkClient } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    
    if(!token){
      res.status(401).json({
        message: "No token provided"
      });
      return;
    };

    console.log("CLERK_JWT_PUBLIC_KEY: ", process.env.CLERK_JWT_PUBLIC_KEY);
    
    const publicKey = process.env.CLERK_JWT_PUBLIC_KEY!;
    if(!publicKey){
      res.status(500).json({
        message: "Missing CLERK_JWT_PUBLIC_KEY in env"
      });
    };

    // const formattedKey = publicKey.replace(/\\n/g, "\n");
    // console.log("formattedKey: ", formattedKey);
    

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"]
    });

    console.log("decoded: ", decoded);
    

    if(!decoded){
      res.status(401).json({
        message: "Unauthorize to access"
      });
      return;
    };

    const userId = (decoded as any).sub;

    if(!userId){
      res.status(403).json({
        message: "Invalid token payload"
      });
      return;
    };

    const user = await clerkClient.users.getUser(userId);
    const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId);

    if(!primaryEmail){
      res.status(400).json({
        message: "User email not found"
      });
      return;
    };

    req.userId = userId;
    req.user = {
      email: primaryEmail.emailAddress
    };

    next()
  } catch (error) {
    console.error("Auth Error: ", error);
    
    if(error instanceof jwt.JsonWebTokenError){
      res.status(403).json({
        message: "Invalid token"
      });
      return;
    };

    res.status(500).json({
      message: "Error processing authentication",
    });
    return;
  }
};

export default authMiddleware;