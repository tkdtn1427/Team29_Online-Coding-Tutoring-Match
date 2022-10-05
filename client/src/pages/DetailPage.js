import styled from '@emotion/styled';
import InfoProfile from '../components/profile/InfoProfile.jsx';
import InfoBox from '../components/infobox/InfoBox.jsx';
import Lessonform from '../components/form/Lessonform.jsx';

function DetailPage() {
  return (
    <Container>
      <InfoProfile />
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
