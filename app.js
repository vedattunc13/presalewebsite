// Gerekli kütüphaneleri import edin
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    ConnectionProvider,
    WalletProvider,
    useWallet
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
    SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
    clusterApiUrl,
    Connection,
    PublicKey
} from '@solana/web3.js';

// Solana ağı ve cüzdan adaptörlerini tanımlayın
const network = 'mainnet-beta';
const endpoint = clusterApiUrl(network);
const wallets = [
    new SolflareWalletAdapter()
];

// Cüzdan bileşenini oluşturun
const WalletComponent = () => {
    const {
        publicKey,
        connected
    } = useWallet();
    const [balance, setBalance] = useState(null);

    const getBalance = useCallback(async () => {
        if (!publicKey) {
            setBalance(null);
            return;
        }
        try {
            const connection = new Connection(endpoint);
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / 1e9); // Lamports to SOL
        } catch (error) {
            console.error('Bakiye alınamadı:', error);
            setBalance(null);
        }
    }, [publicKey]);

    useEffect(() => {
        getBalance();
    }, [getBalance]);

    return ( <
        div >
        <
        WalletMultiButton / >
        {
            connected && ( <
                div >
                <
                p > Cüzdan Adresi: {
                    publicKey.toBase58()
                } < /p> <
                p > Bakiye: {
                    balance !== null ? `${balance} SOL` : 'Yükleniyor...'
                } < /p> <
                /div>
            )
        } <
        /div>
    );
};

// Ana uygulama bileşenini oluşturun
const App = () => ( <
    ConnectionProvider endpoint = {
        endpoint
    } >
    <
    WalletProvider wallets = {
        wallets
    }
    autoConnect >
    <
    WalletModalProvider >
    <
    div className = "container" >
    <
    h1 > Solium Presale & Airdrop < /h1> <
    WalletComponent / >
    <
    /div> <
    /WalletModalProvider> <
    /WalletProvider> <
    /ConnectionProvider>
);

// Uygulamayı render edin
ReactDOM.render( < App / > , document.getElementById('root'));
