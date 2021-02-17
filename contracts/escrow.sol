// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma experimental ABIEncoderV2;
pragma solidity 0.6.12;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";

contract Escrow is Initializable {
    string admin;

    //
    function initialize(string memory _admin) public initializer {
        admin = _admin;
    }
}
