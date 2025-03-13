let walletAddress = null;
let solana = window.solana;

// Cüzdan Bağlama Fonksiyonu
document.getElementById("wallet-btn").onclick = async function() {
    if (!solana) {
        alert("Solana wallet not found! Please install Solflare or Phantom.");
        return;
    }

    try {
        const response = await solana.connect();
        walletAddress = response.publicKey.toString();
        document.getElementById("wallet-address").innerText = "Connected: " + walletAddress;
        enableButtons();
        getBalance();
    } catch (err) {
        console.error("Wallet connection failed:", err);
        alert("Wallet connection failed. Please try again.");
    }
};

// Solflare Web Wallet Açma Fonksiyonu
document.getElementById("solflare-btn").onclick = function() {
    window.open('https://solflare.com/access-wallet', '_blank');
};

// Bakiye Alma Fonksiyonu
async function getBalance() {
    if (!walletAddress) return;
    
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
    const balance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
    document.getElementById("balance").innerText = "Balance: " + (balance / solanaWeb3.LAMPORTS_PER_SOL) + " SOL";
}

// Butonları Etkinleştir
function enableButtons() {
    document.getElementById("buyBtn").disabled = false;
    document.getElementById("airdropBtn").disabled = false;
}

// Satın Alma Butonu
document.getElementById("buyBtn").onclick = function() {
    alert("Presale transaction sent!");
};

// Airdrop Butonu
document.getElementById("airdropBtn").onclick = function() {
    alert("Airdrop request sent!");
};
