import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import Radio from './Radio';
import CheckBox from './CheckBox';
import DateBox from './DateBox';
import Time from './Time';
import Test from './Test';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;

    case 'textarea':
      return <TextArea {...rest} />;

    case 'select':
      return <Select {...rest} />;

    case 'radio':
      return <Radio {...rest} />;

    case 'checkbox':
      return <CheckBox {...rest} />;

    case 'date':
      return <DateBox {...rest} />;

    case 'time':
      return <Time {...rest} />;

    case 'test':
      return <Test {...rest} />;

    default:
      return null;
  }
}

export default FormikControl;
