import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../shared/constants/constants";
import { container } from "tsyringe";
import { VerifyTokenUsecase } from "../../usecases/auth/verfiy-token.usecase";

const extractToken = (req: Request): { token: string; role: string } | null => {
  const url = req.originalUrl;
  const infferedRole = url.split("/")[2];
  let token;
  let role;
  if (infferedRole === "admin") {
    token = req.cookies.adminAccessToken;
    role = "admin";
  } else if (infferedRole === "host") {
    token = req.cookies.hostAccessToken;
    role = "host";
  } else if (infferedRole === "user") {
    token = req.cookies.userAccessToken;
    role = "user";
  } else {
    token = null;
  }
  if (token && role) {
    return { token, role };
  }
  return null;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenDetails = extractToken(req);
    // const tokenDetails = {} as { token: string; role: string };

    console.log("tokenDetails: ", tokenDetails, req.path);
    if (!tokenDetails) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Token Expired." });
      return;
    }
    const verifyTokenUseCase = container.resolve(VerifyTokenUsecase);
    const user = await verifyTokenUseCase.execute(
      tokenDetails.token,
      tokenDetails.role,
    );
    console.log("middleware jwt payload verify token :", user);
    if (user.isBlocked) {
      console.log("verified token user blocked ", user.isBlocked);
      res.clearCookie(`${tokenDetails.role}AccessToken`);
      res
        .status(403)
        .json({ message: "You have been blocked please contact admin." });
      return;
    }
    next();
  } catch (error) {
    console.log("verify token error :", error);
    if (error instanceof Error) {
      res.status(HttpStatusCode.FORBIDDEN).json({ message: error.message });
    }
  }
};
