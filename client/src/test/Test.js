import React, { useState } from 'react';
import '../components/pagenation/Pagenation.css';
import Pagenation from '../components/pagenation/Pagenation';

function Test() {
  const [page, setPage] = useState(1);
  const handlePageChange = page => {
    setPage(page);
  };

  return <Pagenation page={page} count={100} setPage={handlePageChange} />;
}

export default Test;
