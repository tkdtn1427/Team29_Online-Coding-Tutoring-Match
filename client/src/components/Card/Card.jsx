import styled from '@emotion/styled';
import TagListBox from '../tagbox/TagListBox.jsx';
import Star from '../star/Star.jsx';

//  TagListBox width height 내려주기...
// img 데이터 list에서 내려줘서 map 안에서 담기
// 선생님 정보 list에서 내려줘서 map 안에서 담기
//  star에 점수 내려주기
// 틀만 잡아놓음 불필요한 width height 제거 예정

function Card() {
  return (
    <Container>
      <ProfileImg></ProfileImg>
      <Introduce>
        <Name></Name>
        <Wrapper>
          <Star />
          <Score></Score>
        </Wrapper>
      </Introduce>
      <TagListBox width="232" height="25"></TagListBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 250px;
  height: 330px;
  border: 1px solid black;
  border-radius: 20px;
`;

const ProfileImg = styled.img`
  width: 232px;
  height: 231px;
  border: 1px solid red;
  border-radius: 20px;
`;

const Introduce = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 232px;
  height: 25px;
  border: 1px solid blue;
`;

const Name = styled.span`
  height: 15px;
  border: 1px solid green;
`;

const Wrapper = styled.span`
  width: 98px;
  height: 15px;
  border: 1px solid purple;
`;

const Score = styled.span``;

export default Card;
