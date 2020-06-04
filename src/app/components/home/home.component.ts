import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser()
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logoutUser();
  }
}
