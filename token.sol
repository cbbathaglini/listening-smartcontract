// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Token is ERC20, AccessControl{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event MintTo(address to, uint256 amount, string msgtosend);

    string private constant TOKEN_NAME = "Teste token";
    string private constant TOKEN_SYMBOL = "C1206";

    constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE){
        _mint(to, amount);
        emit MintTo(to, amount, "transferido");
    }

    function decimals() public pure override returns(uint8){
        return 2;
    }

}