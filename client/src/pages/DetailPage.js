import styled from '@emotion/styled';
import Profile from '../components/profile/Profile.jsx';
import InfoBox from '../components/infobox/InfoBox.jsx';

function DetailPage() {
  return (
    <Container>
      <Profile />
      <InfoBox />
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
