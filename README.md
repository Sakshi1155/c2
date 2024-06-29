# Marketing System

This project demonstrates a basic Ethereum smart contract for a social media application where users can create profiles and write posts on the blockchain.

## Prerequisites

- Node.js (for package management)
- Remix IDE (for contract development and obtaining ABI and contract address)
- MetaMask (or other Ethereum wallet)

## Installing

### Compiling and Deploying the Contract

1. **Compile the Solidity Contract:**
   - Use Remix IDE or your preferred Solidity development environment to compile the `SocialMedia.sol` contract.

2. **Deploying the Contract:**
   - Deploy the compiled contract to your preferred Ethereum network (local, testnet, or mainnet). Use MetaMask or a similar tool to inject accounts and obtain the contract address and ABI.

## Frontend

1. **HTML and CSS Setup:**
   - Create `index.html` and `style.css` files for the frontend UI.

2. **JavaScript Integration:**
   - Implement `script.js` to interact with the deployed contract. Ensure to provide the ABI, contract address, and setup provider, signer, and contract references.

## Usage

1. Open `index.html` in your web browser.
2. Connect your MetaMask wallet to the appropriate Ethereum network.
3. Use the provided forms to create a profile by entering your name and bio.
4. View existing posts displayed on the page.

## Example Code

Below is an example of how to interact with the contract using `script.js`:

```javascript
let provider;
let signer;
let contract;
{
async function connect() {
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);

            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            // Replace with your deployed contract address and ABI
            const contractAddress = '0x1542422b513C6E75e1bFb6F01e3bfe45b5B65019'; // Replace with your deployed contract address
            const contractABI = [
                // Insert your contract ABI here
            ];

            // Create a connection to the smart contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            alert('Wallet connected');
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('No wallet found');
    }
}
}

## License
This project is licensed under the MIT License.
## Author
Sakshi
