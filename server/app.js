import express from "express";
import cors from "cors";
import dictRouter from "./routes/dictionaryRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", dictRouter);

app.use((req, res) => res.status(404).json({ message: "Not found!" }));
app.use((err, req, res, next) => res.status(500).json({ message: "Something went wrong!" }));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
