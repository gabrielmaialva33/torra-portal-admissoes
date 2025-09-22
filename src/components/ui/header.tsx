"use client";

import { User } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-white border-b">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo Torra */}
        <div className="flex items-center">
          <div className="bg-primary text-white font-bold text-xl px-3 py-1 rounded">
            TORRA
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9.5" stroke="#5F5F5F" />
              <text
                x="10"
                y="14"
                textAnchor="middle"
                fill="#5F5F5F"
                fontSize="12"
              >
                i
              </text>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Olá, Lorem Ipsum</span>
            <span className="text-sm text-gray-600">Sair</span>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
