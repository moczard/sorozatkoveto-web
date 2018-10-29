import { Component } from 'react';
import io from 'socket.io-client';

class Home extends Component {
  constructor() {
    super();
    this.socket = io('http://localhost:3001/', { query: `token=${localStorage.getItem('id_token')}` });
    this.setupSocket();
    this.state = {
      hello: 'new hello',
    };
  }

  setupSocket() {
    this.socket.on('hello', () => {
      this.setState({ hello: 'hello' });
    });
  }

  render() {
    return (
      `message: ${this.state.hello}`
    );
  }
}

export default Home;
