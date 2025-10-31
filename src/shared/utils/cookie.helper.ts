import { Response } from "express";
import { config } from "../config";

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  accessTokenName: string,
  refreshTokenName: string,
) => {
  res.cookie(accessTokenName, accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: config.node.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie(refreshTokenName, refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: config.node.NODE_ENV === "production",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookies = (
  res: Response,
  accessTokenName: string,
  refreshTokenName: string,
) => {
  res.clearCookie(accessTokenName);
  res.clearCookie(refreshTokenName);
};
