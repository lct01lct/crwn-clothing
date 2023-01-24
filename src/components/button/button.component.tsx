import './button.style.scss';

const BUTTON_TYPES_CLASSES: {
  google: string;
  inverted: string;
  [buttonType: string]: string;
} = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

interface ButtonProps {
  children?: any;
  buttonType?: 'google' | 'inverted';
  [otherProps: string]: any;
}

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={`button-container ${buttonType && BUTTON_TYPES_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
