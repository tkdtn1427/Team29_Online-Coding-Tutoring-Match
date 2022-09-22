// 크기 조절 가능하도록 props 받기
import styled from '@emotion/styled';

function LowercaseLogo() {
  return (
    <Logo>
      <span>&lt;</span> <span>iguwana</span> <span className="slash">/</span>
      <span>&gt;</span>
    </Logo>
  );
}

const Logo = styled.div`
  font-family: var(--point);
  font-size: var(--xl);
  font-weight: bold;
  color: var(--font);
  .slash {
    color: var(--org);
  }
`;

export default LowercaseLogo;
