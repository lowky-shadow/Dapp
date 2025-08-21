import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";
import Balance from "./Balance";
import WalletAddress from "./WalletAddress";


const NavBar = () => {
  return (
    <nav className="p-5 bg-slate-950 text-white">
      <div className="flex justify-between rounded-2xl">
        {/* Navigation */}
        <div className="flex gap-3 items-center rounded-2xl">

          <Link to="/" className="p-4 hover:bg-slate-800 rounded-2xl">
            Home
          </Link>
          <Link to="/launchpad" className="p-4 hover:bg-slate-800 rounded-2xl">
            Launchpad
          </Link>
          <Link to="/airdrop" className="p-4 hover:bg-slate-800 rounded-2xl">
            Airdrop
          </Link>
          <Link to="/marketplace" className="p-4 hover:bg-slate-800 rounded-2xl">
            Marketplace
          </Link>
        </div>

        {/* Wallet Connect Buttons */}
        <div className="flex items-center gap-2">
          <WalletAddress />
          <Balance />
          <WalletMultiButton >Connect</WalletMultiButton>
          {/* <WalletDisconnectButton>Disconnect</WalletDisconnectButton> */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar