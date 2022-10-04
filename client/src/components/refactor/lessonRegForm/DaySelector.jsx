import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../formControl/FormController';

function DaySelector() {
  const initialValues = {
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
    day: Yup.array().required('요일을 선택하세요'),
  });

  const mon = [{ key: '월요일', value: '1' }];
  const tue = [{ key: '화요일', value: '2' }];
  const wed = [{ key: '수요일', value: '3' }];
  const thu = [{ key: '목요일', value: '4' }];
  const fri = [{ key: '금요일', value: '5' }];
  const sat = [{ key: '토요일', value: '6' }];
  const sun = [{ key: '일요일', value: '7' }];

  const onSubmit = values => {
    console.log('Form data', values);
    const days = [];
    const daylist = values.day.sort();
    const times = values.time;

    for (let i = 0; i < daylist.length; i++) {
      const key = daylist[i];
      days[key] = times[key];
    }

    console.log('강의 요일', days);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <div className="days">
              <FormController control="checkbox" name="day" options={mon} />
              <FormController control="time" label="시작" name="time[1].start_time_mon" />
              <FormController control="time" label="종료" name="time[1].end_time_mon" />
            </div>
            <div className="days">
              <FormController control="checkbox" name="day" options={tue} />
              <FormController control="time" label="시작" name="time[2].start_time_tue" />
              <FormController control="time" label="종료" name="time[2].end_time_tue" />
            </div>
            <div className="days">
              <FormController control="checkbox" name="day" options={wed} />
              <FormController control="time" label="시작" name="time[3].start_time_wed" />
              <FormController control="time" label="종료" name="time[3].end_time_wed" />
            </div>
            <div className="days">
              <FormController control="checkbox" name="day" options={thu} />
              <FormController control="time" label="시작" name="time[4].start_time_thu" />
              <FormController control="time" label="종료" name="time[4].end_time_thu" />
            </div>
            <div className="days">
              <FormController control="checkbox" name="day" options={fri} />
              <FormController control="time" label="시작" name="time[5].start_time_fri" />
              <FormController control="time" label="종료" name="time[5].end_time_fri" />
            </div>
            <div className="days">
              <FormController control="checkbox" name="day" options={sat} />
              <FormController control="time" label="시작" name="time[6].start_time_sat" />
              <FormController control="time" label="종료" name="time[6].end_time_sat" />
            </div>
            <div className="days">
              <FormController control="checkbox" name="day" options={sun} />
              <FormController control="time" label="시작" name="time[7].start_time_sun" />
              <FormController control="time" label="종료" name="time[7].end_time_sun" />
            </div>
            <button type="submit" disabled={!formik.isValid}>
              등록
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
const Container = styled.div`
  padding: 60px;
  .days {
    display: flex;
    align-items: center;

    gap: 10px;
  }
`;

export default DaySelector;
