const express = require("express");
const axios = require("axios");

const app = express();
// ADD THIS
var cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get("/news", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const apiKey = "889c5553016e4951be74b36c2a152664";
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
    console.log(searchQuery);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
