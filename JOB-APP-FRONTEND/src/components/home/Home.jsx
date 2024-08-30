import Hero from './Hero';
import Howitworks from './Howitworks';
import PupolarCategories from './PupolarCategories';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { context } from '../../main';
import { PopularCompaines } from './PopularCompanies';

const Home = () => {
   const { isAutherized } = useContext(context);

   if (!isAutherized) {
      return <Navigate to={'/login'} />;
   }

   return (
      <>
         <section className='homePage page'>
            <Hero />
            <Howitworks />
            <PupolarCategories />
            <PopularCompaines />
         </section>
      </>
   );
};

export default Home;
