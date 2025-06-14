// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.vercel.app"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});

app.use("/api/", limiter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Torre Connect Hub API",
  });
});

// Search endpoint - proxies Torre.ai search stream
app.post("/api/search", async (req, res) => {
  try {
    console.log("Search request received:", req.body);

    const searchPayload = {
      query: req.body.query || "",
      filters: req.body.filters || {},
      offset: req.body.offset || 0,
      size: req.body.size || 20,
      ...req.body,
    };

    const response = await axios.post(
      "https://torre.ai/api/entities/_searchStream",
      searchPayload,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Torre-Connect-Hub/1.0",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    console.log("Torre.ai search response status:", response.status);
    res.json(response.data);
  } catch (error) {
    console.error("Search error:", error.message);

    if (error.response) {
      // Torre.ai returned an error
      res.status(error.response.status).json({
        error: "Search service error",
        message: error.response.data?.message || "Failed to search",
        details:
          process.env.NODE_ENV === "development"
            ? error.response.data
            : undefined,
      });
    } else if (error.request) {
      // Network error
      res.status(503).json({
        error: "Service temporarily unavailable",
        message: "Unable to connect to search service",
      });
    } else {
      // Other error
      res.status(500).json({
        error: "Internal server error",
        message: "Something went wrong with the search",
      });
    }
  }
});

// Genome endpoint - retrieves detailed profile information
app.get("/api/genome/:username", async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || username.trim() === "") {
      return res.status(400).json({
        error: "Bad request",
        message: "Username is required",
      });
    }

    console.log(`Fetching genome for username: ${username}`);

    const response = await axios.get(
      `https://torre.ai/api/genome/bios/${username}`,
      {
        headers: {
          "User-Agent": "Torre-Connect-Hub/1.0",
        },
        timeout: 10000,
      }
    );

    console.log(`Genome data retrieved for ${username}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Genome error for ${req.params.username}:`, error.message);

    if (error.response) {
      if (error.response.status === 404) {
        res.status(404).json({
          error: "Profile not found",
          message: `No profile found for username: ${req.params.username}`,
        });
      } else {
        res.status(error.response.status).json({
          error: "Profile service error",
          message: error.response.data?.message || "Failed to fetch profile",
          details:
            process.env.NODE_ENV === "development"
              ? error.response.data
              : undefined,
        });
      }
    } else if (error.request) {
      res.status(503).json({
        error: "Service temporarily unavailable",
        message: "Unable to connect to profile service",
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
        message: "Something went wrong while fetching the profile",
      });
    }
  }
});

// Job search endpoint (bonus feature)
app.post("/api/jobs/search", async (req, res) => {
  try {
    console.log("Job search request received:", req.body);

    // This would integrate with Torre's job search API
    // For now, return a placeholder response
    res.json({
      message: "Job search endpoint ready for integration",
      query: req.body.query,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Job search error:", error.message);
    res.status(500).json({
      error: "Job search error",
      message: error.message,
    });
  }
});

// Handle 404 for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "Not found",
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Torre Connect Hub API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Search endpoint: http://localhost:${PORT}/api/search`);
  console.log(
    `👤 Genome endpoint: http://localhost:${PORT}/api/genome/:username`
  );
});

module.exports = app;
