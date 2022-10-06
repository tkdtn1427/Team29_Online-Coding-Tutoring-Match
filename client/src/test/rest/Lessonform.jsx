import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import { TextMode } from '../../components/buttons/ColorMode.jsx';

function LessonInput({ onClose }) {
  return (
    <Formik
      initialValues={{ lesson: '', mentorId: '', menteeId: '', startdate: '', enddate: '', day: '', time: '' }}
      validationSchema={Yup.object({
        lesson: Yup.string(),
        mentorId: Yup.number(),
        menteeId: Yup.number(),
        startdate: Yup.date(),
        enddate: Yup.date(),
        day: Yup.string().matches(/(월요일|화요일|수요일|목요일|금요일|토요일|일요일)/),
        time: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 400);
      }}>
      {() => (
        <Container>
          <Form className="form">
            <label htmlFor="lesson" className="lab">
              강의 이름
            </label>
            <div className="wrp">
              <Field name="lesson" type="text" className="fil" />
              <ErrorMessage name="lesson" />
            </div>

            <label htmlFor="mentorId" className="lab">
              선생님 ID
            </label>
            <div className="wrp">
              <Field name="mentorId" type="text" className="fil" />
              <ErrorMessage name="mentorId" />
            </div>

            <label htmlFor="menteeId" className="lab">
              학생 ID
            </label>
            <div className="wrp">
              <Field name="menteeId" type="text" className="fil" />
              <ErrorMessage name="menteeId" />
            </div>

            <label htmlFor="startdate" className="lab">
              강의 시작 일자
            </label>
            <div className="wrp">
              <Field name="startdate" type="date" className="fil" />
              <ErrorMessage name="startdate" />
            </div>

            <label htmlFor="enddate" className="lab">
              강의 종료 일자
            </label>
            <div className="wrp">
              <Field name="enddate" type="date" className="fil" />
              <ErrorMessage name="enddate" />
            </div>

            <label htmlFor="day" className="lab">
              강의 진행 요일
            </label>
            <div className="wrp">
              <Field name="day" type="text" className="fil" />
              <ErrorMessage name="day" />
            </div>

            <label htmlFor="time" className="lab">
              강의 진행 시간
            </label>
            <div className="wrp">
              <Field name="time" type="time" className="fil" />
              <ErrorMessage name="time" />
            </div>

            <div className="btn" onClick={onClose}>
              <TextMode mode={'ORANGE'} text={'강의 등록'} type="submit" />
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
    margin: 20px 0 5px 20px;
  }
  .fil {
    width: 300px;
    height: 30px;
    border-radius: 50px;
    border: 1px solid var(--liblk);
    padding: 0 30px;

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
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-self: center;
    margin: 20px 0 0 0;
  }
`;

export default LessonInput;
