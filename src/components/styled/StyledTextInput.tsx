// import from node modules
import styled, { ThemedStyledProps } from 'styled-components';

const border = (props: Record<string, any>) => props.theme.border;
const color = (props: Record<string, any>) => props.theme.color;

export default styled.input`
  box-shadow: inset 0 0 8px 0 ${color}, 0 0 2px 0 ${color};
  width: 200px;
  height: 2rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => props.theme.padding};
  transition: all 0.2s ease-out;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 4px 0 ${color}, 0 0 6px 0 ${color};
  }
`;
