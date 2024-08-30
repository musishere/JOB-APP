import { useContext } from "react";
import { FaFacebook, FaFacebookF, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { context } from "../../main";

function Footer() {
   const { isAutherized, setIsAutherized, user } = useContext(context);

   return (
      <footer className={isAutherized ? 'footerShow' : 'footerHide'}>
         <div>&copy; All Rights Resererd By VerginTech.</div>
         <div>
            <Link
               to={'/'}
               target='_blank'
            >
               <FaFacebookF />
            </Link>
            <Link
               to={'/'}
               target='_blank'
            >
               <FaYoutube />
            </Link>
            <Link
               to={'/'}
               target='_blank'
            >
               <FaLinkedin />
            </Link>
            <Link
               to={'/'}
               target='_blank'
            >
               <RiInstagramFill />
            </Link>
         </div>
      </footer>
   );
}
export default Footer;
