pragma solidity ^0.4.18;

import './ExampleToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract ExampleCrowdsale {
  using SafeMath for uint256;

  ExampleToken public token;
  address public wallet;
  
  uint256 public cap;
  uint256 public rate; // how many token units a buyer gets per wei
  uint256 public weiRaised;

  event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);


  function ExampleCrowdsale(uint256 _rate, uint256 _cap) public {
    require(_rate > 0 && _cap > 0);

    token = new ExampleToken();    
    rate = _rate;
    cap = _cap;
    wallet = msg.sender;
  }

  // fallback function can be used to buy tokens
  function () external payable {
    buyTokens(msg.sender);
  }

  // low level token purchase function
  function buyTokens(address beneficiary) public payable {
    require(beneficiary != address(0));
    require(validPurchase());

    uint256 weiAmount = msg.value;

    // calculate token amount to be created
    uint256 tokens = weiAmount.mul(rate);

    // update state
    weiRaised = weiRaised.add(weiAmount);

    token.mint(beneficiary, tokens);
    TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);
  }

  function withdrawFunds() internal {
    wallet.transfer(this.balance);
  }

  // @return true if the transaction can buy tokens
  function validPurchase() internal view returns (bool) {
    bool nonZeroPurchase = msg.value != 0;
    bool withinCap = weiRaised.add(msg.value) <= cap;

    return nonZeroPurchase && withinCap;
  }
 
}
