import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { GoogleAuthService } from 'src/app/services/google-auth/google-auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  disabled = true;
  public loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private googleAuthService: GoogleAuthService
  ) {
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

  public login(): void {
    if (this.loginForm.status === 'VALID'){
      this.userService.loginUser(this.loginForm.value);
    } else {
      alert('Form does not valid');
    }
  }
  
  public googleAuthenticate(): void {
    this.googleAuthService.authenticate();
  }
}
