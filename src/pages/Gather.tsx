import Airdrop from "../components/Airdrop";
import SendSol from "../components/SendSol";
import { SignMessage } from "../components/SignMessage";

function Gather(){
  return (
    <>
      <Airdrop />
      <SendSol />
      <SignMessage />
    </>
  );
}

export default Gather;
