import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  disabled = true;
  public loginForm: FormGroup;
  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this.loginForm.statusChanges.subscribe((status) => {
      this.disabled = status !== 'VALID';
    });
  }

  public login() {
    if (this.loginForm.status === 'VALID'){
      this.userService.loginUser(this.loginForm.value);
    }else{
      alert('Form does not valid');
    }
  }
}
