import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0xB73A26D0a62FDADC08027Dd1DA065bbE8AB7B7a9' //Deployed Contract Code //Everytime contract code is changed and compiled, need to update this
);
//0x5Dc70268e1195D584c67E13Cd8cD7E36dC393A94
export default instance;

//Whenever there is a change in Solidity code, use this few commands
//Step 1: cd ethereum
//Step 2: node compile.js
//Step 3: node deploy.js
//Step 4: Paste the contract deployed address above