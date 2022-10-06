import Pagination from 'react-js-pagination';

function Pagenation({ page, count, setPage }) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={8}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  );
}

export default Pagenation;
