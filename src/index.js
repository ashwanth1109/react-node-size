import { useLayoutEffect, useEffect, useState, useCallback } from "react";

const useNodeSize = ({
  dependancies = [],
  measureOnResize = true,
  measureOnScroll = false
} = {}) => {
  const [rectValues, setRectValues] = useState({});
  const [node, setNode] = useState(null);

  const setRef = useCallback(node => setNode(node), []);

  useLayoutEffect(() => {
    if (node) {
      const getValues = () => setRectValues(node.getBoundingClientRect());
      getValues();
      if (measureOnResize && measureOnScroll) {
        window.addEventListener("resize", getValues);
        window.addEventListener("scroll", getValues);
        return () => {
          window.removeEventListener("resize", getValues);
          window.removeEventListener("scroll", getValues);
        };
      } else if (measureOnResize) {
        window.addEventListener("resize", getValues);
        return () => window.removeEventListener("resize", getValues);
      } else if (measureOnScroll) {
        window.addEventListener("scroll", getValues);
        return () => window.removeEventListener("scroll", getValues);
      }
    }
  }, [node, ...(dependancies || [])]);

  return { setRef, rectValues };
};

export default useNodeSize;
