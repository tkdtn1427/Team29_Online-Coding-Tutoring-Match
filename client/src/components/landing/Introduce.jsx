import styled from '@emotion/styled';
import LandingImg1 from '../../assets/img/LandingImg1.png';
import LandingImg2 from '../../assets/img/LandingImg2.png';
import LandingImg3 from '../../assets/img/LandingImg3.png';

function Introduce({ i }) {
  const number = ['01', '02', '03'];
  const blk = ['독학의 어려움은 이제', '실시간 채팅', '확실한'];
  const org = ['NO!', 'ON!', '수강후기!'];
  const content = [
    <p>
      나에게 맞는 강사님과
      <br />
      느린 진도, 풀리지 않는 고민 해결!
    </p>,
    <p>
      빠른 실시간 채팅으로 수업정보 문의가능
      <br />
      나에게 맞는 수업 선별 가능
    </p>,
    '다양한 수강후기를 통해 믿을 수 있는 강사님 선별',
  ];
  const img = [LandingImg1, LandingImg2, LandingImg3];
  return (
    <Container>
      {i === 1 ? <img src={img[i]} alt="notebook"></img> : ''}
      <IntroBox>
        <Number>{number[i]}</Number>
        <Subject>
          <span className="blk">{blk[i]}</span>
          <span className="org">{org[i]}</span>
        </Subject>
        <Content>{content[i]}</Content>
      </IntroBox>
      {i !== 1 ? <img src={img[i]} alt="notebook"></img> : ''}
    </Container>
  );
}
const Number = styled.div`
  color: #c0c0c0;
  font-family: var(--point);
  font-size: var(--xxxl);
  font-weight: bold;
  margin-bottom: 40px;
`;
const Container = styled.div`
  display: flex;
  gap: 150px;
  margin-bottom: 100px;

  > img {
    width: 400px;
    height: 400px;
  }
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subject = styled.div`
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 20px;
  .org {
    margin-left: 10px;
    color: var(--org);
  }
`;
const Content = styled.div`
  font-size: var(--l);
  color: var(--blk);
  line-height: 25px;
`;

export default Introduce;
