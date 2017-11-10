import { withProps } from 'recompose';

// HOC to make composing component style easy.
// Use similar to how you'd use `styled` in styled-components:
// StyledView = styled({ backgroundColor: 'red' })(View)
//
// Can base style off of props:
// StyledView = styled(props => { backgroundColor: props.color })(View)
//
// Also allows for style overriding:
// <StyledView style={{ borderColor: 'red' }} />
//
// Or using with ReactNative.StyleSheet:
// const styles = StyleSheet.create({ myStyle: { backgroundColor: 'red' }});
// StyledView = styled(styles.myStyle)(View)
const styled = (styleInput) => {
  const hoc = withProps((props) => {
    let style = styleInput;
    if (typeof styleInput === 'function') style = styleInput(props);

    if (props.style) {
      if (!Array.isArray(style)) {
        style = [style];
      }

      if (Array.isArray(props.style)) {
        style = style.concat(props.style);
      } else {
        style.push(props.style);
      }
    }
    return { style };
  });
  return hoc;
};

export default styled;
