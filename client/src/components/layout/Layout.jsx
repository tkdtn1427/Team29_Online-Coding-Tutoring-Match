import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Navbar from '../nav/Navbar.jsx';
import Footer from '../footer/Footer.jsx';

function Layout({ children }) {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes('/chat') ? null : <Navbar />}
      <Container margin={location.pathname.includes('/chat') ? '0px' : '60px'}>{children}</Container>
      {location.pathname.includes('/chat') ? null : <Footer />}
    </>
  );
}

const Container = styled.div`
  margin-top: ${props => props.margin};
  width: 100%;
`;

export default Layout;
