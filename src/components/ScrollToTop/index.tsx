import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-8 md:bottom-12 z-99">
      {isVisible && (
        <div className="group relative">
          <div
            onClick={scrollToTop}
            aria-label="scroll to top"
            className="bg-primary/80 hover:shadow-signUp flex h-10 w-10 md:h-12 md:w-12 cursor-pointer items-center justify-center rounded-md text-white shadow-md transition duration-300 ease-in-out hover:bg-primary dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <span className="mt-[6px] h-3 w-3 md:h-4 md:w-4 rotate-45 border-t border-l border-white dark:border-gray-50"></span>
          </div>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700">
            Scroll to Top
          </span>
        </div>
      )}
    </div>
  );
}
