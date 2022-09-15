const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying the contract")
    const contract = await contractFactory.deploy()
    console.log(`Contract address: ${contract.address}`)
    const currentFvaouriteNumber = await contract.retrieve()
    console.log(
        `Current Favourite Number : ${currentFvaouriteNumber.toString()}`
    )
    const transactionResponse = await contract.store(7)
    const transactionReceipt = await transactionResponse.wait(1)
    const updatedFvaouriteNumber = await contract.retrieve()
    console.log(
        `Updated Fvaourite Number : ${updatedFvaouriteNumber.toString()}`
    )
}

main()
// .then(() => ProcessingInstruction.exit(0))
// .catch((error) => {
//     console.error(error)
//     ProcessingInstruction.exit(1)
// })
