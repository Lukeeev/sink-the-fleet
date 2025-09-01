import Corvette_ship from '../assets/Corvette_ship.png'
import Canoe from '../assets/Canoe.png'
import Warship from '../assets/Warship.png'
import Junk from '../assets/Junk.png'
import ManOWar from '../assets/ManOWar.png'
import Scroll from '../assets/Scroll.png'

export default function Menu() {
  return (
    <div className='flex flex-col justify-center items-center max-w-full gap-8 min-h-40 m-40 font-lugrasimo text-2xl'>
        <div className='flex flex-row border rounded-2xl p-4 w-fit'>Play online                        <span><img src={Scroll} alt="Scroll" className='icon'/></span></div>
        <div className='flex flex-row border rounded-2xl p-4 w-fit'>Play against programmed opponent   <span><img src={Scroll} alt="Scroll" className='icon'/></span></div>
        <div className='flex flex-row border rounded-2xl p-4 w-fit'>Play against AI                    <span><img src={Scroll} alt="Scroll" className='icon'/></span></div>
        <div className='flex flex-row items-center'>
            <img src={Corvette_ship} alt="Corvette ship" className='w-72 h-auto' />
            <img src={Canoe} alt="Canoe" className='w-72 h-auto' />
            <img src={Warship} alt="Warship" className='w-72 h-auto' />
            <img src={Junk} alt="Junk ship" className='w-72 h-auto' />
            <img src={ManOWar} alt="ManOWar" className='w-72 h-auto' />
        </div>
    </div>
  )
}
