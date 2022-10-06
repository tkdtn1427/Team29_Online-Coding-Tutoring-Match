import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import CalendarNav from './CalendarNav.jsx';
import CalendarBody from './CalendarBody.jsx';
import Schedule from '../form/Schedule.jsx';

import { SearchLesson } from '../../utils/apis/API/LessonAPI';
import { TextMode } from '../buttons/ColorMode.jsx';
import LessonModal from '../modal/LessonModal.jsx';

import { getUser } from '../../utils/Localstorage';
import { GetUser } from '../../redux/user/UserReducer';

function MonthlyCalendar() {
  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const { role } = getUser();
  useEffect(() => {
    dispatch(GetUser());
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const openLessonModal = () => {
    setIsOpen(!isOpen);
  };

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setday] = useState(String(new Date().getDate()));

  // 날짜 변환
  const changedDate = `${year}-${('00' + month).slice(-2)}-${('00' + day).slice(-2)}`;

  // 오늘 날짜 : YYYY-MM-DD
  const [currentDate, setCurrentDate] = useState(changedDate);

  // 선택한 날짜 : DD
  const [selectedDate, setSelectedDate] = useState();

  // 강의 목록 상태
  const [lesson, setLesson] = useState();

  // 초기상태 오늘로 설정
  useEffect(() => {
    SearchLesson({ date: changedDate }).then(res => setLesson(res));
  }, []);

  // 날짜 클릭시
  const onDateClick = async day => {
    const sltdate = `${changedDate.slice(0, 8)}${('0' + day).slice(-2)}`;

    setSelectedDate(day);

    await SearchLesson({ date: sltdate }).then(res => setLesson(res));
  };

  return (
    <Container>
      <CalendarWrp>
        <CalendarNav bgColor={'#E4E2BC'} month={month} year={year} setMonth={setMonth} currentDate={currentDate} />
        <Week>
          <span>sun</span>
          <span>mon</span>
          <span>tue</span>
          <span>wed</span>
          <span>thu</span>
          <span>fri</span>
          <span>sat</span>
        </Week>
        <CalendarBody year={year} month={month} day={day} selectedDate={selectedDate} onDateClick={onDateClick} />
      </CalendarWrp>
      <div className="wrp">
        {role === 'student' ? null : <TextMode mode={'ORANGE'} text={'강의 등록'} onClick={openLessonModal} />}
        {isOpen && <LessonModal onClose={openLessonModal} />}
        <Schedule lesson={lesson} role={role} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 50px;
`;

const CalendarWrp = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: auto;
  text-align: center;
`;

const Week = styled.div`
  font-family: var(--main);
  font-size: var(--s);
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 698px;
  height: 20px;
  border: 1px solid lightgray;
`;

export default MonthlyCalendar;
