import * as React from "react";
import CanvasScrollClip from "canvas-scroll-clip";

const CanvasScroll = ({ firstFrame, frameCount, frameScrollArea }) => {

  const ref = React.createRef();

  React.useEffect(() => {
    new CanvasScrollClip(ref.current, {
      framePath: firstFrame,
      frameCount: frameCount,
      scrollArea: frameScrollArea
    });

  }, []);


  return (
    <div ref={ref}></div>
  )
}

export default CanvasScroll;



