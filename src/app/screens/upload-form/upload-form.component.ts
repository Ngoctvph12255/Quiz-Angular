import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent implements OnInit {
  uploadFile: string = '';
  private basePath = '/uploads';
  constructor(private fireStorage: AngularFireStorage) {}

  ngOnInit(): void {}
  chooseFile(event: any) {
    let file = event.target.files[0];
    const filePath = `${this.basePath}/${file.name}`;
    const storageRef = this.fireStorage.ref(filePath);
    this.fireStorage
      .upload(filePath, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            console.log(downloadURL);
            this.uploadFile = downloadURL;
          });
        })
      )
      .subscribe();
  }
}
