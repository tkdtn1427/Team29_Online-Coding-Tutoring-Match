import FilterButton from './FilterButton.jsx';
import IconButton from './IconButton.jsx';
import TextButton from './TextButton.jsx';

const COLOR = {
  ORANGE: {
    bgcolor: '#FF805C',
    ftcolor: '#FFFFFF',
  },
  GREEN: {
    bgcolor: '#8AAE92',
    ftcolor: '#FFFFFF',
  },
  GREY: {
    bgcolor: '#F4F4F4',
    ftcolor: '#3A3A3A',
  },
  WHITE: {
    bgcolor: '#FFFFFF',
    ftcolor: '#FF805C',
    shadow: '0px 2px 10px #bfbfbf',
  },
};

function FilterMode({ mode, ...props }) {
  const { bgcolor, ftcolor } = COLOR[mode];
  return <FilterButton ftcolor={ftcolor} bgcolor={bgcolor} text={props.text} />;
}

function IconMode({ mode, ...props }) {
  const { bgcolor, ftcolor } = COLOR[mode];
  return <IconButton ftcolor={ftcolor} bgcolor={bgcolor} text={props.text} onClick={props.onClick} />;
}

function TextMode({ mode, ...props }) {
  const { bgcolor, ftcolor, shadow } = COLOR[mode];
  return (
    <TextButton
      ftcolor={ftcolor}
      bgcolor={bgcolor}
      text={props.text}
      shadow={shadow}
      ftsize={props.ftsize}
      padding={props.padding}
      onClick={props.onClick}
    />
  );
}
export { FilterMode, IconMode, TextMode };
