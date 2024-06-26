"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { CaretLeft } from "@phosphor-icons/react";
import Image from "next/image";
import jsPDF from "jspdf";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState({
    profile: false,
    akademik: false,
    navOpen: false,
    ftik: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectSection = document.getElementById("project");
      if (projectSection) {
        if (window.scrollY > projectSection.offsetTop) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNavMenu = () => {
    setMenuOpen({ ...menuOpen, navOpen: !menuOpen.navOpen });
  };

  const generatePDF = (title: string) => {
    const doc = new jsPDF();
    doc.text(title, 10, 10);
    doc.text("This is an auto-generated PDF with random text.", 10, 20);
    doc.save(`${title}.pdf`);
  };

  return (
    <header
      className={` ${
        isScrolled ? " bg-indigo-950" : " bg-white bg-opacity-30 backdrop:blur"
      } fixed top-0 left-0 right-0 shadow-md py-4 md:py-0 px-4 flex items-center justify-between z-50 transition-colors duration-300`}
    >
      <Link href="/">
        <Image
          src={
            "https://global.ac.id/wp-content/uploads/2022/11/logo-header-global-institute-3.png"
          }
          alt="logo"
          className="md:w-56"
          width={300}
          height={300}
        />
      </Link>

      {/* menu untuk hp */}
      <div className="md:hidden absolute right-4 z-50">
        <Hamburger
          toggled={menuOpen.navOpen}
          toggle={toggleNavMenu}
          color={`${isScrolled ? "white" : "black"}`}
        />
      </div>

      {/* Menu navigasi untuk dekstop */}
      <nav className="hidden md:flex navbar">
        <ul className="list-none flex space-x-6">
          <li>
            <Link href="/">
              <span
                className={` ${
                  isScrolled ? "text-white" : "text-black"
                } text-lg py-5 px-4 block hover:bg-gray-500 hover:text-white transition-all duration-300 cursor-pointer`}
              >
                Home
              </span>
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setMenuOpen({ ...menuOpen, profile: true })}
            onMouseLeave={() => setMenuOpen({ ...menuOpen, profile: false })}
          >
            <Link href="">
              <span
                className={` flex gap-2 text-lg py-5 px-4 hover:bg-gray-500  transition-all duration-300 cursor-pointer ${
                  menuOpen.profile ? "text-blue-500" : ""
                } ${isScrolled ? "text-white" : "text-black"}`}
              >
                Prodi
                <CaretLeft
                  size={32}
                  color={`${isScrolled ? "#ededed" : "#000000"}`}
                  className={`${
                    menuOpen.profile ? "-rotate-90" : "rotate-00"
                  } transition-all duration-300`}
                />
              </span>
            </Link>
            {menuOpen.profile && (
              <ul className="absolute left-0 w-48 bg-indigo-950">
                <li
                  className="w-full border-y border-gray-200 hover:bg-gray-500 hover:text-white transition-all duration-300"
                  onMouseEnter={() => setMenuOpen({ ...menuOpen, ftik: true })}
                  onMouseLeave={() => setMenuOpen({ ...menuOpen, ftik: false })}
                >
                  <Link href="/Prodi_TI">
                    <span className="block py-2 px-4 cursor-pointer text-white">
                      Teknik Informatika
                    </span>
                  </Link>
                </li>
                <li className="w-full border-t border-gray-200 hover:bg-gray-500 hover:text-white transition-all duration-300">
                  <Link href="/Prodi_SI">
                    <span className="block py-2 px-4 cursor-pointer text-white">
                      Sistem Informasi
                    </span>
                  </Link>
                </li>
                <li className="w-full border-t border-gray-200 hover:bg-gray-500 hover:text-white transition-all duration-300">
                  <Link href="/Prodi_Film">
                    <span className="block py-2 px-4 cursor-pointer text-white">
                      Film, Television & Media Studies
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/struktur">
              <span
                className={` ${
                  isScrolled ? "text-white" : "text-black"
                } text-lg py-5 px-4 block hover:bg-gray-500 hover:text-white transition-all duration-300 cursor-pointer`}
              >
                Struktur Organisasi
              </span>
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setMenuOpen({ ...menuOpen, akademik: true })}
            onMouseLeave={() => setMenuOpen({ ...menuOpen, akademik: false })}
          >
            <Link href="">
              <span
                className={`flex gap-2 text-lg py-5 px-4 hover:bg-gray-500 hover:text-white transition-all duration-300 cursor-pointer ${
                  isScrolled ? "text-white" : "text-black"
                }`}
              >
                Akademik
                <CaretLeft
                  size={32}
                  color={`${isScrolled ? "#ededed" : "#000000"}`}
                  className={`${
                    menuOpen.akademik ? "-rotate-90" : "rotate-00"
                  } transition-all duration-300`}
                />
              </span>
            </Link>
            {menuOpen.akademik && (
              <ul className="absolute left-0 w-48 bg-indigo-950">
                <li
                  className="w-full border-t text-white border-gray-200 hover:bg-gray-500 hover:text-white transition-all duration-300"
                  onClick={() => generatePDF("Kurikulum")}
                >
                  <span className="block py-2 px-4 cursor-pointer">
                    Kurikulum
                  </span>
                </li>
                <li
                  className="w-full border-t text-white border-gray-200 hover:bg-gray-500 hover:text-white transition-all duration-300"
                  onClick={() => generatePDF("Panduan Akademik")}
                >
                  <span className="block py-2 px-4 cursor-pointer">
                    Panduan Akademik
                  </span>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/prestasi">
              <span
                className={`text-lg py-5 px-4 block hover:bg-gray-500 hover:text-white transition-all duration-300 cursor-pointer ${
                  isScrolled ? "text-white" : "text-black"
                }`}
              >
                Prestasi
              </span>
            </Link>
          </li>
          <li>
            <Link href="/gallery">
              <span
                className={`text-lg py-5 px-4 block hover:bg-gray-500 hover:text-white transition-all duration-300 cursor-pointer ${
                  isScrolled ? "text-white" : "text-black"
                }`}
              >
                Gallery
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Menu dropdown untuk hp */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-indigo-950 z-10 transition-transform duration-500 ${
          menuOpen.navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="list-none flex flex-col mt-20 space-y-4">
          <li
            className="relative"
            onClick={() =>
              setMenuOpen({ ...menuOpen, profile: !menuOpen.profile })
            }
          >
            <span
              className={`text-lg py-2 px-4 justify-between text-white flex hover:bg-gray-500 hover:text-white transition-all duration-500 cursor-pointer `}
            >
              Prodi
              <CaretLeft
                size={32}
                color="#ededed"
                className={`${
                  menuOpen.profile ? "rotate-0" : "-rotate-90"
                } transition-all duration-300`}
              />
            </span>
            <ul
              className={`ml-4 text-white transition-all duration-500 ${
                menuOpen.profile ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <li className="w-full border-t border-gray-200">
                <Link href="/Prodi_TI">
                  <span className="block py-2 px-4 cursor-pointer">
                    Information Engineering
                  </span>
                </Link>
              </li>
              <li className="w-full border-t border-gray-200">
                <Link href="/Prodi_SI">
                  <span className="block py-2 px-4 cursor-pointer">
                    Information System
                  </span>
                </Link>
              </li>
              <li className="w-full border-y border-gray-200">
                <Link href="Prodi_Film">
                  <span className="block py-2 px-4 cursor-pointer">
                    Film, Television & Media Studies
                  </span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/struktur">
              <span className="text-lg py-2 px-4 text-white block hover:bg-gray-500 hover:text-white transition-all duration-500 cursor-pointer">
                Struktur Organisasi
              </span>
            </Link>
          </li>
          <li
            className="relative"
            onClick={() =>
              setMenuOpen({ ...menuOpen, akademik: !menuOpen.akademik })
            }
          >
            <span className="flex justify-between text-lg py-2 px-4 text-white hover:bg-gray-500 hover:text-white transition-all duration-500 cursor-pointer">
              Akademik
              <CaretLeft
                size={32}
                color="#ededed"
                className={`${
                  menuOpen.akademik ? "-rotate-90" : "rotate-00"
                } transition-all duration-300`}
              />
            </span>
            <ul
              className={`ml-4 transition-all duration-500 text-white  ${
                menuOpen.akademik ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <li
                className="w-full border-t border-gray-200"
                onClick={() => generatePDF("Kurikulum")}
              >
                <span className="block py-2 px-4 cursor-pointer">
                  Kurikulum
                </span>
              </li>
              <li
                className="w-full border-t border-gray-200"
                onClick={() => generatePDF("Panduan Akademik")}
              >
                <span className="block py-2 px-4 cursor-pointer">
                  Panduan Akademik
                </span>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/prestasi">
              <span className="text-lg py-2 px-4 text-white block hover:bg-gray-500 hover:text-white transition-all duration-500 cursor-pointer">
                Prestasi
              </span>
            </Link>
          </li>
          <li>
            <Link href="/gallery">
              <span className="text-lg py-2 px-4 text-white block hover:bg-gray-500 hover:text-white transition-all duration-500 cursor-pointer">
                Gallery
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
