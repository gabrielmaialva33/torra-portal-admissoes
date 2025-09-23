"use client";

import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  currentPage?: string;
}

export function Breadcrumb({ currentPage = "Admissão" }: BreadcrumbProps) {
  return (
    <div className="w-full relative bg-neutral-01">
      {/* Breadcrumb Content */}
      <div className="px-8 py-[10px]">
        <div className="flex items-center gap-[6px]">
          <Home className="w-[14px] h-[14px] text-neutral-05" strokeWidth={2} />
          <ChevronRight
            className="w-[14px] h-[14px] text-neutral-04"
            strokeWidth={2}
          />
          <span className="text-sm text-neutral-05 font-semibold">
            {currentPage}
          </span>
        </div>
      </div>

      {/* Orange Line Below */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-torra-orange" />
    </div>
  );
}
