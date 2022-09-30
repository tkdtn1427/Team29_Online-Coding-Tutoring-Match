import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

function LoginForm() {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('올바른 이메일을 입력하세요').required('이메일을 입력하세요'),
    password: Yup.string().required('비밀번호를 입력하세요'),
  });

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="input" type="email" label="이메일" name="email" />
            <FormController control="input" type="password" label="비밀번호" name="password" />
            <button type="submit" disabled={!formik.isValid}>
              login.
            </button>
            <button type="button">signup.</button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div``;

export default LoginForm;
