import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import FormController from '../formControl/FormController';
import { Login } from '../../../utils/apis/AuthAPI';
import LoginReducer from '../../../redux/login/LoginReducer';

import { TextMode } from '../../buttons/ColorMode.jsx';

function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const roleOptions = [
    { key: '회원 종류를 선택하세요', value: '' },
    { key: '선생님', value: 'teacher' },
    { key: '학생', value: 'student' },
  ];

  const initialValues = {
    email: '',
    password: '',
    role: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('올바른 이메일을 입력하세요').required('이메일을 입력하세요'),
    password: Yup.string().required('비밀번호를 입력하세요'),
    role: Yup.string().required('회원 종류를 선택하세요'),
  });

  const onSubmit = async values => {
    console.log('Form data', values);
    const result = await Login({
      loginForm: { email: values.email, password: values.password },
      role: values.role,
    });
    if (result) {
      dispatch(LoginReducer.actions.logIn());
      onClose();
    }
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="select" label="회원 구분" name="role" options={roleOptions} />
            <FormController control="input" type="email" label="이메일" name="email" />
            <FormController control="input" type="password" label="비밀번호" name="password" />
            <div className="btn">
              <TextMode mode={'ORANGE'} text={'login.'} type="submit" disabled={!formik.isValid} />
              <TextMode mode={'GREEN'} text={'signup.'} type="button" />
            </div>
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

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 30px;
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

export default LoginForm;
