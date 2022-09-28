// 학생용, 선생님용 프로필 컴포넌트 바꾸기

import styled from '@emotion/styled';
import Profile from '../components/profile/Profile.jsx';
import MonthlyCalendar from '../components/calendar/MonthlyCalendar.jsx';
import Schedule from '../components/modal/Schedule.jsx';

function ProfilePage() {
  return (
    <Container>
      <Profile />
      <MonthlyCalendar />
      {/* <Schedule /> */}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

export default ProfilePage;
