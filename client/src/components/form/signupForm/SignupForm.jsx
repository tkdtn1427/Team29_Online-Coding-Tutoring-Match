import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';
import { SignUp, EmailAuth } from '../../../utils/apis/AuthAPI';
import { TextMode } from '../../buttons/ColorMode.jsx';
import AuthModal from '../../modal/AuthModal.jsx';

function SignupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState('');

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  const roleOptions = [
    { key: '회원 종류를 선택하세요', value: '' },
    { key: '선생님', value: 'teacher' },
    { key: '학생', value: 'student' },
  ];

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickName: '',
    role: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('올바른 이메일을 입력하세요').required('이메일을 입력하세요'),
    password: Yup.string().required('비밀번호를 입력하세요'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], '비밀번호가 일치하지 않습니다')
      .required('비밀번호를 입력하세요'),
    name: Yup.string().required('이름을 입력하세요'),
    nickName: Yup.string().required('닉네임을 입력하세요'),
    role: Yup.string().required('회원 종류를 선택하세요'),
  });

  const onSubmit = async values => {
    console.log('Form data', values);
    const signupForm = {
      email: values.email,
      password: values.confirmPassword,
      name: values.name,
      nickName: values.nickName,
    };
    await SignUp({ signupForm, role: values.role }).then(data => {
      setResponse(data);
    });
    if (response) onClickButton();
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="select" label="회원 구분" name="role" options={roleOptions} />
            <div className="auth">
              <FormController control="input" type="email" label="이메일" name="email" />
            </div>
            <FormController control="input" type="password" label="비밀번호" name="password" />
            <FormController control="input" type="password" label="비밀번호 확인" name="confirmPassword" />
            <FormController control="input" type="text" label="이름" name="name" />
            <FormController control="input" type="text" label="닉네임" name="nickName" />
            <div className="btn_2">
              <TextMode type="submit" disabled={!formik.isValid} mode={'GREEN'} text={'signup.'} />
            </div>
            {/* <div className="btn">
              <TextMode type="button" mode={'ORANGE'} text={'인증'} onClick={onClickButton} />
            </div> */}
            {isOpen && <AuthModal onClose={onClickButton} />}
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div`
  .form-control {
    display: flex;
    flex-direction: column;
    justify-content: center;

    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
    margin: 20px 0 10px 0;
  }

  .error {
    font-size: var(--s);
    color: var(--org);
    margin: 10px 0 0 10px;
  }

  .auth {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    margin: 32px 0 0 10px;
  }

  .btn_2 {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 20px 40px 0 0;
  }

  label {
    font-weight: bold;
    display: flex;
    margin: 0 0 10px 10px;
  }

  input,
  select {
    width: 500px;
    height: 40px;
    border-radius: 50px;
    border: 1px solid var(--liblk);

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }
`;

export default SignupForm;
