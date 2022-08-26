const express = require("express");
const router = express.Router();

router.get("/", async (_req, res, _next) => {
  return res.status(200).json({
    title: "Express Home Page",
    message: "Hello from Pin Server 2022!",
  });
});

module.exports = router;
