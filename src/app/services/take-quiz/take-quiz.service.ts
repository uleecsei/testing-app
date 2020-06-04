import {Injectable} from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TakeQuizService {
  socket: any = io('http://localhost:3000/game');


  constructor() {
    this.socket.on('roomId', roomId =>
      console.log(roomId));
  }

  createGame(quiz, userId) {
    this.socket.emit('createGame', {quiz, userId});
  }

  joinRoom(room, userId) {
    this.socket.emit('joinGameRoom', {room, userId});
  }

  startGame() {
    this.socket.emit('gameStarted');
  }


}
