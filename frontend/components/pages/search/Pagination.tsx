"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
  className,
}: PaginationProps) => {
  const DOTS = "...";

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const entries = Array.from(searchParams.entries());

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPages];
    }

    return [];
  }, [totalPages, siblingCount, currentPage]);

  const onNext = () => {
    if (currentPage < totalPages) {
      const params = new URLSearchParams(entries);
      params.set("page", (currentPage + 1).toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      const params = new URLSearchParams(entries);
      params.set("page", (currentPage - 1).toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(entries);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={`flex items-center justify-center space-x-2 mt-5 ${className}`}
    >
      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span
              key={`dots-${index}`}
              className="inline-flex h-10 w-10 items-center justify-center text-sm text-gray-600"
            >
              &#8230;
            </span>
          );
        }

        const isActive = pageNumber === currentPage;
        return (
          <button
            key={pageNumber}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isActive
                ? "border-primary bg-primary text-white hover:bg-primary/90"
                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => onPageChange(Number(pageNumber))}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};
