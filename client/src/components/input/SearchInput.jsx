import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import Search from '../../assets/svg/Search.jsx';

function SearchInput({ width, height, placeholder, props }) {
  return (
    <Formik
      initialValues={{ search: '' }}
      validationSchema={Yup.object({
        search: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // console.log(values);
          setSubmitting(false);
        }, 400);
      }}>
      {() => (
        <Container>
          <Form className="form">
            <Search props={props} />
            <Field name="search" type="text" className="fil" width={width} height={height} placeholder={placeholder} />
          </Form>
        </Container>
      )}
    </Formik>
  );
}

const Container = styled.fieldset`
  margin: 100px;
  .form {
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    height: fit-content;
    border-radius: 50px;
    border: 2px solid var(--grn);
    padding: 0 10px;

    box-shadow: 0px 0px 5px 0px var(--grn);
  }
  .fil {
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 0 10px;

    border: none;
    background-color: transparent;

    :focus {
      outline: none;
    }
  }
  .btn {
    border: none;
    background-color: #fff;
  }
`;

export default SearchInput;
