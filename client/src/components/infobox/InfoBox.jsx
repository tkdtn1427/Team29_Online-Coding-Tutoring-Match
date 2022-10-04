import { useState } from 'react';
import styled from '@emotion/styled';
import MonthlyCalendar from '../calendar/MonthlyCalendar.jsx';
import ReviewContainer from '../review/ReviewContainer.jsx';
import TabHandler from '../../utils/TabHandler';

function InfoBox() {
  const [currentTab, setCurrentTab] = useState(0);

  const Tab = ['캘린더', '강의 후기'];

  return (
    <Container>
      <Tabs>
        {Tab.map((e, i) => (
          <div
            key={i}
            onClick={() => {
              TabHandler(i, setCurrentTab);
            }}
            className={currentTab === i ? 'selectedtab' : 'unselectedtab'}>
            {e}
          </div>
        ))}
      </Tabs>
      {currentTab ? <ReviewContainer></ReviewContainer> : <MonthlyCalendar></MonthlyCalendar>}
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-bottom: 1px solid var(--blk);
  padding-bottom: 20px;
  margin-bottom: 60px;
  font-size: var(--reg);
  .selectedtab {
    color: var(--grn);
    cursor: pointer;
  }
  .unselectedtab {
    color: var(--blk);
    cursor: pointer;
  }
`;
export default InfoBox;
