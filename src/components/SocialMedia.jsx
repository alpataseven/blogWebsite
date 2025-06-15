import { useState } from "react";
import { GitHub, Instagram, Linkedin, Twitter, ChevronsLeft, ChevronsRight } from "react-feather";

export default function SecondNavbar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed top-1/2 left-0 -translate-y-1/2 z-50 flex items-center group">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-base-200 rounded-r-md px-1 py-2 hover:bg-base-300 transition-all"
      >
        {isOpen ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
      </button>

      {/* Menu */}
      <ul
        className={`menu bg-base-200 rounded-l-box ml-1 pr-1 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"
        }`}
      >
        <li>
          <a
            className="tooltip tooltip-right hover:text-blue-500 hover:scale-110 transition-transform duration-200"
            data-tip="GitHub"
            href="https://github.com/alpataseven"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </a>
        </li>
        <li>
          <a
            className="tooltip tooltip-right hover:text-blue-600 hover:scale-110 transition-transform duration-200"
            data-tip="LinkedIn"
            href="https://www.linkedin.com/in/alperen-ataseven-a8072722a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
        </li>
        <li>
          <a
            className="tooltip tooltip-right hover:text-pink-500 hover:scale-110 transition-transform duration-200"
            data-tip="Instagram"
            href="https://www.instagram.com/_alphotograpy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
        </li>
        <li>
          <a
            className="tooltip tooltip-right hover:text-sky-400 hover:scale-110 transition-transform duration-200"
            data-tip="Twitter"
            href="https://x.com/mrbbenalppp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
        </li>
      </ul>
    </div>
  );
}