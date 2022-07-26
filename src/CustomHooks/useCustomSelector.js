import { useSelector } from "react-redux";

const useCustomSelector = (...keys) => {
  return useSelector((state) => keys.map((key) => state[key]));
};

export default useCustomSelector;
