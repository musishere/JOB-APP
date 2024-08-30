import './App.css';
import Application from './components/application/Application';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import JobDetails from './components/job/JobDetails';
import Jobs from './components/job/Jobs';
import Login from './components/auth/Login';
import MyJobs from './components/job/MyJobs';
import Myapplication from './components/application/Myapplication';
import Navbar from './components/layout/Navbar';
import NotFound from './components/notfound/NotFound';
import PostJob from './components/job/PostJob';
import SignUp from './components/auth/SignUp';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { context } from './main';

function App() {
   const { isAuthorized, setIsAuthorized, setUser } = useContext(context);
   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await axios.get(
               'http://localhost:5000/api/v1/user/getuser',
               {
                  withCredentials: true,
               },
            );
            setUser(response.data.user);
            setIsAuthorized(true);
         } catch (error) {
            console.log(error);
         }
      };
      fetchUser();
   }, [isAuthorized]);

   return (
      <>
         <BrowserRouter>
            <Navbar />
            <Routes>
               <Route
                  path='/login'
                  element={<Login />}
               />
               <Route
                  path='/register'
                  element={<SignUp />}
               />
               <Route
                  path='/'
                  element={<Home />}
               />
               <Route
                  path='/job/getall'
                  element={<Jobs />}
               />
               <Route
                  path='/job/:id'
                  element={<JobDetails />}
               />
               <Route
                  path='/application/:id'
                  element={<Application />}
               />
               <Route
                  path='/applications/me'
                  element={<Myapplication />}
               />
               <Route
                  path='/job/post'
                  element={<PostJob />}
               />
               <Route
                  path='/job/me'
                  element={<MyJobs />}
               />
               <Route
                  path='*'
                  element={<NotFound />}
               />
            </Routes>
            <Footer />
            <Toaster />
         </BrowserRouter>
      </>
   );
}
export default App;
