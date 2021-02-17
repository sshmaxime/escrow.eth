const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Escrow = artifacts.require('Escrow');

module.exports = async function (deployer) {
  await deployProxy(Escrow, [deployer.networks.development.from], { deployer, initializer: 'initialize' });
};