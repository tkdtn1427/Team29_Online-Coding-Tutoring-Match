import styled from '@emotion/styled';
import InfoProfile from '../components/profile/InfoProfile.jsx';
import InfoBox from '../components/infobox/InfoBox.jsx';

function DetailPage() {
  return (
    <Container>
      <InfoProfile />
      <InfoBox />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default DetailPage;
