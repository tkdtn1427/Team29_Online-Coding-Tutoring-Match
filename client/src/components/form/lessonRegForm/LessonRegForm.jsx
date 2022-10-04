import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

import DaySelector from './DaySelector.jsx';
import { TextMode } from '../../buttons/ColorMode.jsx';

function LessonRegForm() {
  const initialValues = {
    subject: '',
    content: '',
    teacherId: '',
    studentId: '',
    start_pd: '',
    end_pd: '',
  };

  const validationSchema = Yup.object({
    subject: Yup.string().required('강의 이름을 입력하세요'),
    content: Yup.string().required('내용을 입력하세요'),
    teacherId: Yup.string().required('아이디를 입력하세요'),
    studentId: Yup.string().required('아이디를 입력하세요'),
    start_pd: Yup.date().required('날짜를 선택하세요').nullable(),
    end_pd: Yup.date().required('날짜를 선택하세요').nullable(),
  });

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <div className="form-wrp">
              <div className="input-wrp">
                <FormController control="input" type="text" label="강의 이름" name="subject" />
                <FormController control="textarea" label="강의 내용" name="content" />
                <FormController control="input" type="text" label="선생님 ID" name="teacherId" />
                <FormController control="input" type="text" label="학생 ID" name="studentId" />
                <FormController control="date" label="시작 일자" name="start_pd" />
                <FormController control="date" label="종료 일자" name="end_pd" />
              </div>
              <DaySelector />
            </div>
            <TextMode type="submit" disabled={!formik.isValid} mode={'GREEN'} text={'등록 '} />
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div`
  .form-wrp {
    display: flex;
    gap: 50px;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    justify-content: center;

    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
    margin: 10px 0 0 0;
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
    margin: 5px 0 5px 10px;
  }

  input[type='text'],
  input[type='date'],
  textarea {
    width: 300px;
    height: 30px;
    border-radius: 50px;
    border: 1px solid var(--liblk);
    resize: none;

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }

  input[type='checkbox'] {
    vertical-align: middle;
    appearance: none;
    border: max(2px, 0.1em) solid var(--blk);
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    transition: border 0.2s ease-in-out;
  }

  input[type='checkbox']:checked {
    border: 0.4em solid var(--grn);
  }
`;

export default LessonRegForm;
