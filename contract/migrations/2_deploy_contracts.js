const fs = require('fs');
const Crowdsale = artifacts.require("ExampleCrowdsale");

var infura = '';
if (fs.existsSync(__dirname + '/../secret.json')) {
  infura = require(__dirname + '/../secret.json').infura;
}

const deploy = (deployer) => {
    return deployer.deploy(Crowdsale, web3.toBigNumber('100'), web3.toBigNumber('9000000000000000000000000000'));
};

const updateConfig = (crowdsale, uri) => {
  var pathToDevConfig = __dirname + '/../../app/contract.config.json';
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
      updateConfig(instance.address, 'http://127.0.0.1:7545');
    } else if (network == 'ropsten') {
      updateConfig(instance.address, "https://ropsten.infura.io/" + infura);
    }    
  });  
};
