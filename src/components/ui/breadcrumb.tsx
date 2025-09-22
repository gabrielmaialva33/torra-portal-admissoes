"use client";

import { Home } from "lucide-react";

interface BreadcrumbProps {
  currentPage?: string;
}

export function Breadcrumb({ currentPage = "Admissão" }: BreadcrumbProps) {
  return (
    <div className="w-full">
      <div className="bg-white px-8 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <span className="text-gray-400">/</span>
          <span>{currentPage}</span>
        </div>
      </div>
      <div className="h-[1px] bg-primary" />
    </div>
  );
}
