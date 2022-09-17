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
  },
};

function FilterMode({ mode, ...props }) {
  const { bgcolor, ftcolor } = COLOR[mode];
  return <FilterButton ftcolor={ftcolor} bgcolor={bgcolor} />;
}

function IconMode({ mode, ...props }) {
  const { bgcolor, ftcolor } = COLOR[mode];
  return <IconButton ftcolor={ftcolor} bgcolor={bgcolor} />;
}

function TextMode({ mode, ...props }) {
  const { bgcolor, ftcolor } = COLOR[mode];
  return <TextButton ftcolor={ftcolor} bgcolor={bgcolor} />;
}
export { FilterMode, IconMode, TextMode };
