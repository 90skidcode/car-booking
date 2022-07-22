import bg from './images/login.png';
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
    const [status, setstatus] = useState(false)
    let navigate = useNavigate();
    const requestOtp = () => {
        sessionStorage.setItem('login',true);
        navigate('/booking');
    }

    const updateValue = (e) => {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
    return <div className="h-screen overflow-hidden bg-white rounded-lg shadow-lg ">
        <img className="object-cover object-center  h-[60vh]" src={bg} alt="avatar"/>    
        <div className="fixed bottom-0  w-full">       
        <div className="flex items-center px-3 py-3 mb-10 bg-blue-900">
            <h1 className="mx-3 text-lg font-semibold text-white">Enter details to login / sign-up</h1>
        </div>
        
        { !status ?          
            <div className="items-center text-black dark:text-gray-200 px-5">               
                <h1 className="text-md text-black">Mobile Number</h1>
                <input type="number" name='mobilenumber' onChange={(e)=> updateValue(e)} onWheel={(e) => e.target.blur()} className="mt-1 h-12 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full " />
                <button type="button" onClick={()=>{setstatus(true)}} className="p-4 my-2 w-full bg-blue-600  text-white  font-medium  text-xs  leading-tight  uppercase  shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out">
                  Request OTP
                </button>
            </div>
        :
        <div className="items-center text-black dark:text-gray-200 px-5">               
                <h1 className="text-md text-black">OTP</h1>
                <input type="number" name="otp" onWheel={(e) => e.target.blur()} className="mt-1 h-12 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full " />
                <button type="button" onClick={()=>requestOtp()} className="p-4 my-2 w-full bg-blue-600  text-white  font-medium  text-xs  leading-tight  uppercase  shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out">
                  Submit
                </button>
            </div>
        }
        </div>
    </div>
}

export default Login;