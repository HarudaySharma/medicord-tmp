import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //We are in the browser AND metamask is running
    async () => {await window.web3.currentProvider.enable();}
    web3 = new Web3(window.web3.currentProvider);
} else {
    //We are on the server OR the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/6ee37ffc43044097b7e3debbe2124a31'
    );
    web3 = new Web3(provider);
}

export default web3;
