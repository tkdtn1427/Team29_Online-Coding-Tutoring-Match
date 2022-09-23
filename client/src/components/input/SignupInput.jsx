import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import Check from '../../assets/svg/Check.jsx';
import Err from '../../assets/svg/Err.jsx';
import { TextMode } from '../buttons/ColorMode.jsx';
import AuthModal from '../modal/AuthModal.jsx';

function SignupInput() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', passwordCheck: '', name: '', nickName: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email(),
        password: Yup.string()
          .min(6, <Err />)
          .required(<Err />),
        passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], <Err />),
        name: Yup.string()
          .min(2, null)
          .required(<Err />),
        nickName: Yup.string()
          .min(2, null)
          .max(8, null)
          .required(<Err />),
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
            <label htmlFor="email" className="lab">
              이메일
            </label>
            <div className="wrp">
              <Field name="email" type="email" className="fil" />
              <div type="button" className="btnauth" onClick={onClickButton}>
                <TextMode mode={'ORANGE'} text={'인증'} />
              </div>
              {isOpen && <AuthModal onClose={onClickButton} />}
            </div>

            <label htmlFor="password" className="lab">
              비밀번호
            </label>
            <div className="wrp">
              <Field name="password" type="password" className="fil" />
              {errors.password && touched.password ? <ErrorMessage name="password" /> : <Check />}
            </div>

            <label htmlFor="passwordCheck" className="lab">
              비밀번호 확인
            </label>
            <div className="wrp">
              <Field name="passwordCheck" type="password" className="fil" />
              {errors.passwordCheck && touched.passwordCheck ? <ErrorMessage name="passwordCheck" /> : <Check />}
            </div>

            <label htmlFor="name" className="lab">
              이름
            </label>
            <div className="wrp">
              <Field name="name" type="text" className="fil" />
              {errors.name && touched.name ? <ErrorMessage name="name" /> : <Check />}
            </div>

            <label htmlFor="nickName" className="lab">
              닉네임
            </label>
            <div className="wrp">
              <Field name="nickName" type="text" className="fil" />
              {errors.nickName && touched.nickName ? <ErrorMessage name="nickName" /> : <Check />}
            </div>

            <div className="btn">
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
  }
  .lab {
    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
    margin: 20px 0 10px 20px;
  }
  .fil {
    width: 500px;
    height: 40px;
    margin: 0 20px 0 0;
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
  .btnauth {
    width: fit-content;
    height: fit-content;
    border: hidden;
    background-color: #fff;
  }
  .btn {
    align-self: center;
    margin: 20px 0 0 0;
  }
`;

export default SignupInput;
