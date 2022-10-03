import ReviewBox from './ReviewBox.jsx';

function ReviewList() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
        <ReviewBox />
      ))}
    </>
  );
}

export default ReviewList;
