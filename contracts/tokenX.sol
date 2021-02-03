// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenX is ERC20 {
    constructor() public ERC20("TokenX", "TKNX") {
        _mint(msg.sender, 1000);
    }
}
