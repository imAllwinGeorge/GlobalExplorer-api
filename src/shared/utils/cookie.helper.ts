import { Response } from "express";
import { config } from "../config";

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  accessTokenName: string,
  refreshTokenName: string,
) => {
  const isProd = config.node.NODE_ENV === "production";
  const cookieDomain = isProd ? "globalexplorer.allwingeorge.me" : undefined;
  res.cookie(accessTokenName, accessToken, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    maxAge: 24 * 60 * 60 * 1000,
    domain: cookieDomain,
  });
  res.cookie(refreshTokenName, refreshToken, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    domain: cookieDomain,
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
