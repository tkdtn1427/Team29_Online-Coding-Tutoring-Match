import styled from '@emotion/styled';
import TagListBox from '../tagbox/TagListBox.jsx';
import Stars from '../star/Stars.jsx';
import picturelogo from '../../assets/img/picturelogo.png';
import ColorStackList from '../techstack/ColorStackList.jsx';

//  TagListBox width height 내려주기...
// img 데이터 list에서 내려줘서 map 안에서 담기
// 선생님 정보 list에서 내려줘서 map 안에서 담기
//  star에 점수 내려주기
// 틀만 잡아놓음 불필요한 width height 제거 예정

function Card({ data, onClick }) {
  return (
    <Container>
      <ProfileImg src={data.imageUrl === 'x' ? picturelogo : data.imageUrl}></ProfileImg>
      <Introduce>
        <Name onClick={onClick}>{data.nickName}</Name>
        <Wrapper>
          <Stars width="10" height="10" scores={data.reputation} />
          <Score>{data.reputation}</Score>
        </Wrapper>
      </Introduce>
      <ColorStackList width="240px" height="25" stacks={data.skillTableList}></ColorStackList>
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
  height: 20px;
  border: 1px solid green;
  overflow: hidden;
  font-size: var(--l);
  color: var(--blk);
  font-family: var(--main);
  cursor: pointer;
`;

const Wrapper = styled.span`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 98px;
  height: 15px;
  border: 1px solid purple;
`;

const Score = styled.span`
  font-size: var(--reg);
  margin-left: 5px;
  color: var(--blk);
  font-weight: bold;
`;

export default Card;
