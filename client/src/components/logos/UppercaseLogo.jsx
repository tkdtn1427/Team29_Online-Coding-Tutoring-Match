// 크기 조절 가능하도록 props 받기
import styled from '@emotion/styled';

function UppercaseLogo() {
  return (
    <Logo>
      <span>&lt;</span> <span>IGUWANA</span> <span className="slash">/</span>
      <span>&gt;</span>
    </Logo>
  );
}

const Logo = styled.div`
  color: var(--blk);
  font-family: var(--main);
  font-size: var(--xxxl);
  font-weight: bold;
  color: var(--font);
  margin-bottom: 30px;
  .slash {
    color: var(--org);
  }
`;

export default UppercaseLogo;
