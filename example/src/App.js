import React, { useState, useRef, useEffect } from "react";
import useNodeSize from "react-node-size";

const cs = {
  fCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cell: {
    flex: 1,
    height: "100px",
    margin: "0 8px"
  }
};

const s = {
  flex: { display: "flex" },
  box: {
    background: "#ed5336",
    color: "#fff",
    ...cs.fCenter
  },
  info: {
    ...cs.cell,
    marginTop: "8px"
  }
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default () => {
  const container = { ...cs.cell, ...s.box };

  const { setRef: n1Ref, rectValues: rectValues1 } = useNodeSize();
  const { width: n1Width, height: n1Height } = rectValues1 || {};

  const [node2Expand, setNode2Expand] = useState(true);
  const { setRef: n2Ref, rectValues: rectValues2 } = useNodeSize({
    dependancies: [node2Expand]
  });
  const { width: n2Width, height: n2Height } = rectValues2 || {};

  useInterval(() => {
    setNode2Expand(prev => !prev);
  }, 1500);

  const [node3Height, setNode3Height] = useState(100);
  const [incrementVal, setIncrementVal] = useState(1);
  const { setRef: n3Ref, rectValues: rectValues3 } = useNodeSize({
    dependancies: [node3Height]
  });
  const { width: n3Width, height: n3Height } = rectValues3 || {};

  useInterval(() => {
    setNode3Height(prev => {
      if (prev === 50) {
        setIncrementVal(1);
        return prev + 1;
      } else if (prev === 100) {
        setIncrementVal(-1);
        return prev - 1;
      } else return prev + incrementVal;
    });
  }, 100);

  const [display, setDisplay] = useState(false);
  const { setRef: n4Ref, rectValues: rectValues4 } = useNodeSize({
    dependancies: [display]
  });
  const { width: n4Width, height: n4Height } = rectValues4 || {};
  useInterval(() => {
    setDisplay(prev => !prev);
  }, 1500);

  return (
    <>
      <h1>react-node-size: useNodeSize hook</h1>
      <div style={s.flex}>
        <div style={container} ref={n1Ref}>
          N1
        </div>
        <div
          style={{
            ...container,
            ...{
              height: node2Expand ? "100px" : "50px"
            }
          }}
          ref={n2Ref}
        >
          N2
        </div>
        <div
          style={{
            ...container,
            ...{ height: node3Height }
          }}
          ref={n3Ref}
        >
          N3
        </div>
        <div style={{ flex: 1, display: "flex" }}>
          <div
            style={{
              ...{
                width: "100%",
                height: "100%",
                background: "#ed5336",
                color: "#fff"
              },
              ...cs.fCenter,
              ...{ display: display ? "flex" : "none" }
            }}
            ref={n4Ref}
          >
            N4
          </div>
        </div>
      </div>
      <div style={s.flex}>
        <div style={s.info}>
          <div>Width of Node 1 is: {n1Width}</div>
          <div>Height of Node 1 is: {n1Height}</div>
        </div>
        <div style={s.info}>
          <div>Width of Node 2 is: {n2Width}</div>
          <div>Height of Node 2 is: {n2Height}</div>
        </div>
        <div style={s.info}>
          <div>Width of Node 3 is: {n3Width}</div>
          <div>Height of Node 3 is: {n3Height}</div>
        </div>
        <div style={s.info}>
          <div>Width of Node 4 is: {n4Width}</div>
          <div>Height of Node 4 is: {n4Height}</div>
        </div>
      </div>
    </>
  );
};
