import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';
import reset from './styles/reset';
import './styles/root.css';
import Loading from './pages/LoadingPage';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const Layout = lazy(() => import('./components/layout/Layout.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));

function App() {
  return (
    <div>
      <Global styles={reset} />
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mypage" element={<ProfilePage />} />
            <Route path="/main/:filter" element={<MainPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/info" element={<DetailPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </div>
  );
}

export default App;
