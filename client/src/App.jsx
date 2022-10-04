import { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';
import reset from './styles/reset';
import './styles/root.css';
import Loading from './pages/LoadingPage';
import RequireAuth from './utils/RequireAuth';

import Test from './components/form/lessonRegForm/LessonRegForm.jsx';
import ChatPopup from './components/chat/ChatPopup.jsx';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const Layout = lazy(() => import('./components/layout/Layout.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Global styles={reset} />
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/mypage/:id"
              element={
                <RequireAuth option={true} setModal={setOpenModal}>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route path="/main" element={<MainPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/info/:id" element={<DetailPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/chat" element={<ChatPopup />} />
          </Routes>
        </Layout>
      </Suspense>
    </div>
  );
}

export default App;
