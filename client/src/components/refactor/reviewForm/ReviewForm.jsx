import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

function ReviewForm() {
  const reputationOption = [
    { key: '1점', value: '1' },
    { key: '2점', value: '2' },
    { key: '3점', value: '3' },
    { key: '4점', value: '4' },
    { key: '5점', value: '5' },
  ];

  const initialValues = {
    reputation: '',
    content: '',
  };

  const validationSchema = Yup.object({
    reputation: Yup.string().required('평점을 선택하세요'),
    content: Yup.string().required('내용을 입력하세요'),
  });

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="radio" name="reputation" options={reputationOption} />
            <FormController control="textarea" name="content" />
            <button type="submit" disabled={!formik.isValid}>
              등록
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div``;

export default ReviewForm;
