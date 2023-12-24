const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: "Whole Foods",
    miles: 0.6,
  },
  {
    id: 2,
    store: "El Karma market",
    miles: 2.5,
  },
  {
    id: 3,
    store: "Baaia shop",
    miles: 2.8,
  },
];

// Requests
router.get("/", (req, res) => {
  const { miles } = req.query;
  const parsedMiles = parseInt(miles);
  if (!isNaN(parsedMiles)) {
    const filteredStores = supermarkets.filter((s) => s.miles <= miles);
    res.send(filteredStores);
  } else res.send(supermarkets);
});

module.exports = router;
