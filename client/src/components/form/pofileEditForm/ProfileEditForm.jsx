import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

function ProfileEditForm() {
  const initialValues = {
    nickName: '기존 닉네임',
    aboutMe: '기존 소개',
    career: '기존 경력',
  };

  const validationSchema = Yup.object({
    nickName: Yup.string().required('닉네임을 입력하세요'),
    aboutMe: Yup.string(),
    career: Yup.string(),
  });

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="input" type="text" name="nickName" />
            <FormController control="textarea" label="about me." name="aboutMe" />
            <FormController control="textarea" label="career." name="career" />
            <button type="submit" disabled={!formik.isValid}>
              완료
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div``;

export default ProfileEditForm;
