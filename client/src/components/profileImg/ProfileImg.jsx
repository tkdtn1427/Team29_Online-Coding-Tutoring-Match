import styled from '@emotion/styled';

function ProfileImg({ width, height, src }) {
  return <Container width={width} height={height} src={src}></Container>;
}

const Container = styled.img`
  width: ${props => props.width};
  height: ${props => props.height};
  src: ${props => props.src};
  alt: '';
  border-radius: 100%;
  border: 1px solid var(--blk);
  object-fit: cover;
`;

export default ProfileImg;
