// *** Imports *** //
const WebSocket = require("ws");

// *** P2P Port Declaration *** //
const P2P_PORT = process.env.P2P_PORT || 5001;

// *** List Of Addresses To Connect To *** //
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

// *** P2P Server Class *** //
class P2PServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  // *** Create A New P2P Server & Connections *** //
  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });

    /**
     * Event listener and a callback function for any new connection.
     * On any new connection the current instance will send the current chain
     * to the newly connected peer.
     */
    server.on("connection", (socket) => this.connectSocket(socket));

    this.connectToPeers();

    console.log(
      `\n*** Listening for peer to peer connection on port ${P2P_PORT} ***\n`
    );
  }

  // After making connection to a socket
  connectSocket(socket) {
    // Push the socket to the socket array
    this.sockets.push(socket);
    console.log(`Socket connected`);

    // Register a message event listener to the socket
    this.messageHandler(socket);

    // On new connection send the blockchain to the peer
    socket.send(JSON.stringify(this.blockchain));
  }

  // Connect the peers to one another
  connectToPeers() {
    peers.forEach((peer) => {
      // Create a socket for each peer
      const socket = new WebSocket(peer);

      /**
       * Open event listener is emitted when a connection is established
       * saving the socket in the array
       */
      socket.on("open", () => this.connectSocket(socket));
    });
  }

  // Function to handle messages
  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      console.log("Data: ", data);
      this.blockchain.replaceChain(data);
    });
  }

  // Helper function to send the chain instance
  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  /**
   * Utility function to sync the chain
   * whenever a new block is added to
   * the blockchain.
   */
  syncChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }
}

module.exports = P2PServer;
