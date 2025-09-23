"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="w-full bg-neutral-01 border-b border-neutral-02">
      <div className="flex items-center justify-between px-8 h-[80px]">
        {/* Logo Torra */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Torra"
            width={84}
            height={38}
            className="h-[38px] w-auto"
            priority
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
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
      </div>
    </header>
  );
}
