import * as React from 'react';
import Login from './Login';
import Main from './Main';
import dispatcher from './Flux';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: true,
    };
    this._isLogined = this._isLogined.bind(this);
  }

  componentDidMount() {
    dispatcher.register(dispatch => {
      if (dispatch.type === 'change') {
        this._isLogined();
      }
    });
  }

  _isLogined = () => {
    console.log('isLogined Change !');
    this.setState({
      isLogined: true,
    });
  };

  render() {
    const {isLogined} = this.state;
    return <>{isLogined ? <Main /> : <Login />}</>;
  }
}
