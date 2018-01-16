const fs = require('fs');
const Migrations = artifacts.require("Migrations");
const Crowdsale = artifacts.require("ExampleCrowdsale");

const deploy = (deployer) => {
  return deployer.deploy(Migrations).then(() => {
    return deployer.deploy(Crowdsale, 100, web3.toBigNumber('9000000000000000000000000000'));
  });
};

const updateDevConfig = (crowdsale, uri) => {
  var pathToDevConfig = __dirname + '/../../app/contract.dev.json';
  var stream = fs.createWriteStream(pathToDevConfig);
  stream.write(JSON.stringify({
    'crowdsale' : crowdsale ,
    'uri' : uri
  }));
  stream.end();
}; 

module.exports = function(deployer, network) {  
  deploy(deployer).then(() => {
    return Crowdsale.deployed();
  }).then((instance) => {
    if (network == 'development') {
      updateDevConfig(instance.address, 'http://127.0.0.1:7545');
    }    
  });  
};
