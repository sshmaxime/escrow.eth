const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Escrow = artifacts.require('Escrow');
const Escrow2 = artifacts.require('Escrow2');

module.exports = async function (deployer) {
  const existing = await Escrow.deployed();
  await upgradeProxy(existing.address, Escrow2, { deployer });
};