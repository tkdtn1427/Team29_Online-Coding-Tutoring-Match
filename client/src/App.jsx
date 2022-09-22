import { Suspense } from 'react';
import { Global } from '@emotion/react';
import reset from './styles/reset';
import './styles/root.css';
import Navbar from './components/nav/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import Loading from './pages/LoadingPage';

function App() {
  return (
    <div>
      <Global styles={reset} />
      <Suspense fallback={<Loading />}>
        <Navbar />
        {/* <Footer /> */}
      </Suspense>
    </div>
  );
}

export default App;
