import styled from '@emotion/styled';
import Radio from '../checkbox/CheckBox.jsx';
import Input from '../input/Input.jsx';
import { TextMode } from '../buttons/ColorMode.jsx';

function Signup() {
  return (
    <SignupWrapper>
      <h1> signup. </h1>
      <fieldset>
        <Radio name="status" text="선생님" ftsize="15px" />
        <Radio name="status" text="학생" ftsize="15px" />
      </fieldset>
      <div className="auth">
        <Input text={'이메일'} name={'email'} type={'email'} />
        <TextMode mode={'ORANGE'} text={'인증'} />
      </div>
      <Input text={'비밀번호'} name={'password'} type={'password'} />
      <Input text={'비밀번호확인'} name={'passwordCheck'} type={'password'} />
      <Input text={'이름'} name={'name'} type={'text'} />
      <Input text={'닉네임'} name={'nickName'} type={'text'} />
      <TextMode mode={'GREEN'} text={'가입하기'} />
    </SignupWrapper>
  );
}

const SignupWrapper = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .auth {
    border: 1px solid red;
    display: flex;
    align-items: center;
  }
`;

export default Signup;
