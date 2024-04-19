import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const apiURL = "https://v2.jokeapi.dev/joke/Any?safe-mode";

app.use(express.static("public"));

app.get("/joke", async (req, res) => {
    try {
        const result = await axios.get(apiURL);
        if (result.data.type == "single") {
            const joke = result.data.joke;
            const setup = "";
            const delivery = "";
            res.json({ setup, delivery, joke });
        } else {
            const joke = "";
            const setup = result.data.setup;
            const delivery = result.data.delivery;
            res.json({ setup, delivery, joke });
        }
    } catch (err) {
        console.log("Error fetching the joke: ", err);
        res.status(500).json({ error: "Failed to fetch joke" });
    }
});

app.get("/", async (req, res) => {
    try {
        let setup = "";
        let delivery = "";
        let joke = "";

        res.render("index.ejs", { setup, delivery, joke });
    } catch (err) {
        console.log("Error rendering index page: ", err);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
