import { classNames } from "@/utils";
import type React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className={classNames(
        "p-5 bg-slate-800 rounded-2xl outline-0 no-spinner",
        props.className || ""
      )}
    />
  );
};

export default Input;
