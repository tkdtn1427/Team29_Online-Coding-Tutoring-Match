import styled from '@emotion/styled';

function CalendarNav({ year, setMonth, month }) {
  const firstDate = new Date(year, month - 1, 1);
  const monthItems = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  // console.log(firstDate.getMonth());
  return (
    <Navbar>
      <div>
        <span className="year">{firstDate.getFullYear()}</span>
        <span className="currentmonth">{monthItems[firstDate.getMonth()]}</span>
      </div>
      <div>
        <span
          className="lastmonth"
          onClick={() => {
            setMonth(month - 1);
          }}>
          {'<'}
        </span>
        <span
          className="nextmonth"
          onClick={() => {
            setMonth(month + 1);
          }}>
          {'>'}
        </span>
      </div>
    </Navbar>
  );
}

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 700px;
  font-family: var(--point);
  margin-bottom: 10px;

  .year {
    font-size: var(--reg);
    margin-right: 10px;
  }
  .lastmonth {
    font-weight: bold;
    font-size: var(--s);
    margin-right: 10px;
    cursor: pointer;
  }
  .currentmonth {
    font-weight: bold;
    font-size: var(--reg);
  }
  .nextmonth {
    font-weight: bold;
    font-size: var(--s);
    cursor: pointer;
  }
`;

export default CalendarNav;
