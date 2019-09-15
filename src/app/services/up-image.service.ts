import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {Pipe, PipeTransform} from '@angular/core';
import * as firebase from "firebase";


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
@Injectable({
  providedIn: 'root'
})
export class UpImageService {
  snapshot: Observable<any>;
  UploadedFileURL: Observable<string>;
  task: AngularFireUploadTask;
  constructor(private storage: AngularFireStorage, private database: AngularFirestore) { 
    
  }


  save(event){
    const file = event.item(0)
 
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
 
 
 
    let fileName = file.name;
 
    // The storage path
    const path = `tcc-images/${new Date().getTime()}_${file.name}`;
 
    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };
 
    //File reference
    const fileRef = this.storage.ref(path);
    
    // The main task
     this.storage.upload(path, file, { customMetadata }).then(res => {
      return path
     })
        // Get uploaded file storage path
      
    // Get file progress percentage
    /*this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    ) */
  }
}
