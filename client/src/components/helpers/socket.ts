import socketIOClient from 'socket.io-client';
const server = "https://tout-doux-server.herokuapp.com";
const socket = socketIOClient(server);

export default socket;