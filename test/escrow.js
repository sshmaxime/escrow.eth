const { accounts, defaultSender, contract, web3 } = require('@openzeppelin/test-environment');
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Escrow = contract.fromArtifact("Escrow");

describe('Escrow', () => {

  it("Test seller deposit", async () => {
    const escrow = await deployProxy(Escrow, [], { initializer: "initialize" });
  })
});
