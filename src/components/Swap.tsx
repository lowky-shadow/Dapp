import { useState } from "react";
import Input from "./SmallComponents/Input";
import Button from "./SmallComponents/Button";

const Swap = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="bg-slate-900 flex flex-col  items-center gap-3 p-5 w-1/3 rounded-3xl ">
      <h1 className="text-2xl p-5 font-semibold">Swap</h1>
      <div className="flex flex-col min-w-md gap-6">

        <Input id="from" type="text" className="" placeholder="From" />
        <Input id="to" type="text" className="" placeholder="To" />
        
      </div>
      <Button
        className="min-w-sm"
        // onClick={}
        // disabled={isLoading || !wallet.publicKey}
      >
        {isLoading ? "Swaping..." : "Swap"}
      </Button>
    </div>
  );
};

export default Swap;
