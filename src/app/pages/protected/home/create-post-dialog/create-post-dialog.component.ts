import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../../../core/_service/protected/posts.service";
import {EnumPostType, PostRequest} from "../../../../core/_dataTypes/postRequest";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss']
})
export class CreatePostDialogComponent implements OnInit {
  isChecked: boolean = false;

  addPostForm: FormGroup = new FormGroup({
    message: new FormControl('',
      [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)]
    ),
    announcement: new FormControl('')
  });

  isAdmin: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: boolean,
              public dialogRef: MatDialogRef<CreatePostDialogComponent>,
              private postService: PostsService,
              private _snackBar: MatSnackBar) {
    this.isAdmin = data;
  }

  ngOnInit(): void {
  }

  createPost() {
    if (!this.addPostForm.valid) return;

    let message: string = this.addPostForm.controls['message'].value;
    let postType: EnumPostType = EnumPostType.NORMAL;
    let responseMsg: string = 'Post';
    if (this.isChecked) {
      postType = EnumPostType.ANNOUNCEMENT;
      responseMsg = 'Announcement';
    }
    let request: PostRequest = new PostRequest(message, postType);
    this.postService.createPost(request).then(() => {
      this._snackBar.open(responseMsg + ' created', 'OK', {duration: 2000});
      this.dialogRef.close(true);
    })
  }

}



