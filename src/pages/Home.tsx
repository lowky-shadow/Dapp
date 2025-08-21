import  Transfer  from '@/components/Transfer'
import Swap from '@/components/Swap'


const Home = () => {
  return (
    <div className='flex justify-around pt-20 pb-20'>
      <Transfer />
      <Swap />
    </div>
  )
}

export default Home