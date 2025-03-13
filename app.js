let userPublicKey = null;

document.getElementById("wallet-btn").onclick = connectWallet;
document.getElementById("buyBtn").onclick = buySolium;
document.getElementById("airdropBtn").onclick = claimAirdrop;

disableButtons();

async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const resp = await window.solana.connect();
            userPublicKey = resp.publicKey.toString();
            alert("Wallet Connected: " + userPublicKey);
            enableButtons();
        } catch (err) {
            alert("Wallet connection rejected.");
        }
    } else {
        alert("Please install the Phantom wallet.");
    }
}

function buySolium() {
    const solAmount = parseFloat(document.getElementById("solAmount").value);
    const soliumAmount = solAmount / 0.001;
    document.getElementById("soliumAmount").innerText = `${soliumAmount} SOLIUM`;
    alert(`Transaction request for ${solAmount} SOL sent to backend.`);
    // Backend API call here
}

function claimAirdrop() {
    alert("Airdrop claim request sent to backend.");
    // Backend API call here
}

function disableButtons() {
    document.getElementById("buyBtn").disabled = true;
    document.getElementById("airdropBtn").disabled = true;
}

function enableButtons() {
    document.getElementById("buyBtn").disabled = false;
    document.getElementById("airdropBtn").disabled = false;
}
