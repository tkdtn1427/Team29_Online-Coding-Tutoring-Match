import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import Search from '../../assets/svg/Search.jsx';
import { TeachersReducer } from '../../redux/teacherlist/TeachersReducer';

function SearchInput({ width, height, placeholder, ftsize, bdcolor, onClick }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const changeSearchTerm = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(TeachersReducer.actions.searchByNickName(searchTerm));
  }, [searchTerm]);

  return (
    <Container width={width} height={height} ftsize={ftsize} bdcolor={bdcolor}>
      <Search width={20} height={20} />
      <input
        name="search"
        type="text"
        className="fill"
        placeholder={placeholder}
        onChange={changeSearchTerm}
        onClick={onClick}
        value={searchTerm}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  border: 1px solid ${props => props.bdcolor || 'var(--grn)'};
  padding: 0px 10px;
  box-shadow: 0px 0px 5px var(--grn);
  .fill {
    border: none;
    background-color: transparent;
    margin: 0px 0px 0px 8px;
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: ${props => props.ftsize};
    color: var(--blk);
    :focus {
      outline: none;
    }
  }
`;

export default SearchInput;
