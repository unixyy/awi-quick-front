interface PaginationProps {
  dataPerPage: number;
  totalData: number;
  currentPage: number;
  handleClick: (pageNumber: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalData / props.dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="text-center">
      <ul className="pagination flex justify-center space-x-4">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${props.currentPage === pageNumber ? 'active' : ''}`}
          >
            <button onClick={() => props.handleClick(pageNumber)} className="page-link">
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};