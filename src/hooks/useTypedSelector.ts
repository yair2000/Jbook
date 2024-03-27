import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/reducers/reducerCombiner";
import { useMemo } from "react";

export const useTypedSelector:
TypedUseSelectorHook<RootState> = (selector) =>{
  const result = useSelector(selector, shallowEqual);
  return useMemo(() => result, [result]);
};

const shallowEqual = (a: any, b: any) =>{
  if (a === undefined || b === undefined){
    return false;
  }
  for(let key in a){
    if(a[key] !== b[key]){
      return false;
    }
  }
  for(let key in b){
    if(!(key in a)){
      return false;
    }
  }
  return true;
};