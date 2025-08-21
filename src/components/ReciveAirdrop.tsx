import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import Input from "./SmallComponents/Input";
import Button from "./SmallComponents/Button";

function RecieveAirdrop() {
  const wallet = useWallet();
  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);


  // Early return if wallet not connected
  if (!wallet.publicKey) {
    return (
      <div className="p-4  rounded mb-2 mt-2">
        <div className="text-center text-gray-500">
          Please connect your wallet to use the airdrop feature.
        </div>
      </div>
    );
  }

  async function airdrop(amountSol: number) {
    try {
      if (!wallet.publicKey) return;
      setIsLoading(true);

      await connection.requestAirdrop(
        wallet.publicKey,
        amountSol * LAMPORTS_PER_SOL
      );

      alert("Airdrop successful!");
    } catch (err) {
      console.error(err);
      alert(`Airdrop failed! ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function callAirDrop() {
    if (amount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }
    await airdrop(amount);
  }

  return (
    <div className="flex gap-5 flex-col p-5 items-center">
      <h1 className="text-3xl p-5">Recieve Airdrop</h1>
      <Input
        type="number"
        placeholder="Enter airdrop amount (SOL)"
        className="min-w-md"
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <Button onClick={callAirDrop} className="min-w-sm">
        {isLoading ? "Sending..." : "Send Airdrop"}
      </Button>
    </div>
  );
}

export default RecieveAirdrop;
