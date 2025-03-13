document.addEventListener("DOMContentLoaded", function () {
    let walletAddress = null;

    // Solana cüzdan API'si kontrolü
    function getSolanaProvider() {
        if ("solana" in window) {
            return window.solana;
        } else {
            return null;
        }
    }

    const solana = getSolanaProvider();
    const walletBtn = document.getElementById("wallet-btn");
    const solflareBtn = document.getElementById("solflare-btn");
    const walletAddressDiv = document.getElementById("wallet-address");
    const balanceDiv = document.getElementById("balance");

    // **1. Connect Wallet Butonuna Event Listener Ekle**
    walletBtn.addEventListener("click", async function () {
        if (!solana) {
            alert("Solana wallet not found! Please install Solflare or Phantom.");
            return;
        }

        try {
            const response = await solana.connect();
            walletAddress = response.publicKey.toString();
            walletAddressDiv.innerText = "Connected: " + walletAddress;
            enableButtons();
            getBalance();
        } catch (err) {
            console.error("Wallet connection failed:", err);
            alert("Wallet connection failed. Please try again.");
        }
    });
async function connectWallet() {
    if (!window.solana) {
        alert("Solana cüzdanı bulunamadı! Lütfen Solflare veya Phantom yükleyin.");
        return;
    }

    try {
        // Cüzdanın otomatik bağlantı yetkisi olup olmadığını kontrol et
        if (!window.solana.isConnected) {
            alert("Cüzdana bağlanılıyor...");
            const response = await window.solana.connect({ onlyIfTrusted: false }); // Kullanıcıdan izin iste
        }

        if (window.solana.publicKey) {
            let walletAddress = window.solana.publicKey.toString();
            alert("Bağlandı: " + walletAddress);
            document.getElementById("wallet-address").innerText = "Bağlandı: " + walletAddress;

            // Cüzdandan erişim izni al
            await requestWalletPermissions();

            // Cüzdan bakiyesini al ve göster
            getBalance(walletAddress);
        }
    } catch (error) {
        alert("Cüzdan bağlantısı reddedildi veya başarısız oldu: " + error.message);
    }
}

// Cüzdandan erişim izni isteme
async function requestWalletPermissions() {
    try {
        const permissions = await window.solana.request({ method: "requestPermissions" });

        if (permissions) {
            alert("Cüzdan erişimi onaylandı!");
        } else {
            alert("Cüzdan erişimi reddedildi.");
        }
    } catch (error) {
        alert("Cüzdan izin hatası: " + error.message);
    }
}

// Cüzdanın SOL bakiyesini çekme
async function getBalance(walletAddress) {
    try {
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
        alert("Bakiye: " + (balance / solanaWeb3.LAMPORTS_PER_SOL) + " SOL");
    } catch (error) {
        alert("Bakiye çekilemedi: " + error.message);
    }
}
    import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const network = 'mainnet-beta';
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [
        new SolflareWalletAdapter(),
        // Diğer cüzdan adaptörlerini buraya ekleyebilirsiniz
    ], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {/* Uygulamanızın bileşenleri */}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
    // **2. Solflare Web Wallet Butonuna Event Listener Ekle**
    solflareBtn.addEventListener("click", function () {
        window.open("https://solflare.com/access-wallet", "_blank");
    });

    // **3. Bakiye Alma Fonksiyonu**
    async function getBalance() {
        if (!walletAddress) return;

        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
        balanceDiv.innerText = "Balance: " + (balance / solanaWeb3.LAMPORTS_PER_SOL) + " SOL";
    }

    // **4. Satın Alma Butonu**
    document.getElementById("buyBtn").addEventListener("click", function () {
        alert("Presale transaction sent!");
    });

    // **5. Airdrop Butonu**
    document.getElementById("airdropBtn").addEventListener("click", function () {
        alert("Airdrop request sent!");
    });

    // **6. Butonları Etkinleştir**
    function enableButtons() {
        document.getElementById("buyBtn").disabled = false;
        document.getElementById("airdropBtn").disabled = false;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    alert("✅ Sayfa Yüklendi!");

    const walletBtn = document.getElementById("wallet-btn");
    if (walletBtn) {
        alert("✅ Connect Wallet butonu bulundu!");
        walletBtn.addEventListener("click", function () {
            alert("🟠 Connect Wallet butonuna tıklandı!");
        });
    } else {
        alert("❌ Connect Wallet butonu BULUNAMADI!");
    }

    const solflareBtn = document.getElementById("solflare-btn");
    if (solflareBtn) {
        alert("✅ Solflare butonu bulundu!");
        solflareBtn.addEventListener("click", function () {
            alert("🟠 Solflare butonuna tıklandı!");
        });
    } else {
        alert("❌ Solflare butonu BULUNAMADI!");
    }
});
