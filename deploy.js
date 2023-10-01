const truffleHdwalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile').Index;

const provider = new truffleHdwalletProvider(
  'jump inside hat globe pool addict scorpion monitor churn add city student',
  'https://sepolia.infura.io/v3/2d29efd8b6254af5879fb3c379c5293f'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploying from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to', result.options.address);
};

deploy();
