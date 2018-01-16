# Scenario 03 - ICO demonstration

## Smart contracts

The smart contracts for the ICO demonstration are inside the `contract` directory. The project requires the installation of [truffle](http://truffleframework.com/) to handle development operations.

Truffle can be installed as a global npm package:
```
npm i -g truffle
```

For installing all the project dependencies `npm i` needs to be triggered inside the `contract` directory. The smart contracts can be compiled via the truffle command `truffle compile`. The result of the compilation can be found inside the `build` directory.

## Application

The web application for a demo ICO interface is inside the `app` directory. The application is build with the [StencilJS](https://stenciljs.com/) compiler.

For installing all the project dependencies `npm i` needs to be triggered inside the `app` directory. The project can be built for deployment via the `npmr run build` command. The result is available inside the `www` directory.

## Local development

For local development a local Ethereum blockchain is required. The most straightforward approach is to use [Ganache](http://truffleframework.com/ganache/). Ganache has a user interface and is easy to setup.

In the following the steps are described how to setup a local version of the ICO demonstration scenario:

 - Startup Ganache to have a local Ethereum blockchain at disposal. The RPC interface will be available on `http://127.0.0.1:7545`.
 - Migrate the smart contracts on the local Ethereum blockchain. Therefore the `truffle migrate --reset` command needs to be executed inside the `contract` directory.
 - Inside the `app` directory a development webserver can be brought up by executing the `npm run dev` command. On `http://localhost:3333` the app should be available for testing.
