import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import { TextMode } from '../buttons/ColorMode.jsx';

function LoginInput({ onClose }) {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email(),
        password: Yup.string().min(6).required(),
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
            <label htmlFor="email" className="lab">
              이메일
            </label>

            <div className="wrp">
              <Field name="email" type="email" className="fil" />
              <ErrorMessage name="email" />
            </div>

            <label htmlFor="password" className="lab">
              비밀번호
            </label>

            <div className="wrp">
              <Field name="password" type="password" className="fil" />
              <ErrorMessage name="password" />
            </div>

            <div className="btn" onClick={onClose}>
              <TextMode mode={'ORANGE'} text={'login.'} type="submit" />
              <TextMode mode={'GREEN'} text={'signup.'} type="submit" />
            </div>
          </Form>
        </Container>
      )}
    </Formik>
  );
}

const Container = styled.fieldset`
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .lab {
    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
    align-self: flex-start;
    margin: 30px 0 10px 30px;
  }
  .fil {
    width: 500px;
    height: 40px;
    margin: 0 10px 0 0;
    border-radius: 50px;
    border: 1px solid var(--liblk);
  }
  .wrp {
    display: flex;
    align-items: center;
  }
  .btn {
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-self: center;
    margin: 40px 0 0 0;
  }
`;

export default LoginInput;
