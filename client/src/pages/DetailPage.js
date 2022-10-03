import styled from '@emotion/styled';
import Profile from '../components/profile/Profile.jsx';
import InfoBox from '../components/infobox/InfoBox.jsx';
import Lessonform from '../components/form/Lessonform.jsx';

function DetailPage() {
  return (
    <Container>
      <Profile />
      <InfoBox />
      <Lessonform></Lessonform>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default DetailPage;
