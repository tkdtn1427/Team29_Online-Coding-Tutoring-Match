import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Navbar from '../nav/Navbar.jsx';
import Footer from '../footer/Footer.jsx';

function Layout({ children }) {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes('/chat') ? null : <Navbar />}
      <Container>{children}</Container>
      {location.pathname.includes('/chat') ? null : <Footer />}
    </>
  );
}

const Container = styled.div`
  margin-top: 60px;
  width: 100%;
`;

export default Layout;
