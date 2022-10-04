import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

function SearchInput() {
  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Container>
      <Formik onSubmit={onSubmit}>
        <Form>
          <FormController control="input" type="text" name="search" />
        </Form>
      </Formik>
    </Container>
  );
}

const Container = styled.div``;

export default SearchInput;
