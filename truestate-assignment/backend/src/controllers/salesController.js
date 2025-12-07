const salesService = require("../services/salesService");

async function getSales(req, res) {
  try {
    const result = await salesService.getSales(req.query);
    res.json(result);
  } catch (err) {
    console.error("getSales error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { getSales };
