import bg from './images/logo.jpeg';
import { useNavigate } from "react-router-dom";
function TopBar() {
  let navigate = useNavigate();
  if (!sessionStorage.getItem('user')) {
    navigate('/login'); sessionStorage.clear();
  }
  return <section id="top-navigation" className="flex justify-between items-center content-center pt-1 fixed w-screen text-center inset-x-0 top-0 z-10 bg-white shadow h-12 overflow-hidden">
    <img className='w-44 h-12 pl-3 mt-1' height={55} width={100} src={bg} alt="avatar" />
    {
      <svg onClick={() => { navigate('/login'); sessionStorage.clear(); }} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    }
  </section>
}

export default TopBar;