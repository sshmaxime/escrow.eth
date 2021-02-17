const { accounts, defaultSender, contract, web3 } = require('@openzeppelin/test-environment');
const { expect } = require('../chai-local');
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const { expectRevert } = require('@openzeppelin/test-helpers');

const Escrow = contract.fromArtifact("Escrow");

describe('Escrow', () => {
  const seller = accounts[0];
  const buyer = accounts[1];

  it("Test seller deposit", async () => {
    const escrow = await deployProxy(Escrow, ["hello"]);
  })
});
