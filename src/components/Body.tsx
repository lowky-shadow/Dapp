import Airdrop from '@/pages/Airdrop';
import Home from '@/pages/Home';
import Launchpad from '@/pages/Launchpad';
import Marketplace from '@/pages/Marketplace';
import { Route, Routes } from 'react-router-dom';

const Body = () => {
  return (
    <div className="mt-10 bg-slate-950 text-white">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launchpad" element={<Launchpad />} />
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </div>
  );
}

export default Body

//bg-[#050710]