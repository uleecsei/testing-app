import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { TakeQuizService } from 'src/app/services/take-quiz/take-quiz.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { User } from '../../interfaces/user';
import { logger } from "codelyzer/util/logger";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  quiz;
  isCreator;
  quizId;
  room;
  roomId;
  user;

  private socket;
  constructor(
    private userService: UserService,
    private takequizService: TakeQuizService,
    private answersService: AnswersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.quiz = window.history.state.quiz || null;
    this.isCreator = !!(this.quiz);
    this.quizId = (this.quiz) ? this.quiz._id : null;
    this.socket = this.takequizService.socket;
    this.user = this.userService.getUser();

    this.socket.on('roomId', roomId =>
      this.room = roomId);

    this.socket.on('Join the game', (message) => {
      console.log(message);

    });

    this.socket.on('joinedRoom', (message, userName, allUsers, room) => {
      console.log(message);
      console.log(allUsers);
      console.log('ROOM', room);
      this.takequizService.addPlayer(allUsers)
    });
    this.socket.on('quiz created', quiz => console.log('QUIZ from server', quiz));

    this.socket.on('quiz', (quiz) => {
      //console.log('gotten quiz', quiz);
      this.answersService.currentQuiz$.next(quiz)
      this.router.navigate(['home/takeQuiz', quiz._id], { state: { quiz, isCreator: this.isCreator } });
    });
  }

  // public ngAfterViewInit() {
  //
  // }

  createGame() {
    return this.takequizService.createGame(this.quiz, this.user.userId);
  }

  joinRoom() {
    console.log('clicked join room')
    this.takequizService.joinRoom(this.room, this.user.userId, this.user.firstName);
  }

  ngOnDestroy(): void {
    this.socket.off('roomId');
    this.socket.off('Join the game');
    this.socket.off('quiz created');
    this.socket.off('quiz');
    this.socket.off('joinedRoom');
    this.socket.off('startGame');
    // this.socket.off('showResults');
  }


}
