import { Injectable } from '@angular/core';
import io from "socket.io-client"

@Injectable({
  providedIn: 'root'
})
export class TakeQuizService {
  socket: any = io("http://localhost:3000/game")


  constructor() { }
  public ngOnInit() {
  }

  public ngAfterViewInit() {
    this.socket.on("roomId", roomId =>
      console.log(roomId))
  }
  createGame(quiz) {
    this.socket.emit("createGame", quiz)
  }

  joinRoom(room) {
    this.socket.emit("joinGameRoom", room)
  }

  startGame() {
    this.socket.emit("gameStarted")
  }


}
