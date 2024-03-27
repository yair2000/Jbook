import React, { useEffect, useRef } from "react";

import { Cell } from "../redux";
import ActionBar from "./actionBar";
import "./styles/preview.css";
import "./styles/actionBar.css";

interface PreviewProps{
  code: string;
  err: string;
  cell: Cell;
}

const html = `
  <html>
    <head>
      <style>html { background-color: white; }</style>
    </head>
      <body>
        <div id="root"/>
          <script>
            const errorHandler = (err) =>{
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
            window.addEventListener('error', (event) =>{
              event.preventDefault();
              errorHandler(event.error)
            })
            window.addEventListener('message', (event) =>{
            try{
              // Output of the code in the child iframe
              eval(event.data);
            }
            catch(err){
              errorHandler(err);
            }
          }, false);
          </script>
      </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err, cell }) =>{
  const iframe = useRef<any>();

  useEffect(() =>{
    iframe.current.srcdoc = html;
    setTimeout(() =>{
      iframe.current.contentWindow.postMessage(code, '*'); // Posts the result from the code bundling
    }, 10);
  }, [code]);

  return(
    <div className="preview-wrapper">
      <iframe
      title="code preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}/>
      {err && (
        <div className="preview-error">
          {err}
        </div>
      )}
      <div style={{ display: "none" }}>
        <div className="action-bar">
          <ActionBar id={cell.id}/>
        </div>
      </div>
    </div>
  );
}

export default Preview;