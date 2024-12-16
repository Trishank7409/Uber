import { Link } from 'react-router-dom'
import logo  from '../assets/Uber_logo_2018.png'

const User_Login = () => {
  return (
    <div className='h-screen'>
      <img className=' h-12 w-24 px-3 py-3' src={logo} alt="uber_logo" />
      <form>
        <h3 className="font-bold text-1.5xl px-3 py-3 mt-4">
          What's Your Email ?
        </h3>
        <input 
        type="email" name="email" id="email" 
        placeholder="example@gmail.com"
        required
        className="border px-4 py-2 ml-3 bg-[#EBEFF7] rounded-md text-lg"
        />
        <h3 className="font-bold text-1.5xl px-3 py-3 mt-1">
          What's Your Password ?
        </h3>
        <input 
        type="password" name="password" id="password" 
        placeholder="password"
        required
        className="border px-4 py-2 ml-3 bg-[#EBEFF7] rounded-md text-lg"
        />
        <div className="p-3 text-center flex flex-col justify-between" >
        <div >
          <button className="flex justify-center items-center w-full text-center h-10 rounded-md bg-black text-white font-sans py-auto text-lg">Login</button>
          <span className="align-middle">
            Don't have an Account? <Link to={'/User_Register'} className="text-blue-500 font-semibold">Create Account</Link>
          </span>
        </div>
        <div>
          <button className="flex justify-center items-center w-full text-center h-10  rounded-md mt-3 bg-[#7cd80ce1] text-white font-sans py-auto text-lg">
            Sign In as Captain
          </button>
        </div>       
      </div>    
    </form>
  </div>
  )
}

export default User_Login
