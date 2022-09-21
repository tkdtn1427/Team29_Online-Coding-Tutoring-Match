import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import Check from '../../assets/svg/Check.jsx';
import Err from '../../assets/svg/Err.jsx';

function Input({ text, name, type }) {
  return (
    <Formik
      initialValues={{ nickNameemail: '', password: '', passwordCheck: '', name: '', nickName: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email(<Err />)
          .required(<Err />),
        password: Yup.string()
          .min(6, <Err />)
          .required(<Err />),
        passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], <Err />),
        name: Yup.string()
          .min(2)
          .max(4)
          .required(<Err />),
        nickName: Yup.string()
          .min(2)
          .max(8)
          .required(<Err />),
      })}>
      {({ errors, touched }) => (
        <Container>
          <Form className="form">
            <label htmlFor={name} className="lab">
              {text}
            </label>
            <div className="wrp">
              <Field name={name} type={type} className="fil" />
              {errors[name] && touched[name] ? <ErrorMessage name={name} /> : <Check />}
            </div>

            {/* //! 작성 예시
          //? 이메일 : <Input text={'이메일'} name={'email'} type={'email'} />
          //? 비밀번호 : <Input text={'비밀번호'} name={'password'} type={'password'} />
          //? 비밀번호 확인 : <Input text={'비밀번호확인'} name={'passwordCheck'} type={'password'} />
          //? 이름 : <Input text={'이름'} name={'name'} type={'text'} />
          //? 닉네임 : <Input text={'닉네임'} name={'nickName'} type={'text'} />
          */}
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
    margin: 10px;
  }
  .lab {
    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
    margin: 10px;
  }
  .fil {
    width: 500px;
    height: 40px;
    margin: 0 20px 0 0;
    border-radius: 50px;
    border: 1px solid var(--liblk);
  }
  .wrp {
    display: flex;
    align-items: center;
  }
`;

export default Input;
