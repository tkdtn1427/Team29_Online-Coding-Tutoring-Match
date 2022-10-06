import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function TimePicker(props) {
  const { label, name, ...rest } = props;

  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field type="time" id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default TimePicker;
