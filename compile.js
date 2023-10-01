const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const compiledOutput = JSON.parse(solc.compile(JSON.stringify(input)));

const contractName = 'Lottery.sol:Index';
const contractInterface = compiledOutput.contracts['Lottery.sol']

// console.log(contractInterface.Index.evm.bytecode.object);

module.exports = contractInterface;
