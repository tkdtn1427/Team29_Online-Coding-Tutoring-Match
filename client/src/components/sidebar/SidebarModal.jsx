import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useOutSideClick from '../../hooks/useOutSideClick';
import ModalContainer from '../modal/ModalContainer.jsx';

function SidebarModal({ onClose, children }) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };

  useOutSideClick(modalRef, handleClose);

  useEffect(() => {
    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalContainer>
      <Overlay>
        <ModalWrap ref={modalRef}>
          <Contents>{children}</Contents>
        </ModalWrap>
      </Overlay>
    </ModalContainer>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 9999;
`;
const ModalWrap = styled.div`
  width: 300px;
  height: 100vh;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: var(--grn);
  position: absolute;
  top: 61px;
  right: 0;
`;
const Contents = styled.div`
  margin: 50px 30px;
`;

export default SidebarModal;
