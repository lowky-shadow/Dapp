import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import Input from "./SmallComponents/Input";
import Button from "./SmallComponents/Button";

//interface TransferProps {}

const Transfer: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  if (!wallet.publicKey) return;

  // Validation helper
  const isValidAddress = (addr: string): boolean => {
    try {
      new PublicKey(addr);
      return true;
    } catch {
      return false;
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const sendSol = async (): Promise<void> => {
    // Input validation
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!address.trim()) {
      //if address is empty
      alert("Please enter a recipient address!");
      return;
    }

    if (!isValidAddress(address.trim())) {
      //if address is invalid
      alert("Invalid Solana address!");
      return;
    }

    const numAmount: number = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      //if it is zero of negative, return
      alert("Please enter a valid amount greater than 0!");
      return;
    }

    setIsLoading(true);

    try {
      // Check balance first
      const balance: number = await connection.getBalance(wallet.publicKey);
      const balanceInSol: number = balance / LAMPORTS_PER_SOL;

      //balanceInSol is the balance you have
      //numAmount is the amount you want to send
      if (balanceInSol < numAmount) {
        alert(`Insufficient balance! You have ${balanceInSol.toFixed(4)} SOL`);
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(address.trim()),
          lamports: Math.floor(numAmount * LAMPORTS_PER_SOL),
        })
      );

      // Get latest blockhash
      const latestBlockhash = await connection.getLatestBlockhash();

      // Send the transaction
      const signature: string = await wallet.sendTransaction(
        transaction,
        connection
      );

      console.log(`Transaction sent: ${signature}`);

      // Confirm the transaction
      await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
      );

      alert(`Transaction successful! Signature: ${signature.slice(0, 20)}...`);

      // Clear form
      setAmount("");
      setAddress("");
    } catch (err: unknown) {
      console.error("Transaction error:", err);

      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      if (errorMessage.includes("User rejected")) {
        alert("Transaction was cancelled.");
      } else if (errorMessage.includes("insufficient")) {
        alert("Insufficient funds for transaction and fees!");
      } else {
        alert(`Transaction failed: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-evenly gap-3 bg-slate-900 w-1/3 rounded-3xl shadow-2xl">
      <h1 className="text-2xl font-semibold p-5">Send SOL</h1>

      <div className="flex flex-col gap-6 min-w-md ">
        <Input
          type="text"
          placeholder="Address"
          className="outline-[5px] outline-slate-950"
          value={address}
          onChange={handleAddressChange}
          disabled={isLoading}
        />

        <Input
          type="number"
          placeholder="Amount (SOL)"
          className=""
          value={amount}
          onChange={handleAmountChange}
          disabled={isLoading}
        />
      </div>
      <Button
        isLoading={isLoading}
        onClick={sendSol}
        className="min-w-sm"
        disabled={isLoading || !wallet.publicKey}
      >
        {isLoading ? "Sending..." : "Send SOL"}
      </Button>
    </div>
  );
};

export default Transfer;