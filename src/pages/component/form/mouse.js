import React, {useState, useEffect} from 'react';

// I want a component to show current mouse.position
// Or maybe a function to return current mouse.position
// Or maybe a function to listen the mouse.position and event
// I want to know why the mouse.position is not updated when I move the mouse

const useMouse = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: null, y: null });
  const [mouseEventCount, setMouseEventCount] = React.useState({
    left: 0,
    middle: 0,
    right: 0,
    rect_select: 0
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragEnd, setDragEnd] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseDown = (event) => {
      if (event.button === 0) {
        console.log('Left mouse button clicked');
        // 处理左键点击事件
        // why cannot +1 here? And it is 0 or 1 when I click the left button
        // setMouseEventCount({ ...mouseEventCount, left: mouseEventCount.left + 1 });
        // use callback to update the state
        setMouseEventCount((mouseEventCount) => {
          return { ...mouseEventCount, left: mouseEventCount.left + 1 };
        });
      } else if (event.button === 1) {
        console.log('Middle mouse button clicked');
        // 处理中键点击事件
        // setMouseEventCount({ ...mouseEventCount, middle: mouseEventCount.middle + 1 });
        // use callback to update the state
        setMouseEventCount((mouseEventCount) => {
          return { ...mouseEventCount, middle: mouseEventCount.middle + 1 };
        });     
      } else if (event.button === 2) {
        console.log('Right mouse button clicked');
        // 处理右键点击事件
        // setMouseEventCount({ ...mouseEventCount, right: mouseEventCount.right + 1 });
        // use callback to update the state
        setMouseEventCount((mouseEventCount) => {
          return { ...mouseEventCount, right: mouseEventCount.right + 1 };
        });
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (event.button === 0) {
        setIsDragging(true);
        setDragStart({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        setDragEnd({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseUp = () => {
      // setMouseEventCount({ ...mouseEventCount, rect_select: mouseEventCount.rect_select + 1 });
      // use callback to update the state
      setMouseEventCount((mouseEventCount) => {
        return { ...mouseEventCount, rect_select: mouseEventCount.rect_select + 1 };
      });
      setIsDragging(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return {mousePosition, mouse_rect_select: {isDragging, dragStart, dragEnd}, mouseEventCount};
};

export const Mouse = () => {
  const {mousePosition, mouse_rect_select: {isDragging, dragStart, dragEnd}, mouseEventCount} = useMouse();
  return (
    <div>
      <div>
        <strong>Mouse position: </strong>
        <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
      </div>
      <div>
        <strong>Mouse rect select:</strong>
        <p>Is dragging: {isDragging ? 'Yes' : 'No'}</p>
        <p>Start: ({dragStart.x}, {dragStart.y})</p>
        <p>End: ({dragEnd.x}, {dragEnd.y})</p>
      </div>
      <div>
        <strong>Mouse event:</strong>
        <p>Left: {mouseEventCount.left}, Middle: {mouseEventCount.middle}, Right: {mouseEventCount.right}, Rect select: {mouseEventCount.rect_select}</p>
      </div>
    </div>
  )
}