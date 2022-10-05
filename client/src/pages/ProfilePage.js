// 학생용, 선생님용 프로필 컴포넌트 바꾸기

import styled from '@emotion/styled';
import Profile from '../components/profile/Profile.jsx';
import MonthlyCalendar from '../components/calendar/MonthlyCalendar.jsx';

function ProfilePage() {
  return (
    <Container>
      <Profile />
      <MonthlyCalendar />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: var(--main);
  color: var(--blk);
`;

export default ProfilePage;
