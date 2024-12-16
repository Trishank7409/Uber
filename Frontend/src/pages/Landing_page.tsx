
import { Link } from 'react-router-dom'
import logo  from '../assets/Uber_logo_2018.png'
import image from '../assets/photo-1593950315186-76a92975b60c.avif'
const Landing_page = () => {
  return (
   <div>
    <div className="bg-red-400 w-full h-screen flex flex-col justify-between " style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
        <img className=' h-12 w-20 px-3 py-3' src={logo} alt="uber_logo" />
        <div className='p-5 bg-white items-end'>
          <div className='text-black font-bold text-2xl  '>
            Welcome to Uber
          </div>
          <Link to={'/login'} className=' flex justify-center align-middle w-full text-center h-8 rounded-md  bg-black text-white font-sans py-auto text-xl'>Continue</Link>
        </div>
      
    </div>
   </div> 
  )
}

export default Landing_page
