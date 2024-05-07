// src/index.ts
import express, { Request, Response } from "express";
import profiles from "./routes/profiles";
import { connect } from "./services/mongo";
import { profile } from "console";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/profiles", profiles);
connect("MusicMixer");

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/goodbye", (req: Request, res: Response) => {
    res.send("<h1>Goodbye<h1>");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});