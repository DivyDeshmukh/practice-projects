import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
        return (
        <div>    
            <input ref={ref} {...props} />
        </div>
    )
  }
);

Input.displayName = "Input";

export default Input;