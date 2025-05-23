"use client";
import React from "react";
import {
  faYoutube,
  faXTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    name: "Get Started",
    href: "/chat",
  },
];

export const socialLinks = [
  {
    name: "Youtube",
    icon: faYoutube,
    href: "#",
  },
  {
    name: "X",
    icon: faXTwitter,
    href: "#",
  },
  {
    name: "Discord",
    icon: faDiscord,
    href: "#",
  },
];
const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8">
          <h2 className="font-extrabold text-2xl">QuantumQuill</h2>
          <nav className="flex flex-col md:flex-row md:gap-16 gap-8 items-center">
            {navItems.map(({ name, href }) => (
              <Link
                href={href}
                key={name}
                className="uppercase text-xs tracking-widest font-bold text-gray-400 hover:text-[#fffafa] transition duration-500"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(href);
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col items-center gap-8 md:justify-between md:flex-row-reverse">
          <div className="flex justify-center gap-6">
            {socialLinks.map(({ name, icon, href }) => (
              <Link href={href} key={name}>
                <div className="size-10 rounded-full bg-gray-900 inline-flex justify-center items-center">
                  <FontAwesomeIcon icon={icon} className="size-4" />
                </div>
              </Link>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            &copy; 2025 QuantumQuill Research Assistant, all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
