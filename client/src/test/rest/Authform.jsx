import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import Check from '../../assets/svg/Check.jsx';
import Err from '../../assets/svg/Err.jsx';
import { TextMode } from '../../components/buttons/ColorMode.jsx';

function AuthInput({ onClose }) {
  return (
    <Formik
      initialValues={{ auth: '', authCheck: '' }}
      validationSchema={Yup.object({
        auth: Yup.string()
          .min(6, <Err />)
          .required(<Err />),
        authCheck: Yup.string().oneOf([Yup.ref('auth'), null], <Err />),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // console.log(values);
          setSubmitting(false);
        }, 400);
      }}>
      {({ errors, touched }) => (
        <Container>
          <Form className="form">
            <label htmlFor="auth" className="lab">
              인증번호를 입력하세요
            </label>

            <div className="wrp">
              <Field name="auth" type="text" className="fil" />
              {errors.auth && touched.auth ? <ErrorMessage name="auth" /> : <Check />}
            </div>

            <div className="btn" onClick={onClose}>
              <TextMode mode={'GREEN'} text={'인증'} type="submit" />
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
  }
  .lab {
    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
    margin: 0 0 20px 15px;
  }
  .fil {
    width: 500px;
    height: 40px;
    margin: 0 10px 0 0;
    border-radius: 50px;
    border: 1px solid var(--liblk);

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }
  .wrp {
    display: flex;
    align-items: center;
  }
  .btn {
    align-self: center;
    margin: 20px 0 0 0;
  }
`;

export default AuthInput;
