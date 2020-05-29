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



  createGame() {
    this.socket.emit("createGame", () => {

    })
  }

  joinRoom(room, quizId) {
    this.socket.emit("joinGameRoom", room, quizId)
  }




}
