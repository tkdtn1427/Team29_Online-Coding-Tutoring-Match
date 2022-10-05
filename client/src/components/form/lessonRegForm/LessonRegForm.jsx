import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

import { TextMode } from '../../buttons/ColorMode.jsx';
import { UploadLesson } from '../../../utils/apis/API/LessonAPI';

function LessonRegForm() {
  const mon = [{ key: '월', value: '1' }];
  const tue = [{ key: '화', value: '2' }];
  const wed = [{ key: '수', value: '3' }];
  const thu = [{ key: '목', value: '4' }];
  const fri = [{ key: '금', value: '5' }];
  const sat = [{ key: '토', value: '6' }];
  const sun = [{ key: '일', value: '7' }];

  const initialValues = {
    subject: '',
    content: '',
    teacherId: '',
    studentId: '',
    start_pd: '',
    end_pd: '',
    day: [],
    time: [
      { dummy: '' },
      { start_time_mon: '', end_time_mon: '' },
      { start_time_tue: '', end_time_tue: '' },
      { start_time_wed: '', end_time_wed: '' },
      { start_time_thu: '', end_time_thu: '' },
      { start_time_fri: '', end_time_fri: '' },
      { start_time_sat: '', end_time_sat: '' },
      { start_time_sun: '', end_time_sun: '' },
    ],
  };

  const validationSchema = Yup.object({
    subject: Yup.string().required('강의 이름을 입력하세요'),
    content: Yup.string().required('내용을 입력하세요'),
    teacherId: Yup.string().required('아이디를 입력하세요'),
    studentId: Yup.string().required('아이디를 입력하세요'),
    start_pd: Yup.date().required('날짜를 선택하세요').nullable(),
    end_pd: Yup.date().required('날짜를 선택하세요').nullable(),
    day: Yup.array().required('요일을 선택하세요'),
    time: Yup.array().required('시간을 선택하세요'),
  });

  const onSubmit = async values => {
    console.log('Form data', values);

    // 키, 밸류값 요구사항 대로 변환
    const days = [];
    const daylist = values.day.sort();
    const times = values.time;
    const result = {};

    for (let i = 0; i < daylist.length; i++) {
      const key = daylist[i];
      days[key] = times[key];

      const value = Object.values(days[key]);
      days[key] = value;

      const final = `${days[key][0]} - ${days[key][days[key].length - 1]}`;
      days[key] = final;

      result[key] = days[key];
      values.time = [result];
    }

    console.log('timetable', values.time);

    // 강의 등록
    await UploadLesson({
      postLessonForm: {
        teacherId: values.teacherId,
        studentId: values.studentId,
        subject: values.subject,
        start_pd: values.start_pd,
        end_pd: values.end_pd,
        content: values.content,
        time: values.time,
      },
    });
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
              <div className="daytimewrp">
                <div className="days">
                  <div className="chkbox">
                    <FormController control="checkbox" name="day" options={mon} />
                  </div>
                  <div className="times">
                    <FormController control="time" label="시작" name="time[1].start_time_mon" />
                    <FormController control="time" label="종료" name="time[1].end_time_mon" />
                  </div>
                </div>

                <div className="days">
                  <FormController control="checkbox" name="day" options={tue} />
                  <div className="times">
                    <FormController control="time" label="시작" name="time[2].start_time_tue" />
                    <FormController control="time" label="종료" name="time[2].end_time_tue" />
                  </div>
                </div>

                <div className="days">
                  <FormController control="checkbox" name="day" options={wed} />
                  <div className="times">
                    <FormController control="time" label="시작" name="time[3].start_time_wed" />
                    <FormController control="time" label="종료" name="time[3].end_time_wed" />
                  </div>
                </div>

                <div className="days">
                  <FormController control="checkbox" name="day" options={thu} />
                  <div className="times">
                    <FormController control="time" label="시작" name="time[4].start_time_thu" />
                    <FormController control="time" label="종료" name="time[4].end_time_thu" />
                  </div>
                </div>

                <div className="days">
                  <FormController control="checkbox" name="day" options={fri} />
                  <div className="times">
                    <FormController control="time" label="시작" name="time[5].start_time_fri" />
                    <FormController control="time" label="종료" name="time[5].end_time_fri" />
                  </div>
                </div>

                <div className="days">
                  <FormController control="checkbox" name="day" options={sat} />
                  <div className="times">
                    <FormController control="time" label="시작" name="time[6].start_time_sat" />
                    <FormController control="time" label="종료" name="time[6].end_time_sat" />
                  </div>
                </div>

                <div className="days">
                  <FormController control="checkbox" name="day" options={sun} />
                  <div className="times">
                    <FormController control="time" label="시작" name="time[7].start_time_sun" />
                    <FormController control="time" label="종료" name="time[7].end_time_sun" />
                  </div>
                </div>
              </div>
            </div>
            <div className="btn">
              <TextMode type="submit" disabled={!formik.isValid} mode={'GREEN'} text={'등록 '} />
            </div>
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

  .input-wrp {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-weight: bold;
      display: flex;
      margin: 5px 0 5px 10px;
    }
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

    margin-top: 20px;
  }

  .daytimewrp {
    label {
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 5px 0 5px 6px;
    }
  }

  .days {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .times {
    display: flex;
    gap: 10px;
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
