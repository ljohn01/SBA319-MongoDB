import express from "express";
import dotenv from "dotenv";
dotenv.config();

// process.env is what allows me to access the .env
// PORT is what it was called in the .env
const PORT = process.env.PORT || 5050;
const app = express();

import restaurants from "./routes/restaurants.mjs";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API.");
});

app.use("/restaurants", restaurants);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("seems like we messed up somewhere.")
})

// start the express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})