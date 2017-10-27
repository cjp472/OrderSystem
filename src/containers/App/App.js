import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Offline from 'components/Offline';
import styled from 'styled-components';

injectTapEventPlugin();

const Container = styled.div`
  font-family: "Hiragino Sans GB","Microsoft YaHei","Hiragino Sans GB W3",FontAwesome,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
`;

@asyncConnect([{
  promise: () => {
    const promises = [];
    return Promise.all(promises);
  }
}])
export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    userAgent: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      online: true
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#f0f1f2';
    window.addEventListener('online', this.setOnline);
    window.addEventListener('offline', this.setOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.setOnline);
    window.removeEventListener('offline', this.setOffline);
  }

  setOnline = () => {
    this.setState({online: true});
  }

  setOffline = () => {
    this.setState({online: false});
  }

  render() {
    const { online } = this.state;
    return (
      <div>
        {/* 用户名密码自动填充样式*/}
          <style dangerouslySetInnerHTML={{
            __html: `
            body {
              margin: 0;
              -webkit-touch-callout: none;
              -webkit-user-select: none;
            }
            input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 1000px #FFF inset !important;
            }
            *{
              -webkit-tap-highlight-color:rgba(255,255,255,0);
            }
            input,textarea{
              outline: none;
              -webkit-appearance: none;
            }
            `
          }}/>
        {!online && <Offline />}
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
