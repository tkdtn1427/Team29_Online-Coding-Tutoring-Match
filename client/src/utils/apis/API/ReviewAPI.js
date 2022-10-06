import authRequest from '../Interceptors';
import { getUser } from '../../Localstorage';

// 후기 등록
async function UploadReview({ postReviewForm }) {
  try {
    const result = await authRequest.post(`/v1/reviews/register`, postReviewForm);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

// 후기 수정
async function UpdateReview({ editReviewForm, Id }) {
  try {
    const result = await authRequest.patch(`v1/reviews/update/${Id}`, editReviewForm);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

// 후기 삭제
async function DeleteReview({ Id }) {
  try {
    const result = await authRequest.delete(`v1/reviews/delete/${Id}`);
    return result;
  } catch (err) {
    console.log(err);
  }
}

// 선생님별 후기 조회
async function GetReviews({ teacherId, page, size }) {
  try {
    const result = await authRequest.get(`/v1/reviews/${teacherId}?page=${page}&size=${size}&arrange=review_Id`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export { UpdateReview, UploadReview, DeleteReview, GetReviews };
