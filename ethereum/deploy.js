const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledRecord = require('./build/Record.json');
const provider = new HDWalletProvider({
    mnemonic: {
        phrase: 'ivory honey fix online income decorate also top wish civil decorate illegal',
    },
    providerOrUrl: 'https://sepolia.infura.io/v3/6ee37ffc43044097b7e3debbe2124a31',
    pollingInterval: 8000,
});
const web3 = new Web3(provider);
const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to deploy from account:', accounts[0]);
        const balance = await web3.eth.getBalance(accounts[0]);
        console.log('Account balance (in Eth):', balance);
        if (balance === '0') {
            throw new Error('Insufficient funds in the account to deploy the contract');
        }
        const gasPrice = await web3.eth.getGasPrice();
        if (!compiledRecord.abi || !compiledRecord.evm || !compiledRecord.evm.bytecode) {
            throw new Error('Compiled contract does not contain ABI or bytecode.');
        }

        const result = await new web3.eth.Contract(compiledRecord.abi)
            .deploy({ data: compiledRecord.evm.bytecode.object })
            .send({
                from: accounts[0],
                gas: '1000000',
                gasPrice: gasPrice,
            });

        console.log('Contract deployed to:', result.options.address);
    } catch (error) {
        console.error('Error deploying contract:', error.message);
    } finally {
        provider.engine.stop();
    }
};

deploy();