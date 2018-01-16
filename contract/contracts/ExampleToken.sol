pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract ExampleToken is MintableToken {

    string public constant name = "Example Token";
    string public constant symbol = "EXT";
    uint256 public constant decimals = 18;

}
