import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/api/swiggy", async (req, res) => {
  try {
    const lat = req.query.lat || 12.9716;
    const lng = req.query.lng || 77.5946;

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "application/json",
        Cookie:
          "experiments=control; _device_id=123abc; swiggy_user_session=guest", // IMPORTANT
      },
    });

    const text = await response.text();

    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.status(500).json({ raw: text });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server on 5000"));
