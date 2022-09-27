import styled from '@emotion/styled';
import Navbar from '../nav/Navbar.jsx';
import Footer from '../footer/Footer.jsx';

function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <Container>{children}</Container>
      <Footer></Footer>
    </>
  );
}

const Container = styled.div`
  margin-top: 60px;
  width: 100%;
`;

export default Layout;
