import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useOutSideClick from '../../hooks/useOutSideClick';
import ModalContainer from '../modal/ModalContainer.jsx';
import SidebarModal from './SidebarModal.jsx';
import { GetRoom } from '../../utils/apis/API/ChatApi';
import RenderInWindow from '../chat/ChatBtn';

function Sidebar({ onClose }) {
  const [chatList, setChatList] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  console.log(chatList);
  useEffect(() => {
    GetRoom().then(data => setChatList(data.roomDtoList));
  }, []);

  return (
    <SidebarModal onClose={onClose}>
      <Head>CHAT LIST</Head>
      {chatList.length === 0
        ? ''
        : chatList.map((e, i) => (
            <div key={i}>
              <List
                key={i}
                onClick={() => {
                  setOpenPopup(true);
                }}>
                {e.roomName}
              </List>
              {openPopup && <RenderInWindow onClose={() => setOpenPopup(false)} roomId={e.roomId} />}
            </div>
          ))}
    </SidebarModal>
  );
}
const Head = styled.div`
  color: white;
  font-weight: bold;
  font-size: var(--l);
`;

const List = styled.div`
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;

export default Sidebar;
