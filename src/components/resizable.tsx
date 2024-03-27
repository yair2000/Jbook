import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./styles/resizable.css";

interface ResizableProps{
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) =>{
  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.5);

  useEffect(() =>{
    let timer: any;
    const listener = () =>{
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() =>{
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if(window.innerWidth * 0.5 < width){
          setWidth(window.innerWidth * 0.5);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () =>{
      window.removeEventListener('resize', listener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(direction === "horizontal"){
    resizableProps ={
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.7, Infinity], // index 0 = horizontal | index 1 = vertical
      height: Infinity,
      width
    }
  }
  else{
    resizableProps ={
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.75],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"]
    }
  }
  return(
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  )
}

export default Resizable;