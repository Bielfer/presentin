import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import Input from '../core/Input';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  hint?: string;
}

const FormikNumber = ({ name, label, hint, className, ...props }: Props) => {
  const [{ value }, { error }, { setValue }] = useField(name);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value.replace(',', '.'))}
      label={label}
      className={className}
      error={error}
      hint={hint}
      {...props}
    />
  );
};

export default FormikNumber;
