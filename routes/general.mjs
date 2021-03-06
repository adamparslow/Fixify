import express from "express";
import path from "path";
import process from "process";

const router = express.Router();

router.get("/feature/collage", (req, res) => {
	res.sendFile(path.join(process.cwd(), "views/collage.html"));
});

router.get("/feature/*", (req, res) => {
	console.log(req.originalUrl);
	res.send("Not yet implemented");
});

router.get("*", (req, res) => {
	let url = req.originalUrl.slice(1);
	const isLocal = process.cwd().indexOf("aztar") != -1;	

	if (url === "") url = isLocal ? "index.html" : "dist/index.html";
	// To fix an issue between local and glitch
	const localFolder =  isLocal ? "frontend/dist" : "frontend";
	res.sendFile(path.join(process.cwd(), localFolder, url));
});

export default router;
