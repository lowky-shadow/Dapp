import { classNames } from "@/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(
        `p-3 rounded-2xl font-medium mt-3 cursor-pointer  ${
          props.isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-800 hover:bg-blue-700 text-white"
        }`,
        props.className || ""
      )}
    >
      {props.children}
    </button>
  );
}

export default Button
