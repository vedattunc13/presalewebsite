const { useMemo, useEffect } = React;
const { ConnectionProvider, WalletProvider, useWallet } = walletAdapterReact;
const { WalletModalProvider, WalletMultiButton } = walletAdapterReactUi;
const { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } = walletAdapterWallets;
const { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } = solanaWeb3;

function AppContent() {
    const wallet = useWallet();
    const [balance, setBalance] = React.useState(0);

    const connection = useMemo(() => new Connection(clusterApiUrl('devnet')), []);

    useEffect(() => {
        if (wallet.connected && wallet.publicKey) {
            connection.getBalance(wallet.publicKey).then((balance) => {
                setBalance(balance / LAMPORTS_PER_SOL);
                document.getElementById("buyBtn").disabled = false;
                document.getElementById("airdropBtn").disabled = false;
            });
        } else {
            setBalance(0);
            document.getElementById("buyBtn").disabled = true;
            document.getElementById("airdropBtn").disabled = true;
        }
    }, [wallet.connected, wallet.publicKey]);

    useEffect(() => {
        document.getElementById("buyBtn").onclick = () => {
            const solAmount = parseFloat(document.getElementById("solAmount").value);
            const soliumAmount = solAmount / 0.001;
            document.getElementById("soliumAmount").innerText = `${soliumAmount} SOLIUM`;
            alert(`Presale request sent for ${solAmount} SOL`);
            // Burada backend API çağrısı yapılabilir.
        };

        document.getElementById("airdropBtn").onclick = () => {
            alert(`Airdrop request sent for ${wallet.publicKey}`);
            // Burada backend API çağrısı yapılabilir.
        };
    }, [wallet]);

    return React.createElement('div', null, 
        React.createElement('div', {style: {margin: "15px"}}, `Connected wallet: ${wallet.publicKey || "Not Connected"}`),
        React.createElement('div', null, `Balance: ${balance} SOL`)
    );
}

const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter()
];

function App() {
    return React.createElement(
        ConnectionProvider, { endpoint: clusterApiUrl('devnet') },
        React.createElement(
            WalletProvider, { wallets: wallets, autoConnect: true },
            React.createElement(
                WalletModalProvider, null,
                React.createElement('div', null, 
                    React.createElement(WalletMultiButton),
                    React.createElement(AppContent)
                )
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('wallet-connect'));
root.render(React.createElement(App));
