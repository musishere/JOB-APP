import App from './App.jsx';
import { StrictMode, createContext, useState } from 'react';
import { createRoot } from 'react-dom/client';

export const context = createContext({ isAutherized: false });

const AppWraper = () => {
   const [isAutherized, setIsAutherized] = useState(false);
   const [user, setUser] = useState({});
   return (
      <context.Provider
         value={{ isAutherized, setIsAutherized, user, setUser }}
      >
         <App />
      </context.Provider>
   );
};

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <AppWraper />
   </StrictMode>,
);
