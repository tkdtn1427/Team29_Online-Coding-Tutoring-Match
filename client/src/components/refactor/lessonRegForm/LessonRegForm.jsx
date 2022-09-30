import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

import ChatBtn from '../chatForm/ChatBtn';

function LessonRegForm() {
  const monday = [
    { key: '월요일', value: '1' },
    { key: '화요일', value: '2' },
    { key: '수요일', value: '3' },
    { key: '목요일', value: '4' },
    { key: '금요일', value: '5' },
    { key: '토요일', value: '6' },
    { key: '일요일', value: '7' },
  ];

  const initialValues = {
    subject: '',
    content: '',
    teacherId: '',
    studentId: '',
    start_pd: '',
    end_pd: '',
    day: [],
    start_time: '',
    end_time: '',
  };

  const validationSchema = Yup.object({
    subject: Yup.string().required('강의 이름을 입력하세요'),
    content: Yup.string().required('내용을 입력하세요'),
    teacherId: Yup.string().required('아이디를 입력하세요'),
    studentId: Yup.string().required('아이디를 입력하세요'),
    start_pd: Yup.date().required('날짜를 선택하세요').nullable(),
    end_pd: Yup.date().required('날짜를 선택하세요').nullable(),
    day: Yup.array().required('요일을 선택하세요'),
    start_time: Yup.string().required('시간을 선택하세요').nullable(),
    end_time: Yup.string().required('시간을 선택하세요').nullable(),
  });

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormController control="input" type="text" label="강의 이름" name="subject" />
            <FormController control="textarea" label="강의 내용" name="content" />
            <FormController control="input" type="text" label="선생님 ID" name="teacherId" />
            <FormController control="input" type="text" label="학생 ID" name="studentId" />
            <FormController control="date" label="시작 일자" name="start_pd" />
            <FormController control="date" label="종료 일자" name="end_pd" />
            <FormController control="checkbox" name="day" options={monday} />
            <FormController control="time" label="시작 시간" name="start_time" />
            <FormController control="time" label="종료 시간" name="end_time" />
            <button type="submit" disabled={!formik.isValid}>
              등록
            </button>
          </Form>
        )}
      </Formik>
      <ChatBtn />
    </Container>
  );
}

const Container = styled.div``;

export default LessonRegForm;
