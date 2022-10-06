import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import { GetUser } from '../../redux/user/UserReducer';
import { getUser } from '../../utils/Localstorage';
import { UploadReview } from '../../utils/apis/API/ReviewAPI';

import FormController from '../form/formControl/FormController';
import { TextMode } from '../buttons/ColorMode.jsx';

function ReviewForm() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector(state => state.user);
  const { role } = getUser();

  useEffect(() => {
    dispatch(GetUser());
    setIsLoading(false);
  }, []);

  const [teacherIds, setTeacherIds] = useState();
  const [studentIds, setStudentIds] = useState();
  const [tutoringIds, setTutoringIds] = useState();

  const reputationOption = [
    { key: '1점', value: '1' },
    { key: '2점', value: '2' },
    { key: '3점', value: '3' },
    { key: '4점', value: '4' },
    { key: '5점', value: '5' },
  ];

  const initialValues = {
    reputation: '',
    content: '',
    lessonid: '',
  };

  const validationSchema = Yup.object({
    reputation: Yup.string().required('평점을 선택하세요'),
    content: Yup.string().required('내용을 입력하세요'),
  });

  const onSubmit = async values => {
    setTeacherIds(params.id);
    setStudentIds(user.studentId);
    setTutoringIds(user.tutoringList[0].tutoringId);

    await UploadReview({
      postReviewForm: {
        teacherId: teacherIds,
        studentId: studentIds,
        tutoringId: values.lessonid,
        content: values.content,
        reputation: values.reputation,
      },
    });
  };

  return (
    <Container>
      {role === 'student' ? (
        // isLoading ? null : user?.tutoringList[0]?.studentId === user.code ? (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {formik => (
            <Form>
              <div className="starWrp">
                <FormController control="radio" name="reputation" options={reputationOption} />
                <FormController control="input" name="lessonid" label="강의 코드" />
                <TextMode type="submit" disabled={!formik.isValid} mode={'GREEN'} text={'등룩'} />
              </div>
              <FormController control="textarea" name="content" />
            </Form>
          )}
        </Formik>
      ) : // ) : null
      null}
    </Container>
  );
}

const Container = styled.div`
  margin: 0 0 20px 0;

  .form-control {
    font-family: var(--main);
    font-size: var(--reg);
    color: var(--blk);
  }

  .error {
    font-size: var(--r);
    color: var(--org);
    margin: 10px 0 0 20px;
  }

  .starWrp {
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input[type='radio'] {
    vertical-align: middle;
    appearance: none;
    border: max(2px, 0.1em) solid var(--blk);
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    transition: border 0.2s ease-in-out;
    margin: 0 5px 0 15px;
  }

  input[type='radio']:checked {
    border: 0.4em solid var(--org);
  }

  textarea {
    resize: none;
    width: 600px;
    height: 150px;
    padding: 10px 20px;
    border: 1px solid var(--liblk);

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }

  input {
    margin-left: 10px;
    width: 50px;
    border: 1px solid var(--liblk);
    border-radius: 50px;

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }
`;

export default ReviewForm;
