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
        className={`header top-0 left-0 z-40 flex w-full items-center transition-all duration-300 ${sticky
          ? "dark:bg-slate-900/95 dark:shadow-2xl dark:shadow-black/30 shadow-lg shadow-gray-200/50 fixed z-9999 bg-white/95 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5"
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
                  className={`navbar border-gray-200 dark:border-white/10 dark:bg-slate-800/95 absolute right-0 z-30 w-[250px] rounded-xl border backdrop-blur-md bg-white/95 px-6 py-4 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all duration-300 
                    lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${navbarOpen
                      ? "visibility top-full opacity-100 translate-y-0"
                      : "invisible top-[120%] opacity-0 -translate-y-2"
                    }`}
                >
                  <ul className="block lg:flex lg:items-center lg:space-x-2">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.submenu ? (
                          <>
                            <Link
                              href={menuItem.path || "#"}
                              onClick={menuItem.path ? undefined : () => handleSubmenu(index)}
                              className={`flex cursor-pointer items-center justify-between py-3 px-3 text-sm font-medium rounded-lg transition-all duration-200 lg:px-3 lg:py-2 lg:text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 ${usePathName === menuItem.path
                                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
                                : "text-gray-700 dark:text-slate-300"
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                {menuItem.icon && (
                                  <menuItem.icon className="w-4 h-4" aria-hidden="true" />
                                )}
                                <span>{menuItem.title}</span>
                              </div>
                              <span className="pl-2 transition-transform duration-200 group-hover:rotate-180" onClick={(e) => {
                                e.preventDefault();
                                handleSubmenu(index);
                              }}>
                                <svg width="16" height="16" viewBox="0 0 25 24">
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
                              className={`submenu dark:bg-slate-800/95 relative top-full left-0 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all duration-300 group-hover:opacity-100 
                              lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[220px] lg:p-3 lg:opacity-0 lg:group-hover:visible lg:group-hover:top-full lg:group-hover:translate-y-0 lg:-translate-y-2 ${openIndex === index ? "block" : "hidden"
                                }`}
                            >
                              {menuItem.submenu.map((submenuItem, subIndex) => (
                                <Link
                                  href={submenuItem.path}
                                  key={subIndex}
                                  className="text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium transition-all duration-200"
                                >
                                  {submenuItem.icon && (
                                    <submenuItem.icon className="w-4 h-4" aria-hidden="true" />
                                  )}
                                  <span>{submenuItem.title}</span>
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            href={menuItem.path}
                            className={`flex items-center gap-2 py-3 px-3 text-sm font-medium rounded-lg transition-all duration-200 lg:px-3 lg:py-2 lg:text-sm hover:bg-blue-50 dark:hover:bg-blue-500/10 ${usePathName === menuItem.path
                              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
                              : "text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                              }`}
                          >
                            {menuItem.icon && (
                              <menuItem.icon className="w-4 h-4" aria-hidden="true" />
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
                      {/* Changed !text-xm to !text-xs */}
                      <RainbowButton className="!px-4 !py-1.5 !text-xs !h-8">
                        Sign In
                      </RainbowButton>
                    </Link>
                    <Link href="/sign-up">
                      {/* Changed !text-xm to !text-xs */}
                      <RainbowButton className="!px-4 !py-1.5 !text-xs !h-8">
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
