require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const projectRoutes = require("./routes/projects");
const requirementRoutes = require("./routes/requirements");
const taskRoutes = require("./routes/tasks");
const changeRoutes = require("./routes/changes");
const costRoutes = require("./routes/costs");
const defectRoutes = require("./routes/defects");
const riskRoutes = require("./routes/risks");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true, service: "Smart Healthcare PMS" }));

app.use("/api/projects", projectRoutes);
app.use("/api/requirements", requirementRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/changes", changeRoutes);
app.use("/api/costs", costRoutes);
app.use("/api/defects", defectRoutes);
app.use("/api/risks", riskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (require.main === module) {
  mongoose.connect(MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
    .catch(err => {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

module.exports = app;
