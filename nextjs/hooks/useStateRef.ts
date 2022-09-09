import { useEffect, useRef, useState } from "react";

const useStateRef = <T>(initialValue: any): [T, any, any] => {
  const [value, setValue] = useState<T>(initialValue);

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

export default useStateRef