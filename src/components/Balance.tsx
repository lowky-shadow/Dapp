import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const Balance = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  
  // Use useEffect to fetch balance when wallet changes
  useEffect(() => {
    if (wallet.publicKey) {
      connection
        .getBalance(wallet.publicKey)
        .then((bal) => setBalance(bal / LAMPORTS_PER_SOL))
        .catch((err) => console.error("Error fetching balance:", err));
    } else {
      setBalance(0);
    }
  }, [wallet.publicKey, connection]);

  return (
    <button className="bg-slate-800 p-3 rounded-2xl hover:bg-slate-700">
      {balance.toFixed(2)} Sol
    </button>
  );
};

export default Balance;
