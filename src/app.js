const contractAddress = "0xYOUR_ECHO_CONTRACT_ADDRESS";
const abi = [
    "function getTrackCount() view returns (uint256)",
    "function tracks(uint256) view returns (string, string, address, uint256)",
    "function tipArtist(uint256) payable"
];

let provider, signer, contract;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        
        const addr = await signer.getAddress();
        document.getElementById('connect-btn').innerText = addr.slice(0,6) + "...";
        initContract();
    }
}

function initContract() {
    contract = new ethers.Contract(contractAddress, abi, signer);
}

async function sendTip(trackId) {
    const tipAmount = ethers.utils.parseEther("0.001");
    try {
        const tx = await contract.tipArtist(trackId, { value: tipAmount });
        console.log("Tipping artist... Hash:", tx.hash);
        await tx.wait();
        alert("Tip Received by Artist!");
    } catch (err) {
        console.error("Tip failed", err);
    }
}

document.getElementById('connect-btn').onclick = connectWallet;
