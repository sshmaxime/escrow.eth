const { accounts, defaultSender, contract, web3 } = require('@openzeppelin/test-environment');
const { expect } = require('../chai-local');

const { expectRevert } = require('@openzeppelin/test-helpers');

const XTokenContract = contract.fromArtifact("TokenX");
const EscrowContract = contract.fromArtifact("Escrow");

let XToken;
let Escrow;

let initBalanceSeller;
let initBalanceBuyer;

const ethToWei = (eth) => {
  return web3.utils.toWei(String(eth), 'ether');
}

const weiToEth = (wei) => {
  return parseInt(web3.utils.fromWei(wei, 'ether'));
}

describe('Escrow', () => {
  const seller = accounts[0];
  const buyer = accounts[1];

  before(async () => {
    XToken = await XTokenContract.new({from: seller});
    Escrow = await EscrowContract.new(seller, buyer, XToken.address);

    // Seller authorize smart contract to use its token
    await XToken.approve(Escrow.address, 20, {from: seller})

    // Save initial balances
    initBalanceBuyer = weiToEth(await web3.eth.getBalance(buyer));
    initBalanceSeller = weiToEth(await web3.eth.getBalance(seller));
  })

  it("Test e2e EA", async () => {
    await Escrow.sellerDeposit(20, ethToWei(1), {from: seller, gasPrice: 0});
    await Escrow.buyerDeposit({from: buyer, value: ethToWei(1), gasPrice: 0});

    await Escrow.widthdraw({from: seller, gasPrice: 0});
    await Escrow.widthdraw({from: buyer, gasPrice: 0});

    expect(weiToEth(await web3.eth.getBalance(seller))).equal(initBalanceSeller + 1);
    expect(weiToEth(await web3.eth.getBalance(buyer))).equal(initBalanceBuyer - 1);

    expect((await XToken.balanceOf(seller)).toString()).equal(((await XToken.totalSupply())- 20).toString());
    expect((await XToken.balanceOf(buyer)).toString()).equal((20).toString());
  })
});
