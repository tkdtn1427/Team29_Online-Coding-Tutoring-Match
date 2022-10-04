import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const RenderInWindow = props => {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(window);
  useEffect(() => {
    const div = document.createElement('div');
    setContainer(div);
  }, []);

  useEffect(() => {
    if (container) {
      newWindow.current = window.open('http://localhost:3000/chat', '', 'width=600, height=600');
      newWindow.current.document.body.appendChild(container);
      const curWindow = newWindow.current;
      return () => curWindow.close();
    }
  }, [container]);
  return container && createPortal(props.children, container, document.getElementById('popup'));
};

export default function Chatbtn() {
  const [open, setOpen] = useState();
  return (
    <>
      <button onClick={() => setOpen(true)}>문의하기</button>
      {open && <RenderInWindow />}
    </>
  );
}
