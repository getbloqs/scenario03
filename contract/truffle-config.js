const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = require("./secret").ropsten.mnemonic;
const infura = require("./secret").ropsten.infura;

module.exports = {
  networks : {
    development : {
      host: "127.0.0.1" ,
      port: 7545 ,
      network_id : "*"
    } ,
    ropsten : {
      gas: 2900000 ,
      provider : function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura);
      } ,
      network_id : 3
    }
  }
};
