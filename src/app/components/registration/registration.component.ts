import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  disabled = true;
  minLength = 6;
  public registrationForm: FormGroup;
  constructor(private userService: UserService) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLength)
      ]),
    });
  }

  ngOnInit(): void {
    this.registrationForm.statusChanges.subscribe((status) => {
      this.disabled = status !== 'VALID';
    });
  }

  public registration() {
    if (this.registrationForm.status === 'VALID'){
      this.userService.regUser(this.registrationForm.value);
    }else{
      alert('Form does not valid');
    }
  }
}
