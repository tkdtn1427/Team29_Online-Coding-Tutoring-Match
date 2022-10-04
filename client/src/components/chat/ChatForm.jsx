import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../form/formControl/FormController';

function ChatForm() {
  const initialValues = {
    content: '',
  };

  const validationSchema = Yup.object({
    content: Yup.string(),
  });

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="textarea" name="content" />
            <button type="submit" disabled={!formik.isValid}>
              보내기
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div``;

export default ChatForm;
