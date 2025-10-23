import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../shared/constants/constants";
import { container } from "tsyringe";
import { IVerifyTokenUsecase } from "../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";

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
    console.log("verify token before using verify token usecase");
    // const verifyTokenUseCase = container.resolve(VerifyTokenUsecase);
    const verifyTokenUseCase = container.resolve<IVerifyTokenUsecase>(
      "IVerifyTokenUsecase",
    );

    console.log(verifyTokenUseCase);
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
    // if (error instanceof JsonWebTokenError) {
    //   res
    //     .status(HttpStatusCode.UNAUTHORIZED)
    //     .json({ message: "Token Expired." });
    // }
    if (error instanceof Error) {
      console.log("instace of ERROR : ", error.message);
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Token Expired." });
    }
  }
};

// // auth.middleware.ts
// import { Request, Response, NextFunction, RequestHandler } from "express";
// import { IVerifyTokenUsecase } from "../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";
// import { HttpStatusCode } from "../../shared/constants/constants";

// const extractToken = (req: Request): { token: string; role: string } | null => {
//   const url = req.originalUrl;
//   const inferredRole = url.split("/")[2];
//   let token: string | undefined;
//   let role: string | undefined;

//   if (inferredRole === "admin") {
//     token = req.cookies.adminAccessToken;
//     role = "admin";
//   } else if (inferredRole === "host") {
//     token = req.cookies.hostAccessToken;
//     role = "host";
//   } else if (inferredRole === "user") {
//     token = req.cookies.userAccessToken;
//     role = "user";
//   }

//   return token && role ? { token, role } : null;
// };

// export const verifyToken = (
//   verifyTokenUsecase: IVerifyTokenUsecase
// ): RequestHandler => {
//   return async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const tokenDetails = extractToken(req);
//       if (!tokenDetails) {
//         res
//           .status(HttpStatusCode.UNAUTHORIZED)
//           .json({ message: "Token expired." });
//         return; // 🟩 Don't return the Response object — just exit
//       }

//       const user = await verifyTokenUsecase.execute(
//         tokenDetails.token,
//         tokenDetails.role
//       );

//       if (user.isBlocked) {
//         res.clearCookie(`${tokenDetails.role}AccessToken`);
//         res
//           .status(403)
//           .json({ message: "You have been blocked. Please contact admin." });
//         return; // 🟩 Exit cleanly
//       }

//       next();
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(HttpStatusCode.FORBIDDEN).json({ message: error.message });
//         return; // 🟩 Exit cleanly
//       }
//       next(error);
//     }
//   };
// };
