
import { useState } from "react"

function TokenLaunchpad() {
  const [name,setName] = useState("");
  const [symbol,setSymbol] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [supply,setSupply] = useState("");
  
  function createToken(){
    
  }
  
  return  <div style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' type='text' placeholder='Name'onChange={(e)=>setName(e.target.value)}></input> <br />
        <input className='inputText' type='text' placeholder='Symbol' onChange={(e)=>setSymbol(e.target.value)}></input> <br />
        <input className='inputText' type='text' placeholder='Image URL' onChange={(e)=>setImageUrl(e.target.value)}></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply' onChange={(e)=>setSupply(e.target.value)}></input> <br />
        <button className='btn' onClick={createToken}>Create a token</button>
    </div>
}

export default TokenLaunchpad