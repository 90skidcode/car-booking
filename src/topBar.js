import bg from './images/logo.jpeg';
import { useState } from 'react';
import {  useNavigate } from "react-router-dom";
function TopBar(params) {
  let navigate = useNavigate();
  const [login, setlogin] = useState(sessionStorage.getItem('login') || false)
  return <section id="top-navigation" className="flex justify-between content-center pt-1 fixed w-screen text-center inset-x-0 top-0 z-10 bg-white shadow h-12 overflow-hidden">
    <img className='w-44 h-12' height={55} width={100} src={bg} alt="avatar" />
    {
      login ? <div className=''><svg onClick={() => { sessionStorage.clear(); setlogin(false) }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg> </div> : <svg onClick={() => { navigate('/login') }} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
    }
  </section>
}

export default TopBar;