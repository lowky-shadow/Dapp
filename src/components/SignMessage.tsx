import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      if (!publicKey) {
        alert("Wallet not connected!");
        return;
      }

      if (!signMessage) {
        alert("Wallet does not support message signing!");
        return;
      }

      if (!message.trim()) {
        alert("Please enter a message to sign!");
        return;
      }

      setIsLoading(true);

      const encodedMessage = new TextEncoder().encode(message.trim());
      const signature = await signMessage(encodedMessage);

      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        throw new Error("Message signature invalid!");
      }

      console.log(`Message signature: ${bs58.encode(signature)}`);
      alert("Success: Message signed successfully!");
      setMessage("");
    } catch (error) {
      console.error("Signing error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Signing failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (!publicKey) {
    return (
      <div className="border p-5 rounded">
        <div className="text-center text-gray-500">
          Please connect your wallet to sign messages.
        </div>
      </div>
    );
  }

  return (
    <div className="border p-5 rounded ">
      <div className="flex gap-3">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          value={message}
          placeholder="Enter message to sign"
          className="border p-2 rounded min-w-1/3"
          disabled={isLoading}
        />
        <button
          onClick={onClick}
          disabled={isLoading || !message.trim()}
          className={`border p-3 rounded min-w-1/3 ${
            isLoading || !message.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } `}
        >
          {isLoading ? "Signing..." : "Sign the message"}
        </button>
      </div>
    </div>
  );
}
