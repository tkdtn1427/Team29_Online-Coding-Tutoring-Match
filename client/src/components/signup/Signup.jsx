import styled from '@emotion/styled';
import Radio from '../checkbox/CheckBox.jsx';
import SignupInput from '../form/Signupform.jsx';

function Signup() {
  return (
    <SignupWrapper>
      <div className="head">
        <h1> signup. </h1>
        <fieldset>
          <Radio name="status" text="선생님" ftsize="15px" />
          <Radio name="status" text="학생" ftsize="15px" />
        </fieldset>
      </div>
      <SignupInput />
    </SignupWrapper>
  );
}

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .head {
    width: 560px;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > h1 {
      font-family: var(--point);
      font-size: var(--xl);
      font-weight: bold;
    }

    > fieldset {
      width: 130px;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default Signup;
