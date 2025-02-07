const { ethers } = require("ethers");
const ABI = require("./abi.json");
require('dotenv').config(); 


const contractAddress = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(process.env.WEBSOCKET_URL);
const contract = new ethers.Contract(contractAddress, ABI, provider);

async function fetchAllMintToEvents() {
    try {

        const fromBlock = 0; 
        const toBlock = "latest";

        // Query the MintTo events
        const events = await contract.queryFilter("MintTo", fromBlock, toBlock);
       
        // Log the events
        console.log(`Found ${events.length} MintTo events:`);
        events.forEach((event, index) => {
            console.log(`Event ${index + 1}:`);
            console.log(`- To: ${event.args.to}`);
            console.log(`- Amount: ${event.args.amount.toString()}`);
            console.log(`- Message: ${event.args.msgtosend}`);
            console.log(`- Transaction Hash: ${event.transactionHash}`);
            console.log(`- Block Number: ${event.blockNumber}`);
            console.log("-----------------------------");
        });
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}


fetchAllMintToEvents();