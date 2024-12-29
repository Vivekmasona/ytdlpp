const express = require("express");
const { spawn } = require("child_process");

const app = express();
const PORT = 3000;

// Route to stream YouTube audio
app.get("/stream", (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send("YouTube URL is required");
  }

  const python = spawn("python3", ["yt.py", videoUrl]);

  python.stdout.on("data", (data) => {
    const audioUrl = data.toString().trim();
    res.redirect(audioUrl);
  });

  python.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
    res.status(500).send("Error fetching audio stream");
  });

  python.on("close", (code) => {
    if (code !== 0) {
      console.error(`Python process exited with code ${code}`);
      res.status(500).send("Error processing request");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
