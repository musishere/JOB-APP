import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../../main';

function Navbar() {
   const [show, setShow] = useState(false);
   const { isAutherized, user, setIsAutherized } = useContext(context);
   const navigateTo = useNavigate();

   const handleLogOut = async () => {
      try {
         const response = await axios.get(
            'http://localhost:5000/api/v1/user/logout',
            { withCredentials: true },
         );
         toast.success(response?.data?.message);
         setIsAutherized(false);
         navigateTo('/login');
      } catch (error) {
         toast.error(error.response?.data?.message);
         setIsAutherized(false);
      }
   };

   return (
      <nav className={isAutherized ? 'navbarShow' : 'navbarHide'}>
         <div className='container'>
            <div className='logo'>
               <img
                  src='/JobZee-logos__white.png'
                  alt='logo'
               />
            </div>
            <ul className={!show ? 'menu' : 'show-menu menu'}>
               <li>
                  <Link
                     to={'/'}
                     onClick={() => setShow(false)}
                  >
                     HOME
                  </Link>
               </li>
               <li>
                  <Link
                     to={'/job/getall'}
                     onClick={() => setShow(false)}
                  >
                     ALL JOBS
                  </Link>
               </li>
               <li>
                  <Link
                     to={'/applications/me'}
                     onClick={() => setShow(false)}
                  >
                     {user && user.role === 'Employer'
                        ? "APPLICANT'S APPLICATIONS"
                        : 'MY APPLICATIONS'}
                  </Link>
               </li>
               {user && user.role === 'Employer' ? (
                  <>
                     <li>
                        <Link
                           to={'/job/post'}
                           onClick={() => setShow(false)}
                        >
                           POST NEW JOB
                        </Link>
                     </li>
                     <li>
                        <Link
                           to={'/job/me'}
                           onClick={() => setShow(false)}
                        >
                           VIEW YOUR JOBS
                        </Link>
                     </li>
                  </>
               ) : (
                  <></>
               )}

               <button onClick={handleLogOut}>LOGOUT</button>
            </ul>
            <div className='hamburger'>
               <GiHamburgerMenu onClick={() => setShow(!show)} />
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
