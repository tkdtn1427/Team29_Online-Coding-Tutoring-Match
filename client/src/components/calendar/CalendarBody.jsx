import styled from '@emotion/styled';

function CalendarBody({ year, month, day, selectedDate, onDateClick }) {
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  const frontEmpties = firstDate.getDay();
  const items = lastDate.getDate();
  const lastEmpties = 7 - ((frontEmpties + items) % 7);
  const dateItems = [
    ...new Array(frontEmpties),
    ...new Array(items).fill(0).map((_, i) => `${(i + 1).toString()}`),
    ...new Array(lastEmpties),
  ];

  return (
    <Container>
      {dateItems.map((el, i) => (
        <div
          className={el === undefined ? 'notday' : el === selectedDate ? 'selected' : el === day ? 'curday' : 'date'}
          key={i}
          onClick={() => onDateClick(el)}>
          {el || ' '}
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 50px;
  width: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  background-color: white;

  .date {
    font-size: var(--s);
    display: flex;
    justify-content: left;
    padding: 5px 0px 0px 5px;
    height: 100px;
    border: 1px solid lightgray;

    :hover {
      background-color: var(--grey0);
    }
  }

  .notday {
    display: flex;
    justify-content: left;
    padding: 5px 0px 0px 5px;
    height: 100px;
    border: 1px solid lightgray;
    background-color: var(--grey1);
  }

  .curday {
    font-family: var(--main);
    font-size: var(--s);
    display: flex;
    justify-content: left;
    padding: 5px 0px 0px 5px;
    height: 100px;
    border: 1px solid lightgray;
    background-color: var(--grn);
  }

  .selected {
    font-family: var(--main);
    font-size: var(--s);
    display: flex;
    justify-content: left;
    padding: 5px 0px 0px 5px;
    height: 100px;
    border: 1px solid lightgray;
    background-color: var(--org);
  }
`;

export default CalendarBody;
