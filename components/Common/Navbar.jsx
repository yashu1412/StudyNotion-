import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    // Check if the current path should trigger navbar hide
    const hideOnPaths = ["/login", "/signup", "/dashboard"];
    setHideNavbar(hideOnPaths.some((path) => matchPath({ path }, location.pathname)));
  }, [location]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <>
      {!hideNavbar && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
            location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
          } transition-all duration-200 md:relative`}
        >
          <div className="flex w-full max-w-screen-lg items-center justify-between px-4 md:px-6">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
            </Link>
            {/* Navigation links */}
            <nav className="hidden md:flex">
              <ul className="flex gap-x-6 text-richblack-25">
                {NavbarLinks.map((link, index) => (
                  <li key={index} className="relative">
                    {link.title === "Catalog" ? (
                      <div
                        className={`group relative flex cursor-pointer items-center gap-1 ${
                          matchRoute("/catalog/:catalogName")
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                        onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                      >
                        <p>{link.title}</p>
                        <BsChevronDown />
                        <div
                          className={`${
                            isCatalogOpen ? "visible opacity-100" : "invisible opacity-0"
                          } absolute left-[50%] top-[100%] z-[1000] flex w-[200px] translate-x-[-50%] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 transition-all duration-150 lg:w-[300px]`}
                        >
                          <div className="absolute left-[50%] top-2 -z-10 h-7 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : (
                            subLinks.map((subLink, i) => (
                              <Link key={i} to={`/catalog/${subLink.name}`}>
                                <p className="mx-auto p-3 hover:bg-richblack-200 rounded">
                                  {subLink.name}
                                </p>
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link to={link?.path}>
                        <p
                          className={`${
                            matchRoute(link?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            {/* Login / Signup / Dashboard */}
            <div className="hidden items-center gap-x-4 md:flex">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className="relative">
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token === null && (
                <>
                  <Link to="/login">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
              {token !== null && <ProfileDropdown />}
            </div>
            <button
              className="mr-4 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="fixed top-14 left-0 w-full bg-richblack-800 flex flex-col items-center gap-y-4 p-4 md:hidden">
              <nav>
                <ul className="flex flex-col gap-y-4 text-richblack-25">
                  {NavbarLinks.map((link, index) => (
                    <li key={index} className="relative w-full">
                      {link.title === "Catalog" ? (
                        <div
                          className="flex flex-col items-center gap-y-2 cursor-pointer w-full"
                          onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                        >
                          <p>{link.title}</p>
                          {isCatalogOpen && (
                            <div className="flex flex-col items-center gap-y-2 w-full">
                              {loading ? (
                                <p>Loading...</p>
                              ) : (
                                subLinks.map((subLink, i) => (
                                  <Link key={i} to={`/catalog/${subLink.name}`}>
                                    <p className="hover:bg-richblack-200 rounded p-2 w-full text-center">
                                      {subLink.name}
                                    </p>
                                  </Link>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link to={link?.path} className="w-full">
                          <p
                            className={`${
                              matchRoute(link?.path)
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            } w-full text-center`}
                          >
                            {link.title}
                          </p>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col items-center gap-y-4">
                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link to="/dashboard/cart" className="relative">
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                    {totalItems > 0 && (
                      <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                {token === null && (
                  <>
                    <Link to="/login">
                      <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                        Log in
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                        Sign up
                      </button>
                    </Link>
                  </>
                )}
                {token !== null && <ProfileDropdown />}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
