import { useState } from "react";
import { getMinimumBalanceForRentExemptMint } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Button from "./SmallComponents/Button";
import Input from "./SmallComponents/Input";

function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [supply, setSupply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  async function createToken() {
    const lamport = await getMinimumBalanceForRentExemptMint(connection);
  }

  const inputText = "w-[50%]";
  return (
    <div className=" flex justify-center items-center  flex-col p-5 gap-5 ">
      <h1 className="text-3xl p-5">Solana Token Launchpad</h1>
      <Input
        className={inputText}
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      ></Input>{" "}
      
      <Input
        className={inputText}
        type="text"
        placeholder="Symbol"
        onChange={(e) => setSymbol(e.target.value)}
      ></Input>{" "}
      
      <Input
        className={inputText}
        type="text"
        placeholder="Image URL"
        onChange={(e) => setImageUrl(e.target.value)}
      ></Input>{" "}
      
      <Input
        className={inputText}
        type="text"
        placeholder="Initial Supply"
        onChange={(e) => setSupply(e.target.value)}
      ></Input>{" "}
      
      <Button className="min-w-1/3" onClick={createToken}>
        Create a token
      </Button>
    </div>
  );
}

export default TokenLaunchpad;
