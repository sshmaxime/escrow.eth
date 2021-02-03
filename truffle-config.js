module.exports = {
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
      gasPrice: "0"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gasPrice: "0"
    },
  },
};
