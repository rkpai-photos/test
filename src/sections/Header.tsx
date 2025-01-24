/* eslint-disable */
"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import bird from "@/assets/images/rkpai1.png";
import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { ImageIcon } from "lucide-react";

const navItems = [
  {
    label: "About",
    href: "/#intro",
    isExternal: false,
  },
  {
    label: "Gallery",
    href: "/stories",
    isExternal: false,
  },
  {
    label: "Albums",
    href: "/album",
    isExternal: false,
  },
  {
    label: "Recent Stories",
    href: "#projects",
    isExternal: false,
  },
  {
    label: "Contact",
    href: "tel:+910000000000",
    isExternal: true,
  },
];

const Header: FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [navScope, navAnimate] = useAnimate();

  // Handle menu animations
  useEffect(() => {
    const animateMenu = async () => {
      if (isOpen) {
        await navAnimate(
          navScope.current,
          { height: "100%", opacity: 1 },
          { duration: 0.6, ease: "easeInOut" },
        );
      } else {
        await navAnimate(
          navScope.current,
          { height: 0, opacity: 0 },
          { duration: 0.6, ease: "easeInOut" },
        );
      }
    };

    animateMenu();
  }, [isOpen, navAnimate, navScope]);

  // Handle navigation
  const handleNavigation = (href: string, isExternal: boolean) => {
    setIsOpen(false);

    if (isExternal) {
      window.location.href = href;
      return;
    }

    if (href.startsWith("/#")) {
      const elementId = href.split("#")[1];
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const Line = (props: any) => (
    <motion.line
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <motion.div
        className="fixed top-0 left-0 w-full h-0 overflow-hidden bg-stone-900"
        ref={navScope}
        initial={{ height: 0, opacity: 0 }}
      >
        <nav className="mt-28 flex flex-col">
          <AnimatePresence>
            {isOpen &&
              navItems.map(({ label, href, isExternal }, index) => (
                <motion.div
                  key={label}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="text-stone-200 border-t last:border-b border-stone-800 py-8 group/nav-item relative isolate cursor-pointer"
                  onClick={() => handleNavigation(href, isExternal)}
                >
                  <div className="container !max-w-full flex items-center justify-between">
                    <span className="text-3xl group-hover/nav-item:pl-4 transition-all duration-700">
                      {label}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 opacity-0 group-hover/nav-item:opacity-100 transition-opacity duration-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                  <div className="absolute w-full h-0 bg-stone-800 group-hover/nav-item:h-full transition-all duration-700 bottom-0 -z-10" />
                </motion.div>
              ))}
          </AnimatePresence>
        </nav>
      </motion.div>

      <div
        className={`container !max-w-full backdrop-blur-lg transition-colors duration-700 ${isOpen ? "bg-stone-900/90" : "bg-transparent"}`}
      >
        <div className="flex justify-between h-28 items-center">
          <div className="relative z-50">
            <Link href="/">
              <Image
                src={bird}
                alt="Logo"
                width={200}
                height={100}
                priority
                className={`object-contain transition-all duration-700 transform hover:scale-110 md:!w-72 md:!h-36 lg:!w-96 lg:!h-48 lg:mr-0 lg:mt-5 ${
                  isOpen ? "invert brightness-0" : ""
                }`}
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              className={`size-11 rounded-full inline-flex items-center justify-center relative z-50 transition-colors duration-700 ${
                isOpen
                  ? "bg-stone-200/10 hover:bg-stone-200/20"
                  : "bg-stone-200/50 hover:bg-stone-300/50"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <Line
                  x1="4"
                  y1="8"
                  x2="20"
                  y2="8"
                  variants={{
                    closed: { rotate: 0, translateY: 0 },
                    open: { rotate: 45, translateY: 6 },
                  }}
                  animate={isOpen ? "open" : "closed"}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  transformOrigin="center"
                />
                <Line
                  x1="4"
                  y1="16"
                  x2="20"
                  y2="16"
                  variants={{
                    closed: { rotate: 0, translateY: 0 },
                    open: { rotate: -45, translateY: -2 },
                  }}
                  animate={isOpen ? "open" : "closed"}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  transformOrigin="center"
                />
              </svg>
            </button>
            <button
              className={`hidden md:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
              transition-all duration-300 group 
              ${
                isOpen
                  ? "bg-stone-200 text-stone-900 hover:bg-stone-300"
                  : "bg-gray-900 text-white hover:bg-slate-900 backdrop-blur-sm"
              }`}
              onClick={() => handleNavigation("/stories", false)}
            >
              <ImageIcon
                className={`size-5 transition-transform duration-300 
                ${
                  isOpen
                    ? "text-stone-900 group-hover:rotate-12"
                    : "text-stone-200 group-hover:rotate-12"
                }`}
              />
              Gallery
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
