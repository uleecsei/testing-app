import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TakeQuizService {

  socket: any = io(`${environment.baseUrl}/game`);
  allResults$:BehaviorSubject<any[]> = new BehaviorSubject([])
  players$:BehaviorSubject<any[]> = new BehaviorSubject([])

  constructor() {
    this.socket.on('roomId', roomId =>
      console.log(roomId));
      this.socket.on("showResults",(results)=>{
        console.log("showing results")
        this.allResults$.next([...this.allResults$.value,results])
      })
  }

  createGame(quiz, userId) {
    this.socket.emit('createGame', {quiz, userId});
  }

  joinRoom(room, userId, firstName) {
    this.socket.emit('joinGameRoom', {room, userId, firstName});
  }

  startGame() {
    this.socket.emit('gameStarted');
  }
  pushResults(result,userId,userName){
     this.socket.emit("pushResults",result,userId,userName)
}
 addPlayer(allUsers){
    return this.players$.next([...allUsers])
 }



}
