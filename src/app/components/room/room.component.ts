import { Component, OnInit, AfterViewInit } from '@angular/core';
import io from 'socket.io-client';
import { TakeQuizService } from 'src/app/services/take-quiz/take-quiz.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, AfterViewInit {
  quiz;
  isCreator;
  quizId;
  room;
  user;

  private socket;
  constructor(
    private userService: UserService,
    private takequizService: TakeQuizService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.quiz = window.history.state.quiz || null;
    this.isCreator = !!(this.quiz);
    this.quizId = (this.quiz) ? this.quiz._id : null;
    this.socket = this.takequizService.socket;
    console.log(this.quizId);
    this.user = this.userService.getUser();
    console.log(this.user);
  }

  public ngAfterViewInit(){
    this.socket.on('roomId', roomId =>
    this.room = roomId);

    this.socket.on('games', roomId =>
    console.log(roomId));
    this.socket.on('Join the game', (message) => {
      console.log(message);
    });
    this.socket.on('joinedRoom', (message) => {
      console.log(message);
    });
    this.socket.on('quiz created', quiz => console.log(quiz));

    this.socket.on('quiz', (quiz) => {
      console.log('gotten quiz', quiz);
      this.router.navigate(['home/takeQuiz', quiz._id], {state: {quiz, isCreator: this.isCreator}});
    });
 }

 createGame(){
    return this.takequizService.createGame(this.quiz, this.user.id);
 }

 joinRoom(){
   this.takequizService.joinRoom(this.room);
  }



}
