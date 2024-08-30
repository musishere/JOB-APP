import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../../main';

function Jobs() {
   const [jobs, setJobs] = useState([]);
   const { isAutherized } = useContext(context);
   const navigateTo = useNavigate();

   useEffect(() => {
      try {
         axios
            .get('http://localhost:5000/api/v1/job/getall', {
               withCredentials: true,
            })
            .then((res) => {
               console.log(res);
               setJobs(res.data);
            });
      } catch (error) {
         console.log(error);
      }
   }, []);

   if (!isAutherized) {
      navigateTo('/login');
   }

   <section className='jobs page'>
      <div className='container'>
         <h1>ALL AVAILABLE JOBS</h1>
         <div className='banner'>
            {jobs.jobs &&
               jobs.jobs.map((element) => {
                  return (
                     <div
                        className='card'
                        key={element._id}
                     >
                        <p>{element.title}</p>
                        <p>{element.category}</p>
                        <p>{element.country}</p>
                        <Link to={`/job/${element._id}`}>Job Details</Link>
                     </div>
                  );
               })}
         </div>
      </div>
   </section>;
}
export default Jobs;
