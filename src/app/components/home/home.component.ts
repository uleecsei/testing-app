<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser()
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logoutUser();
  }
}
||||||| merged common ancestors
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logoutUser();
  }
}
=======
import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ProfilePictureService } from 'src/app/services/profile-picture/profile-picture.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  selectedFile: File = null;

  constructor(
    private userService: UserService,
    private profilePictureService: ProfilePictureService,
    private flash: MessagesService,
    public dialog: MatDialog,
    private router: Router
    ) {
      this.user = this.userService.getUser();
    }

  ngOnInit(): void {
  }

  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPhoto, {
      width: '450px',
      data: this.selectedFile
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.onUpload();
      } else {
        return;
      }
    });
  }

  private onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.profilePictureService.postHttp(fd).subscribe(
      (response) => {
        this.flash.showSuccess(response.status);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.flash.showError(error.message ? error.message : error);
        this.router.navigate(['/home']);
      }
    )
  }

  logout() {
    this.userService.logoutUser();
  }
}

@Component({
  selector: 'dialog-photo',
  templateUrl: 'dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.scss']
})
export class DialogPhoto {
  imageSrc = null;

  constructor(
    public dialogRef: MatDialogRef<DialogPhoto>,
    @Inject(MAT_DIALOG_DATA) public data: File) {
      this.showImage();      
    }

  showImage() {
    var reader  = new FileReader();

    reader.onloadend = () => {
      this.imageSrc = reader.result;
    };
  
    if (this.data) {
      reader.readAsDataURL(this.data);
    } else {
      this.imageSrc = "";
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
>>>>>>> 7b0dbc0c011c4374a6dad2cf8cfb210cf26fdbd9
