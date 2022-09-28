import styled from '@emotion/styled';
import Search from '../../assets/svg/Search.jsx';

function SearchInput({ width, height, placeholder, ftsize, bdcolor }) {
  return (
    <Container width={width} height={height} ftsize={ftsize} bdcolor={bdcolor}>
      <Search width={20} height={20} />
      <input name="search" type="text" className="fill" placeholder={placeholder} />
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
