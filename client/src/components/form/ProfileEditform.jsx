import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import SearchInput from '../input/SearchInput.jsx';
import { TextMode } from '../buttons/ColorMode.jsx';

function ProfileEditInput({ onClose }) {
  return (
    <Formik
      initialValues={{ nickName: '', about: '', career: '' }}
      validationSchema={Yup.object({
        nickName: Yup.string(),
        about: Yup.string(),
        career: Yup.string(),
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
            <div className="wrp1">
              <Field name="nickName" type="text" className="fil1" placeholder="까마귀코더" />
              <ErrorMessage name="nickName" />
              <label htmlFor="nickName" className="code">
                #0001
              </label>
            </div>

            <label htmlFor="about" className="lab">
              about me.
            </label>
            <div className="wrp">
              <Field name="about" type="text" className="fil" placeholder="내가 코드 마스터" />
              <ErrorMessage name="about" />
            </div>

            <div className="wrp2">
              <SearchInput width={'500px'} height={'50px'} placeholder={'기술스택을 검색하세요'} props={'30px'} />
              <TextMode mode={'GREEN'} text={'추가'} type="button" />
            </div>

            <label htmlFor="career" className="lab">
              career.
            </label>
            <div className="wrp">
              <Field name="career" type="text" className="fil" placeholder="구글, 애플 등" />
              <ErrorMessage name="career" />
            </div>

            <div className="btn" onClick={onClose}>
              <TextMode mode={'ORANGE'} text={'완료'} type="submit" />
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
  .code {
    font-family: var(--point);
    font-size: var(--l);
    color: var(--grn);
  }
  .lab {
    font-family: var(--point);
    font-size: var(--l);
    color: var(--grn);
    align-self: flex-start;
    margin: 10px 0 10px 40px;
  }
  .fil {
    width: 300px;
    height: 40px;
    border-radius: 50px;
    border: 1px solid var(--liblk);
    padding: 0 10px;

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }
  .fil1 {
    width: 200px;
    height: 40px;
    border-radius: 50px;
    border: 1px solid var(--liblk);
    padding: 0 10px;
    margin: 0 20px 0 0;

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }
  .wrp {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrp1 {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 330px;
    margin: 20px 0 20px 0;
  }
  .wrp2 {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 380px;
    margin: 30px 0 20px 0;
  }
  .btn {
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-self: center;
    margin: 20px 0 0 0;
  }
`;

export default ProfileEditInput;
