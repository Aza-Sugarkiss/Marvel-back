const axios = require("axios");
const express = require("express");
const router = express.Router();

const apiUrl = "https://lereacteur-marvel-api.herokuapp.com";
const apiKey = process.env.MARVEL_API_KEY;

router.get("/comics", async (req, res) => {
  try {
    const skip = Number(req.query.page) * 100 - 100;
    const response = await axios.get(
      `${apiUrl}/comics?apiKey=${apiKey}&skip=${skip}&name=${req.query.name}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `${apiUrl}/comics/${characterId}?apiKey=${apiKey}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
