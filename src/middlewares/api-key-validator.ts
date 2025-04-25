import env from "@/config/env";
import type { NextFunction, Request, Response } from "express";

export function apiKeyValidator(req: Request, res: Response, next: NextFunction) {
	const apiKey = env.API_KEY;

	console.log("API_KEY", apiKey, apiKey === undefined);

	if (!apiKey) return next();

	const headerApiKey = req.headers["x-api-key"] || req.headers["X-API-Key"];
	if (!headerApiKey) {
		res.status(403).json({ error: "X-API-Key Header doesn't exist" });
	}
	else if (headerApiKey !== apiKey) {
		res.status(403).json({ error: "Your APIIIII key is invalid" });
	}
	else next();
}

export function apiKeyValidatorParam(req: Request, res: Response, next: NextFunction) {
	const apiKey = env.API_KEY;

	if (apiKey === undefined) return next();

	const paramApiKey = req.query["api_key"] || req.query["API_KEY"];
	if (!paramApiKey) {
		res.status(403).json({ error: "api_key query params doesn't exist" });
	}
	else if (paramApiKey !== apiKey) {
		res.status(403).json({ error: "Your API key is invalid" });
	}
	else next();
}
