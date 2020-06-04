import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ProfilePictureService } from 'src/app/services/profile-picture/profile-picture.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedFile: File = null;


  constructor(
    private userService: UserService,
    private profilePictureService: ProfilePictureService,
    private flash: MessagesService,
    public dialog: MatDialog,
    private router: Router
    ) {}

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
      
      // data.arrayBuffer().then(
      //   result => {
      //     const b64 = new Buffer(result).toString('base64');
      //     this.imageSrc = "data:image/png;base64," + b64;
      //   }
      // )
      // this.imageSrc = "data:image/png;base64," + data;
      
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
