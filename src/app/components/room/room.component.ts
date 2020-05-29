import { Component, OnInit } from '@angular/core';
import io from "socket.io-client"
import { TakeQuizService } from 'src/app/services/take-quiz/take-quiz.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  quizId
  room
  
  private socket
  constructor(
    private takequizService:TakeQuizService) { }

  ngOnInit(): void {
    this.quizId=window.history.state.quizId
    this.socket=this.takequizService.socket
    console.log(this.quizId)
  }

  public ngAfterViewInit(){
    this.socket.on("roomId",roomId=>
    console.log(roomId))
    this.socket.on('Join the game',(message)=>{
      console.log(message)
    })
    this.socket.on('joinedRoom',(message)=>{
      console.log(message)
    })
    this.socket.on('games',(message)=>{
      console.log(message)
    })
 }

 createGame(){
   console.log(this.room)
    return this.takequizService.createGame()
 }

 joinRoom(){
   this.takequizService.joinRoom(this.room,this.quizId)
 }



}
