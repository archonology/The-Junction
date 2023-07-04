const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
      
        res.render("homepage");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/random", async (req, res) => {
    try {
        res.render("random");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;