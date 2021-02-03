// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma experimental ABIEncoderV2;
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow {
    //
    enum State {NEW, WAITING_PAYMENT, WIDTHDRAW, COMPLETE}
    State public state;

    //
    address payable public seller;
    address public buyer;

    //
    IERC20 public token;
    uint256 amountTknDeposit;
    uint256 public amountEthRequested;

    //
    constructor(
        address payable _seller,
        address _buyer,
        address _token
    ) public {
        seller = _seller;
        buyer = _buyer;
        token = IERC20(_token);

        //
        amountEthRequested = 0;
        state = State.NEW;
    }

    //
    function sellerDeposit(
        uint256 _amountTknDeposit,
        uint256 _amountEthRequested
    ) external {
        require(msg.sender == seller, "Seller only method");
        require(state == State.NEW, "Not waiting for seller deposit");
        require(
            _amountTknDeposit <= token.balanceOf(seller),
            "Not enough tkn to deposit"
        );

        amountTknDeposit = _amountTknDeposit;
        amountEthRequested = _amountEthRequested;

        // Approve contract to use deposited TKN later on
        token.approve(address(this), _amountTknDeposit);

        // Transfer seller token to contract
        require(token.transferFrom(seller, address(this), amountTknDeposit));

        //
        state = State.WAITING_PAYMENT;
    }

    function buyerDeposit() external payable {
        require(msg.sender == buyer, "Buyer only method");
        require(state == State.WAITING_PAYMENT, "Not waiting for payment");
        require(msg.value == amountEthRequested, "Didn't send enough ether");

        //
        state = State.COMPLETE;
    }

    function widthdraw() external {
        require(
            state == State.COMPLETE,
            "Cannot widthdraw while escrow agreement is not complete"
        );
        if (msg.sender == seller) {
            seller.transfer(amountEthRequested);
        } else if (msg.sender == buyer) {
            token.transferFrom(address(this), buyer, amountTknDeposit);
        } else revert();
    }
}
