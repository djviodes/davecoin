// *** Imports *** //
const router = require("express").Router();

const Blockchain = require("../../blockchain/blockchain");

// *** New Blockchain Instance *** //
const blockchain = new Blockchain();

// *** GET Entire Blockchain *** //
router.get("/blocks", (req, res, next) => {
  try {
    res.status(200).json(blockchain.chain);
  } catch (err) {
    next(err);
  }
});

// *** POST New Block To Blockchain *** //
router.post("/mine", async (req, res, next) => {
  try {
    const block = await blockchain.addBlock(req.body.data);
    res
      .status(200)
      .json({
        message: `New block added: ${block.toString()}`,
      })
      .redirect("/blocks");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
