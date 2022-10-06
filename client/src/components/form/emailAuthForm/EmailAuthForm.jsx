import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import FormController from '../formControl/FormController';
import { EmailAuth } from '../../../utils/apis/AuthAPI';
import { TextMode } from '../../buttons/ColorMode.jsx';

function EmailAuthForm() {
  const navigate = useNavigate();
  const initialValues = {
    auth: '',
  };

  const validationSchema = Yup.object({
    auth: Yup.string().required('인증번호를 입력하세요'),
  });

  const onSubmit = async values => {
    console.log('Form data', values);
    await EmailAuth({ code: values.auth }).then(() => {
      navigate('/');
    });
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="input" type="text" label="인증번호" name="auth" />
            <div className="btn">
              <TextMode mode={'GREEN'} text={'인증'} type="submit" disabled={!formik.isValid} />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div`
  .form-control {
    display: flex;
    flex-direction: column;
    justify-content: center;

    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
    margin: 20px 0 10px 0;
  }

  .error {
    font-size: var(--s);
    color: var(--org);
    margin: 10px 0 0 10px;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    font-weight: bold;
    display: flex;
    margin: 0 0 10px 10px;
  }

  input {
    width: 400px;
    height: 40px;
    border-radius: 50px;
    border: 1px solid var(--liblk);

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }
`;

export default EmailAuthForm;
