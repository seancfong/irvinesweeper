import React, { useState, useEffect } from 'react';
import { isBrowser } from 'react-device-detect';


const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [click, setClick] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  const [renderCursor, setRenderCursor] = useState(false);

  useEffect(() => {
    setRenderCursor(isBrowser);
    console.log(isBrowser)
  }, [isBrowser]);
  
  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', mMove);
      document.addEventListener('mouseenter', mEnter);
      document.addEventListener('mouseleave', mLeave);
      document.addEventListener('mousedown', mDown);
      document.addEventListener('mouseup', mUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseenter', mEnter);
      document.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mousedown', mDown);
      document.removeEventListener('mouseup', mUp);

    };

    const mDown = () => {
      setClick(true);
    };

    const mUp = () => {
      setClick(false);
    };
    
    const mMove = (el: any) => {
      setPosition({ x: el.clientX, y: el.clientY });
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mEnter = () => {
      setHidden(false);
    };
    
    const addLinkEvents = () => {
      document.querySelectorAll('a').forEach((el) => {
        el.addEventListener('mouseover', () => setLinkHover(true));
        el.addEventListener('mouseout', () => setLinkHover(false));
      });
      document.querySelectorAll('button').forEach((el) => {
        el.addEventListener('mouseover', () => setLinkHover(true));
        el.addEventListener('mouseout', () => setLinkHover(false));
      });
    };

    addEventListeners();
    addLinkEvents();
    return () => removeEventListeners();
  }, []);


  return (
    <>
    {/* Only render cursor on touchscreen devices */}
    { renderCursor && 
      <div
      className={
          'cursor ' +
          (hidden ? 'c--hidden ' : ' ') + 
          (click ? 'c--clicked ' : ' ') +
          (linkHover ? 'c--hover ' : ' ')
        }
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 102,
          pointerEvents: 'none'
        }}
      />
    }
    </>
  );
};

export default Cursor;