import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

function EmailAuthForm() {
  const initialValues = {
    auth: '',
  };

  const validationSchema = Yup.object({
    auth: Yup.string().required('인증번호를 입력하세요'),
  });

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="input" type="text" label="인증번호" name="auth" />
            <button type="submit" disabled={!formik.isValid}>
              인증
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div``;

export default EmailAuthForm;
