import { Injectable } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(
    private flash: MessagesService,
    private userService: UserService
    ) {}

  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;

  private async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve function is the callback
    // passed to gapi.load
    const payload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi loaded
    // and that we can call gapi.init
    return payload.then(async () => {
      await gapi.auth2
        .init({ client_id: environment.googleClientId})
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  public async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        (user) => {
          this.userService.googleLoginUser(user.getAuthResponse().id_token)
        },
        (error) => {
          this.flash.showError(error.error.message);
        });
    });
  }
}
