
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface MessagePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MessagePagination: React.FC<MessagePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include current page and adjacent pages
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after page 1 if needed
      if (startPage > 2) {
        pages.push('ellipsis1');
      }
      
      // Add pages around current
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis2');
      }
      
      // Always add last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();

  const handlePageChange = (e: React.MouseEvent, pageNumber: number) => {
    e.preventDefault(); // Prevent default behavior that causes page scroll
    onPageChange(pageNumber);
  };
  
  return (
    <Pagination className="justify-center my-6">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={(e) => handlePageChange(e, currentPage - 1)}
              className="cursor-pointer transition-all duration-300"
              aria-label="Go to previous page" 
            />
          </PaginationItem>
        )}
        
        {pageNumbers.map((page, index) => (
          <PaginationItem key={`page-${page}-${index}`}>
            {page === 'ellipsis1' || page === 'ellipsis2' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={(e) => typeof page === 'number' && handlePageChange(e, page)}
                className={typeof page === 'number' ? 'cursor-pointer transition-all duration-300' : ''}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={(e) => handlePageChange(e, currentPage + 1)}
              className="cursor-pointer transition-all duration-300"
              aria-label="Go to next page" 
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default MessagePagination;
