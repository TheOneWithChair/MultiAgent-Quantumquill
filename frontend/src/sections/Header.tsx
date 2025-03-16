"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CenteredCircle from "@/components/CenteredCircle";
import Button from "@/components/Button";
import { twMerge } from "tailwind-merge";
import Logo from "@/components/Logo";

export const navItems = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "How it Works",
    href: "#how-it-works",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  }
];

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Add scroll event listener to apply background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={twMerge(
        "fixed top-0 left-0 w-full border-b border-[var(--color-border)] z-40 transition-all duration-300",
        isScrolled ? "bg-gray-900/90 backdrop-blur-md" : "bg-transparent"
      )}>
        <div className="container">
          <div className="h-18 lg:h-20 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              
              <button
                onClick={() => router.push('/')}
                className="text-2xl font-extrabold cursor-pointer hover:text-[#fffafa] transition-colors"
              >
                QuantumQuill
              </button>
            </div>
            <div className="h-full hidden lg:block">
              <nav className="h-full">
                {navItems.map(({ name, href }) => (
                  <Link
                    key={name}
                    href={href}
                    className="h-full px-6 sm:px-8 md:px-12 relative font-bold text-xs tracking-widest text-gray-400 uppercase hover:text-[#fffafa] transition duration-500 inline-flex items-center before:content-[''] before:absolute before:bottom-0 before:h-2 before:w-px before:bg-gray-200/20 before:left-0 after:absolute after:bottom-0 after:h-2 after:w-px after:bg-gray-200/20 after:right-0"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(href);
                      if (element)
                        element.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="hidden lg:flex">
              <Button 
                variant="primary"
                onClick={() => router.push('/chat')}
              >
                Get Started
              </Button>
            </div>
            <div className="flex items-center lg:hidden">
              <button
                className="size-10 rounded-lg relative mobile-menu-border-gradient"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={twMerge(
                      "w-4 h-0.5 bg-gray-100 -translate-y-1 transition",
                      isMobileNavOpen && "translate-y-0 rotate-45"
                    )}
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={twMerge(
                      "w-4 h-0.5 bg-gray-100 translate-y-1 transition",
                      isMobileNavOpen && "translate-y-0 -rotate-45"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      {isMobileNavOpen && (
        <div className="fixed top-18 left-0 bottom-0 right-0 bg-gray-950 z-30 overflow-hidden">
          <div className="absolute-center isolate -z-10">
            <CenteredCircle />
          </div>
          <div className="absolute-center isolate -z-10">
            <CenteredCircle className="size-[350px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <CenteredCircle className="size-[500px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <CenteredCircle className="size-[650px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <CenteredCircle className="size-[800px]" />
          </div>
          <div className="container h-full">
            <nav className="flex flex-col items-center gap-y-4 py-8 h-full justify-center">
              {navItems.map(({ name, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="text-gray-400 hover:text-white transition duration-500 uppercase tracking-widest font-bold text-xs h-10"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(href);
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                    setIsMobileNavOpen(false);
                  }}
                >
                  {name}
                </Link>
              ))}
              <Button 
                block 
                variant="primary" 
                className="w-full max-w-xs mt-4"
                onClick={() => router.push('/chat')}
              >
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
