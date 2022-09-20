import styled from '@emotion/styled';
import { useState } from 'react';
import CalendarNav from './CalendarNav.jsx';
import CalendarBody from './CalendarBody.jsx';

function MonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  return (
    <Container>
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
      <CalendarBody year={year} month={month} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
