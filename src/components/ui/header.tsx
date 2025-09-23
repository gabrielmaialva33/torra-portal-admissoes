"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-neutral-01 border-b border-neutral-02">
      <div className="flex items-center justify-between px-4 md:px-8 h-[60px] md:h-[80px]">
        {/* Logo Torra - Always visible */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Torra"
            width={84}
            height={38}
            className="h-[30px] md:h-[38px] w-auto"
            priority
          />
        </div>

        {/* Desktop User Info */}
        <div className="hidden md:flex items-center gap-4">
          {/* Info Button */}
          <button
            type="button"
            className="relative w-8 h-8 rounded-full bg-[#37375B] flex items-center justify-center hover:opacity-90 transition-opacity"
            aria-label="Informações"
          >
            <span className="text-neutral-01 text-sm font-medium">i</span>
          </button>

          {/* User Section */}
          <div className="flex items-center gap-3">
            <span className="text-[#5F5F5F] text-[15px] font-normal">
              Olá, Lorem Ipsum
            </span>
            <button
              type="button"
              className="text-[#FF5101] text-[15px] font-semibold hover:underline"
            >
              Sair
            </button>
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-b from-orange-100 to-orange-200">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=LoremIpsum&backgroundColor=ffdfbf&skinColor=f8b788&hairColor=4a312c&clothesColor=ff5101&accessoriesType=blank&facialHairType=blank&topType=longHairCurly&eyeType=happy"
                alt="User Avatar"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-torra-dark-blue" />
          ) : (
            <Menu className="w-6 h-6 text-torra-dark-blue" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-02 bg-neutral-01 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-b from-orange-100 to-orange-200">
                <Image
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=LoremIpsum&backgroundColor=ffdfbf&skinColor=f8b788&hairColor=4a312c&clothesColor=ff5101&accessoriesType=blank&facialHairType=blank&topType=longHairCurly&eyeType=happy"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <span className="text-[#5F5F5F] text-sm">Olá, Lorem Ipsum</span>
            </div>
            <button
              type="button"
              className="text-[#FF5101] text-sm font-semibold"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </header>
  );
}