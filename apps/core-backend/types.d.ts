declare namespace Express {
  interface Request {
    userId: string?;
    user?: {
      email: string;
    };
  }
}