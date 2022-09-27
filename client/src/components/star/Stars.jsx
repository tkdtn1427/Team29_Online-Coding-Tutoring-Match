// 3점이라면 주황별 3개 회색별 2개가 나오도록 함수를 짜기
import styled from '@emotion/styled';
import Star from '../../assets/svg/Star.jsx';

function Stars({ scores, width, height }) {
  const score = Math.floor(4.3); // 4.3 대신 scores
  const orgarr = new Array(score).fill(1);
  const gryarr = new Array(5 - score).fill(1);

  return (
    <Container>
      {orgarr.map((_, i) => (
        <Star key={i} width={width} height={height} color="var(--org)" /> // width, height props로 바꿔야함
      ))}
      {gryarr.map((_, i) => (
        <Star key={i} width={width} height={height} color="var(--liblk)" /> // width, height props로 바꿔야함
      ))}
    </Container>
  );
}

const Container = styled.div``;
export default Stars;
