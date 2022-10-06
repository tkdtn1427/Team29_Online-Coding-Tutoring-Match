import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import FormController from '../form/formControl/FormController';

import { UpdateReview, DeleteReview } from '../../utils/apis/API/ReviewAPI';

function ReviewChangeForm({ contentId, onClose, onChangeStatus }) {
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
  };

  const validationSchema = Yup.object({
    reputation: Yup.string().required('평점을 선택하세요'),
    content: Yup.string().required('내용을 입력하세요'),
  });

  const onSubmit = async values => {
    await UpdateReview({
      editReviewForm: {
        content: values.content,
        reputation: values.reputation,
      },
      Id: contentId,
    })
      .then(onChangeStatus)
      .then(() => onClose());
  };
  const handleDelete = async values => {
    await DeleteReview({ Id: contentId })
      .then(onChangeStatus)
      .then(() => onClose());
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <div className="starWrp">
              <FormController control="radio" name="reputation" options={reputationOption} />
              <div className="btnWrp">
                <button className="grn" type="submit" disabled={!formik.isValid}>
                  등록
                </button>
                <button className="org" type="button" onClick={handleDelete}>
                  삭제
                </button>
              </div>
            </div>
            <FormController control="textarea" name="content" />
          </Form>
        )}
      </Formik>
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
  .btnWrp {
    display: flex;
    gap: 40px;
  }

  .grn {
    cursor: pointer;
    padding: 5px 10px;
    color: white;
    border: none;
    border-radius: 50px;
    background-color: var(--grn);
  }

  .org {
    cursor: pointer;
    padding: 5px 10px;
    color: white;
    border: none;
    border-radius: 50px;
    background-color: var(--org);
  }
`;

export default ReviewChangeForm;
