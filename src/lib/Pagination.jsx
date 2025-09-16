
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const pageNumbers = [];
    const delta = 2; // Number of pages to show around the current page

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) return null; // Don't render pagination if there's only one page

    return (
        <div className="flex justify-center items-center gap-1 mt-5">
            <button
                className="px-4 py-2 text-white bg-[#2AD4FF] rounded-md hover:bg-[#0093b8] disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {currentPage > delta + 1 && (
                <button
                    className="px-4 py-2 text-white bg-[#2AD4FF] rounded-md hover:bg-[#0093b8]"
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            )}
            {currentPage > delta + 2 && <span className="mx-2 text-gray-500">...</span>}

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 text-white rounded-md hover:bg-[#0093b8] ${page === currentPage ? 'bg-[#007B9F]' : 'bg-[#2AD4FF]'
                        }`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}

            {currentPage < totalPages - delta - 1 && <span className="mx-2 text-gray-500">...</span>}
            {currentPage < totalPages - delta && (
                <button
                    className="px-4 py-2 text-white bg-[#2AD4FF] rounded-md hover:bg-[#0093b8]"
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            )}

            <button
                className="px-4 py-2 text-white bg-[#2AD4FF] rounded-md hover:bg-[#0093b8] disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
