/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { MyContext } from "src/Context/ListingDataContext";
import ToggleButton from "./ToggleButton";
const Logo = () => {
  return (
    <Link
      to="/"
      className="flex shrink-0 justify-center items-center text-medium-gold my-2 mr-4"
    >
      <img
        src="/images/logo/IFBC 3.png"
        alt="IFBC"
        loading="lazy"
        width={250}
        className="inline"
      />
    </Link>
  );
};

const Header = ({ mobileActive, setMobileActive }) => {
  const socials = [
    {
      text: "mail@ifbc.co",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
    {
      text: "+1 (800) 927-0203",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      ),
    },
  ];

  const isMobile = window.innerWidth < 992 ? true : false;
  return (
    <motion.nav
      className={`z-50 sticky top-0 w-full flex flex-col items-center justify-center text-white bg-custom-dark-blue border-b-2 border-color-custom-dark-blue xl:border-0 gap-3 ${
        isMobile ? "px-4 py-2" : " px-4 pt-2"
      }`}
      id="header-nav"
    >
      <div
        id="navbar-centered"
        className={`w-full  ${
          isMobile
            ? "flex justify-between items-center"
            : "grid grid-cols-3 px-8"
        }  md:px-0`}
      >
        {/* DETAILS */}
        <ul
          id="info-details-header"
          className={`${
            isMobile ? "hidden" : "flex justify-start gap-5"
          }  py-2 `}
        >
          {socials.map((button, index) => (
            <li key={index} className="flex gap-1 text-sm items-center">
              {button.svg}
              <a
                key={button.text}
                href={
                  button.text.includes("mail")
                    ? "mailto:" + button.text
                    : "tel:" + button.text
                }
              >
                {button.text}
              </a>
            </li>
          ))}
        </ul>

        {/* LOGO */}
        <Logo />

        {/* RIGHT SIDE BUTTONS CONTAINER */}
        <RightSideButtonsContainer
          mobileActive={mobileActive}
          setMobileActive={setMobileActive}
        />
      </div>

      <Navbar />
    </motion.nav>
  );
};

const RightSideButtonsContainer = ({ mobileActive, setMobileActive }) => {
  const isMobile = window.innerWidth < 992 ? true : false;
  const [active, setActive] = useState(false);
  const { ifLogin, setIfLogin, userDetails } = useContext(MyContext);

  const history = useNavigate();
  const elementStyle = active
    ? {
        position: "fixed",
        margin: "0px",
        transform: "translate(0px, 56px)",
        opacity: "1",
        display: "block",
        right: "15px",
        top: "10px",
      }
    : {};

  const handleLogOut = () => {
    localStorage.setItem("ifLogin", false);
    setIfLogin(false);
    history("/");
  };
  return (
    <div className={`${isMobile ? "" : "flex justify-end items-center gap-2"}`}>
      {/* BOOK AN APPOINTMENT */}
      <button
        className={`${
          isMobile
            ? "hidden"
            : "uppercase font-semibold rounded-full hover:bg-custom-heading-color hover:text-white transition-all duration-150 bg-white text-custom-heading-color px-10  text-sm h-10"
        } `}
      >
        Book an appointment
      </button>

      {/* USER BUTTON */}
      {ifLogin && (
        <div
          className={`hs-dropdown relative inline-flex ${
            isMobile ? "hidden" : ""
          }`}
        >
          <button
            id="user-icon "
            onClick={() => setActive(!active)}
            className="flex shadow-lg flex-wrap items-center justify-start gap-2 cursor-pointer"
          >
            <img
              src="/images/avatar-placeholder.png"
              className="w-10 h-10 rounded-full"
            />
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
            style={elementStyle}
          >
            <div className="flex flex-col items-start  py-2 px-3">
              <p className="text-[15px] text-[#333] font-bold">
                {userDetails
                  ? userDetails?.UserName?.charAt(0).toUpperCase() +
                    userDetails?.UserName?.slice(1)
                  : "John Doe"}
              </p>
              {/* <p className="text-xs text-gray-500 mt-0.5">
                {userDetails ? userDetails?.UserName : "johndoe23@gmail.com"}
              </p> */}

              <p className="text-xs text-gray-500 mt-0.5">
                {userDetails ? userDetails?.role : "role"}
              </p>
            </div>
            {/* logout button */}
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer"
              onClick={handleLogOut}
            >
              Log out
            </a>
          </div>
        </div>
      )}

      {/* TOGGLE BUTTON */}
      <ToggleButton
        setMobileActive={setMobileActive}
        mobileActive={mobileActive}
      />
    </div>
  );
};
export default Header;
