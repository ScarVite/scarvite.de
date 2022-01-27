const { Router } = require("express");
const apicache = require("apicache");

let cache = apicache.middleware;

const router = Router();

router.post("/register", async (req, res) => {});

router.get("/register/:token", async (req, res) => {});

router.post("/login", async (req, res) => {});

router.post("/forgot-password", async (req, res) => {
  if (req.body) {
    if (req.body.status == "reset") res.send("reset");
    else if (req.body.status == "change") res.send("change");
    else res.status(405).send();
  } else res.status(400).send();
});

module.exports = router;
