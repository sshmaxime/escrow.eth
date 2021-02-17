module.exports = {
  networks: {
      production: {
          host: 'localhost',
          port: 7545,
          network_id: '*',
          gasPrice: 20000000000,
          gas: 9500000
      },
      test: {
        host: '127.0.0.1',
        port: 9545,
        network_id: '*',
        gasPrice: 20000000000,
        gas: 9500000
    }
  },
  compilers: {
      solc: {
          version: '0.6.12',
          settings: {
              optimizer: {
                  enabled: true,
                  runs: 200
              }
          }
      }
  }
};
