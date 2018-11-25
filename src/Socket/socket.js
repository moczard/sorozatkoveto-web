import io from 'socket.io-client';


let socket;
const connect = () => {
  if (!socket) {
    socket = io('http://localhost:3001/', { query: `token=${localStorage.getItem('id_token')}` });
  }

  return socket;
};

export default connect;
