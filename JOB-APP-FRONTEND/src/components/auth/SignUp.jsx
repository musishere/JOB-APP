import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { useState } from 'react';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdOutlineMail, MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';
import { context } from '../../main';

function SignUp() {
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [name, setName] = useState('');
   const [role, setRole] = useState('');

   const { isAutherized, setIsAutherized, user, setUser } = useContext(context);
   const handleRegister = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post(
            'http://localhost:5000/api/v1/user/register',
            { name, email, role, phone, password },
            {
               withCredentials: true,
               headers: {
                  'Content-Type': 'application/json',
               },
            },
         );

         toast.success(response?.data?.message);
         setName('');
         setPhone('');
         setEmail('');
         setRole('');
         setPassword('');
         setIsAutherized(true);
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   if (isAutherized) return <Navigate to={'/'} />;

   return (
      <>
         <section className='authPage'>
            <div className='container'>
               <div className='header'>
                  <img
                     src='/JobZeelogo.png'
                     alt='logo'
                  />
                  <h3>Create a new account</h3>
               </div>
               <form>
                  <div className='inputTag'>
                     <label>Register As</label>
                     <div>
                        <select
                           value={role}
                           onChange={(e) => setRole(e.target.value)}
                        >
                           <option value=''>Select Role</option>
                           <option value='Employer'>Employer</option>
                           <option value='Job Seeker'>Job Seeker</option>
                        </select>
                        <FaRegUser />
                     </div>
                  </div>
                  <div className='inputTag'>
                     <label>Name</label>
                     <div>
                        <input
                           type='text'
                           placeholder='Mustafa'
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                        <FaPencilAlt />
                     </div>
                  </div>
                  <div className='inputTag'>
                     <label>Email Address</label>
                     <div>
                        <input
                           type='email'
                           placeholder='mus@gmail.com'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <MdOutlineMailOutline />
                     </div>
                  </div>
                  <div className='inputTag'>
                     <label>Phone Number</label>
                     <div>
                        <input
                           type='number'
                           placeholder='0336621973'
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                        />
                        <FaPhoneFlip />
                     </div>
                  </div>
                  <div className='inputTag'>
                     <label>Password</label>
                     <div>
                        <input
                           type='password'
                           placeholder='Your Password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                        <RiLock2Fill />
                     </div>
                  </div>
                  <button
                     type='submit'
                     onClick={handleRegister}
                  >
                     Register
                  </button>
                  <Link to={'/login'}>Login Now</Link>
               </form>
            </div>
            <div className='banner'>
               <img
                  src='/register.png'
                  alt='register'
               />
            </div>
         </section>
      </>
   );
}
export default SignUp;
