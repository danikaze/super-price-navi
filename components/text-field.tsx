import {
  useState,
  FunctionComponent,
  ChangeEventHandler,
  FocusEventHandler,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { default as MuiTextField } from '@material-ui/core/TextField/TextField';

export interface TextFieldProps {
  id?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  label?: React.ReactNode;
  defaultValue?: string;
  validation?: (value: string) => boolean;
  onChange?: (value: string) => void;
}

type ChangeOrFocusEventHandler = ChangeEventHandler<HTMLInputElement> &
  FocusEventHandler<HTMLInputElement>;
type ChangeOrFocusEvent = ChangeEvent<HTMLInputElement> &
  FocusEvent<HTMLInputElement>;

export const TextField: FunctionComponent<TextFieldProps> = props => {
  const [hasError, setError] = useState<boolean>(false);
  let onChange: ChangeOrFocusEventHandler | undefined;
  if (props.validation && props.onChange) {
    onChange = (event: ChangeOrFocusEvent) => {
      const text = event.target.value;
      setError(!props.validation!(text));
      props.onChange!(text);
    };
  } else if (props.validation) {
    onChange = (event: ChangeOrFocusEvent) => {
      setError(!props.validation!(event.target.value));
    };
  } else if (props.onChange) {
    onChange = (event: ChangeOrFocusEvent) => {
      props.onChange!(event.target.value);
    };
  }

  return (
    <MuiTextField
      id={props.id}
      inputRef={props.inputRef}
      label={props.label}
      onChange={onChange}
      onBlur={props.validation && onChange}
      error={hasError}
      variant="filled"
      fullWidth={true}
      defaultValue={props.defaultValue}
    />
  );
};
