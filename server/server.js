// wholesale-shipping/server/server.js

const express = require("express");
const path = require("path");
require("dotenv").config();
const colors = require("colors");
const { connect, disconnect, ping } = require("./src/utils/db");

const app = express();
const PORT = process.env.PORT || 3000;
const itemRouter = require("./src/routes/item.route");

// JSON parsing
app.use(express.json());

app.use("/api/items", itemRouter);

const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// Fallback for SPA routes
app.get("/{/*path}", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(PORT, async () => {
  console.clear();
  console.log(" ✅ Server is running on port:".bold.green, PORT);
  console.log(` 🌐 Make requests to:`.bold.cyan, `http://localhost:${PORT}`);

  try {
    await connect();
    console.log(" ✅ Database connected successfully".bold.green);
  } catch (error) {
    console.error(" ❌ Database connection failed".bold.red, error);
    process.exit(1);
  }

  process.on("SIGINT", async () => {
    await disconnect();
    console.log(" 🔌 Database disconnected successfully".bold.yellow);
    process.exit(0);
  });
});
