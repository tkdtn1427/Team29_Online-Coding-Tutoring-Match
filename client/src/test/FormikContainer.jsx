import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormikControl from './FormikControl';

function FormikContainer() {
  // 셀렉트 옵션
  const dropdownOptions = [
    { key: '회원 종류를 선택하세요', value: '' },
    { key: '선생님', value: '1' },
    { key: '학생', value: '2' },
  ];

  // 라디오 옵션
  const radioOptions = [
    { key: '1점', value: '1' },
    { key: '2점', value: '2' },
    { key: '3점', value: '3' },
    { key: '4점', value: '4' },
    { key: '5점', value: '5' },
  ];

  // 체크박스 옵션
  const checkboxOptions = [
    { key: '월요일', value: '1' },
    { key: '화요일', value: '2' },
    { key: '수요일', value: '3' },
    { key: '목요일', value: '4' },
    { key: '금요일', value: '5' },
    { key: '토요일', value: '6' },
    { key: '일요일', value: '7' },
  ];

  // 초기값
  const initialValues = {
    email: '',
    desription: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
    startDate: null,
    endDate: null,
    time: null,
    test: null,
  };

  // 유효성 검사
  const validationSchema = Yup.object({
    email: Yup.string().required('이메일을 입력하세요'),
    desription: Yup.string().required('내용을 입력하세요'),
    selectOption: Yup.string().required('회원종류를 선택하세요'),
    radioOption: Yup.string().required('평점을 선택하세요'),
    checkboxOption: Yup.array().required('요일을 선택하세요'),
    startDate: Yup.date().required('날짜를 선택하세요').nullable(),
    endDate: Yup.date().required('날짜를 선택하세요').nullable(),
    time: Yup.string().required('시간을 선택하세요'),
    test: Yup.date().required('날짜를 선택하세요').nullable(),
  });

  // 제출 양식
  const onSubmit = values => {
    console.log('Form data', values);
    // console.log('Saved date', JSON.parse(JSON.stringify(values)));
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <FormikControl control="input" type="email" label="이메일" name="email" />
            <FormikControl control="textarea" label="자기 소개" name="desription" />
            <FormikControl control="select" label="회원 구분" name="selectOption" options={dropdownOptions} />
            <FormikControl control="radio" label="평점" name="radioOption" options={radioOptions} />
            <FormikControl control="checkbox" label="요일" name="checkboxOption" options={checkboxOptions} />
            <FormikControl control="date" label="시작 일자" name="startDate" />
            <FormikControl control="date" label="종료 일자" name="endDate" />
            <FormikControl control="time" label="시간" name="time" />
            <FormikControl control="test" label="테스트" name="test" />
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div`
  font-family: var(--main);
  font-size: var(--reg);
  color: var(--blk);

  display: flex;
  justify-content: center;

  .form-control {
    margin: 0 0 30px 0;
  }

  .error {
    font-size: var(--s);
    color: var(--org);
    margin: 10px 0 0 10px;
  }

  label {
    font-weight: bold;
    display: flex;
    margin: 0 0 10px 0;
  }

  input + label {
    display: inline-flex;
    margin: 0 10px 0 5px;
  }

  input[type='email'],
  input[type='date'],
  input[type='time'],
  textarea,
  select {
    display: block;
    width: 300px;
    padding: 6px 12px;
    line-height: 1.42857143;
    resize: none;

    border: 1px solid var(--liblk);
    border-radius: 5px;

    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
  }
`;

export default FormikContainer;
