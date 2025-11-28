"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { RainbowButton } from "@/components/ui/rainbow-button";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center ${sticky
          ? "dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky fixed z-9999 bg-white/80 backdrop-blur-xs transition"
          : "absolute bg-transparent"
          }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link href="/">
                <Image
                  src="/images/logo/header-logo.png"
                  alt="logo"
                  width={140}
                  height={120}
                  className="dark:hidden"
                />
                <Image
                  src="/images/logo/header-logo.png"
                  alt="logo"
                  width={140}
                  height={100}
                  className="hidden dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="ring-primary absolute top-1/2 right-4 block translate-y-[-50%] rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "top-[7px] rotate-45" : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0" : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "top-[-8px] -rotate-45" : " "
                      }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar border-body-color/50 dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[220px] rounded border-[.5px] bg-white px-6 py-4 duration-300 
                    lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                    }`}
                >
                  <ul className="block lg:flex lg:items-center lg:space-x-6">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.submenu ? (
                          <>
                            <Link
                              href={menuItem.path || "#"}
                              onClick={menuItem.path ? undefined : () => handleSubmenu(index)}
                              className={`flex cursor-pointer items-center justify-between py-2 text-sm lg:px-2 lg:py-3 lg:text-xs group-hover:text-primary dark:group-hover:text-white ${usePathName === menuItem.path
                                ? "text-primary dark:text-white"
                                : "text-dark dark:text-white/70"
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                {menuItem.icon && (
                                  <menuItem.icon className="w-4 h-4 mr-1" aria-hidden="true" />
                                )}
                                <span>{menuItem.title}</span>
                              </div>
                              <span className="pl-2" onClick={(e) => {
                                e.preventDefault();
                                handleSubmenu(index);
                              }}>
                                <svg width="20" height="20" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </Link>
                            <div
                              className={`submenu dark:bg-dark relative top-full left-0 rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 
                              lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[200px] lg:p-3 lg:opacity-0 lg:shadow-md lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? "block" : "hidden"
                                }`}
                            >
                              {menuItem.submenu.map((submenuItem, subIndex) => (
                                <Link
                                  href={submenuItem.path}
                                  key={subIndex}
                                  className="text-dark hover:text-primary flex items-center gap-2 block rounded-sm py-2 text-xs lg:px-2 dark:text-white/70 dark:hover:text-white"
                                >
                                  {submenuItem.icon && (
                                    <submenuItem.icon className="w-3 h-3 mr-1" aria-hidden="true" />
                                  )}
                                  <span>{submenuItem.title}</span>
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            href={menuItem.path}
                            className={`flex items-center gap-2 py-2 text-sm lg:px-2 lg:py-3 lg:text-xs transition-colors ${usePathName === menuItem.path
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                              }`}
                          >
                            {menuItem.icon && (
                              <menuItem.icon className="w-4 h-4 mr-1" aria-hidden="true" />
                            )}
                            <span>{menuItem.title}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <SignedOut>
                  <div className="hidden md:flex items-center gap-2">
                    <Link href="/sign-in">
                      <RainbowButton className="!px-6 !py-2 !text-sm !h-9">
                        Sign In
                      </RainbowButton>
                    </Link>
                    <Link href="/sign-up">
                      <RainbowButton className="!px-6 !py-2 !text-sm !h-9">
                        Sign Up
                      </RainbowButton>
                    </Link>
                  </div>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
