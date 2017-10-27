import React, {PropTypes} from 'react';
import Portal from 'react-portal';
import Prompt from './Prompt';

export default class PromptDialog extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    show: PropTypes.bool,
    hidePrompt: PropTypes.func,
    confirmCount: PropTypes.func,
    isFloat: PropTypes.bool,
    portRef: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { show, value, isFloat, hidePrompt, confirmCount, portRef } = this.props;
    return (
      <Portal ref={portRef} isOpened={ show } >
        <Prompt count={value} isFloat={isFloat} hidePrompt={hidePrompt} confirmCount={confirmCount} />
      </Portal>
    );
  }
}
