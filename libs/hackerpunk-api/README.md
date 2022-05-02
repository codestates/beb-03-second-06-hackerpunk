# hackerpunk-api

A Node.js package for hackerpunk project

## Installation

```sh
npm i --save hackerpunk-api
```

## Usage

### Javascript

```javascript
const hackerpunk = require("hackerpunk-api");

/// setProvider
const provider = hackperpunk.setProvider(
  "ropsten",
  "alchemy",
  "[your api key]"
);

// or
const provider = hackperpunk.setProvider("https://127.0.0.1:8545");

/// donate
const wallet = hackerpunk.setWallet("[donator privaeKey]");
const signer = hackerpunk.setSigner(wallet, provider);
const hp = new hackerpunk.HP(signer, "[contractAddress]", "[abi]");
const hptl = new hackerpunk.HPTimeLock(
  "[signer of masterAccount]",
  "[contractAddress]",
  "[abi]"
);

hptl
  .donate(hp, "[articleId]", "[donatorAddress]", "[writerAddress]", "[amount]")
  .then();

/// register External Account
// grant minter role to EHP Account
hp.grantMinterRole("[ExternalHP Contract Address]"); // executed by master account
hp.registerExternal("[serverAccount]", "[fee]"); // can be executed by user
```
