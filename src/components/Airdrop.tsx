import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

function Airdrop() {
  const wallet = useWallet();
  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);

  if (!wallet.connected) {
    return <div>Please connect your wallet</div>;
  }
  if (!wallet.publicKey) return;

  connection
    .getBalance(wallet.publicKey)
    .then((bal) => setBalance(bal / LAMPORTS_PER_SOL));

  async function airdrop(amountSol: number) {
    try {
      if (!wallet.publicKey) return;
      await connection.requestAirdrop(
        wallet.publicKey,
        amountSol * LAMPORTS_PER_SOL
      );

      alert("Airdrop successful!");
    } catch (err) {
      console.error(err);
      alert("Airdrop failed!");
    }
  }

  async function callAirDrop() {
    await airdrop(amount);
  }

  return (
    <div className="m-5 ">
      <input
        type="number"
        placeholder="Enter airdrop amount (SOL)"
        className="border mr-3"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={callAirDrop} className="border bg-slate-500 p-3 rounded">Send the Airdrop</button>
      <div className="p-3 text-2xl">Wallet Address: {wallet.publicKey?.toBase58()}</div>
      <div className="p-3 text-2xl"> Balance: {balance}</div>
    </div>
  );
}

export default Airdrop;
