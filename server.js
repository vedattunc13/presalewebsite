const express = require('express');
const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Örnek endpoint: Solium satın alma
app.post('/buy-solium', async (req, res) => {
    const { userPublicKey, solAmount } = req.body;
    try {
        // Rust akıllı sözleşmenizin adresi
        const contractAddress = new PublicKey('AKILLI_SOZLESME_ADRESI');

        // Buraya Rust smart contract işlemleri eklenmeli.
        console.log(`Kullanıcı: ${userPublicKey}, SOL miktarı: ${solAmount}`);

        res.json({ success: true, message: "Transaction sent to blockchain." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Örnek endpoint: Airdrop claim işlemi
app.post('/claim-airdrop', async (req, res) => {
    const { userPublicKey } = req.body;
    try {
        // Buraya Rust smart contract işlemleri eklenmeli.
        console.log(`Airdrop talebi: ${userPublicKey}`);

        res.json({ success: true, message: "Airdrop claimed successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Node.js backend çalışıyor: http://localhost:3000');
});
