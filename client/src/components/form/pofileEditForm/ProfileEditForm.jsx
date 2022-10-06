import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import FormController from '../formControl/FormController';
import { PatchUserInfo } from '../../../utils/apis/API/UserAPI';
import { TextMode } from '../../buttons/ColorMode.jsx';
import FilterStackInput from '../../input/FilterStackInput.jsx';
import TagListBox from '../../tagbox/TagListBox.jsx';
import Dropbox from '../../dropbox/Dropbox.jsx';
import { getUser } from '../../../utils/Localstorage';
import { GetUser } from '../../../redux/user/UserReducer';

function ProfileEditForm({ onClose }) {
  const [filteredTags, setFilteredTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const EditTags = filteredTags.map(name => ({ name }));
  const { role } = getUser();
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const initialValues = {
    nickName: user.nickName,
    aboutMe: user.aboutMe,
    career: user.career,
  };

  const validationSchema = Yup.object({
    nickName: Yup.string().required('닉네임을 입력하세요'),
    aboutMe: Yup.string(),
    career: Yup.string(),
  });

  const onSubmit = values => {
    const editForm = {
      aboutMe: values.aboutMe,
      nickName: values.nickName,
      skillTableList: EditTags,
    };

    PatchUserInfo({ editForm }).then(() => {
      dispatch(GetUser());
      onClose();
    });
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form>
            <div className="nickname">
              <FormController control="input" type="text" name="nickName" />
              <div className="codenum">{user.code}</div>
            </div>
            <FormController control="textarea" label="about me." name="aboutMe" />
            <div className="tagwrp">
              <FilterStackInput
                height="30px"
                ftsize="var(--s)"
                placeholder="기술스택 검색"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
              {isOpen ? (
                <Dropbox width="150px" height="100px" filteredTags={filteredTags} setFilteredTags={setFilteredTags} />
              ) : (
                ''
              )}
              <TagListBox
                filteredTags={filteredTags}
                setFilteredTags={setFilteredTags}
                height="20px"
                width="400px"></TagListBox>
            </div>
            {role === 'student' ? null : <FormController control="textarea" label="career." name="career" />}
            <div className="btn">
              <TextMode mode={'ORANGE'} text={'완료'} type="submit" disabled={!formik.isValid} />
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

  .nickname {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    gap: 10px;
    input[type='text'] {
      width: 300px;
      height: 30px;
      border-radius: 50px;
      border: 1px solid var(--liblk);
      resize: none;

      padding: 10px 20px;

      :focus {
        outline: 2px solid var(--grn);
        transition: outline 150ms ease-in-out;
      }
    }
  }

  .codenum {
    font-family: var(--main);
    font-size: var(--reg);
    font-weight: bold;
    color: var(--blk);

    margin-top: 20px;
  }

  .tagwrp {
    margin-top: 15px;
  }

  label {
    font-weight: bold;
    display: flex;
    color: var(--grn);
    margin: 5px 0 5px 10px;
  }

  textarea {
    width: 400px;
    height: 40px;
    border-radius: 50px;
    border: 1px solid var(--liblk);
    resize: none;

    padding: 10px 20px;

    :focus {
      outline: 2px solid var(--grn);
      transition: outline 150ms ease-in-out;
    }
  }
`;

export default ProfileEditForm;
