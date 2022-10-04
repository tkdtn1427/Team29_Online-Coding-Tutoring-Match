import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import CustomDate from './CustomDate';

function DateBox(props) {
  const { label, name, ...rest } = props;

  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <CustomDate
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={val => {
                setFieldValue(name, val);
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default DateBox;
