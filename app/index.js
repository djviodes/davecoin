// *** Environment Variable Setup *** //
require("dotenv").config();

// *** Imports *** //
const Blockchain = require("../blockchain/blockchain");

// *** Server Imports *** //
const server = require("./api/server");
const P2PServer = require("./api/p2p-server");

// *** Port Declaration *** //
const PORT = process.env.PORT || 5000;

// *** New Blockchain Instance *** //
const blockchain = new Blockchain();

// *** New P2PServer Instance *** //
const p2pserver = new P2PServer(blockchain);

// *** Tell Server What Port To Listen To *** //
server.listen(PORT, () => {
  if (PORT === 5000) {
    console.log(
      `\n*** SET UP ENVIRONMENT VARIABLES... Server is listening on port ${PORT}... ***\n`
    );
  } else {
    console.log(`\n*** Server is listening on port ${PORT} ***\n`);
  }
});

p2pserver.listen();
