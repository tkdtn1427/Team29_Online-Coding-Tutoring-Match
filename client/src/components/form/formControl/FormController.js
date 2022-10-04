import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import Radio from './Radio';
import CheckBox from './CheckBox';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

function FormController(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;

    case 'radio':
      return <Radio {...rest} />;

    case 'checkbox':
      return <CheckBox {...rest} />;

    case 'select':
      return <Select {...rest} />;

    case 'textarea':
      return <TextArea {...rest} />;

    case 'date':
      return <DatePicker {...rest} />;

    case 'time':
      return <TimePicker {...rest} />;

    default:
      return null;
  }
}

export default FormController;
