import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

const dateChange = value => {
  const year =
    value?.toLocaleDateString('ko-KR', {
      year: 'numeric',
    }) || '';
  const month =
    value?.toLocaleDateString('ko-KR', {
      month: 'numeric',
    }) || '';
  const day =
    value?.toLocaleDateString('ko-KR', {
      day: 'numeric',
    }) || '';
  return `${year.substr(0, year.length - 1)}-${month.substr(0, month.length - 1)}-${day.substr(0, day.length - 1)}`;
};

function CustomDate(props) {
  const { value, val, ...rest } = props;
  return (
    <DatePicker
      selected={dateChange(value)}
      onChange={val}
      disabledKeyboardNavigation
      minDate={new Date()}
      locale={ko}
      dateFormat="yyyy년 MM월 dd일 E요일"
      {...rest}
    />
  );
}

export default CustomDate;
