import { Component, OnInit } from '@angular/core';
import { ResumoService, Resumo } from './../services/resumo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router/';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as moment from "moment"; 

@Component({
  selector: 'app-resumo-insert',
  templateUrl: './resumo-insert.page.html',
  styleUrls: ['./resumo-insert.page.scss'],
})

export class ResumoInsertPage implements OnInit {
  tag: String
  titulo: String
  conteudo: String
  data: String
  idUser = sessionStorage.getItem('idUser')
  idSala = this.routeres.snapshot.params["sala-aula"]
  idResumo = sessionStorage.getItem('resumo')
  tipo: string
  blob: Blob

  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;

  constructor(private routeres: ActivatedRoute, private provider: ResumoService, private camera: Camera,
    public toastController: ToastController, private rotas: Router,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    if (this.idResumo != null) {
      this.provider.getByFilter(this.idResumo).subscribe(res => {
        this.tag = res.tag
        this.titulo = res.titulo
        this.data = res.data.split("/")[2] + "-" + res.data.split("/")[1] + "-" + res.data.split('/')[0]
        this.idSala = res.idSala
        this.conteudo = res.conteudo

      })
    }
  }
  async salvar() {
    console.log(this.tipo)
    const toast = await this.toastController.create({
      message: 'Resumo salvo com sucesso.',
      duration: 5000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    if (this.data.indexOf("-") > -1) {
      this.data = this.data.split('-')[2].substr(0, 2) + "/" + this.data.split('-')[1] + "/" + this.data.split('-')[0]
    }

    let todo;
    if (this.idResumo != null) {
      todo = {
        conteudo: this.conteudo, titulo: this.titulo, data: this.data, tag: this.tag, idSala: this.idSala, id: this.idResumo, tipo: this.tipo
      } 
      this.provider.update(todo).then(() => {
        this.rotas.navigate(['menu-sala/resumo/', this.idSala])
        toast.present();
      })
    }
    else {
      todo = {
        conteudo: this.conteudo, titulo: this.titulo, data: this.data, tag: this.tag, idSala: this.idSala, criador: this.idUser, tipo: this.tipo
      };
      this.uploadFoto(this.blob);
      this.provider.addResumo(todo).then(() => {
        this.conteudo = ""
        this.titulo = ""
        this.data = ""
        this.tag = ""
        toast.present();
      })
    }


  }

  acessarCamera_OLD() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image)
    }, (err) => {
      // Handle error
    });
  }

  // alteracoes-paulo
  async acessarCamera() {
    const optionsGallery: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    const optionsCamera: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };

    try {
      const fileURI: string = await this.camera.getPicture(optionsCamera);
      let file: string

      if (this.platform.is('ios')) {
        file = fileURI.split('/').pop();
      } else {
        file = fileURI.substring(fileURI.lastIndexOf('/') + 1, fileURI.indexOf('?'));
      }

      const path: string = fileURI.substring(0, fileURI.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      this.blob = new Blob([buffer], { type: 'image/jpeg' });

    } catch (error) {
      console.log(error);
    }
  }

  uploadFoto(blob: Blob) {
    const ref = this.afStorage.ref(
      this.tag + '.jpg');
      //this.idSala + '/' + this.tag + '/' + moment().format('YYYY-MM-DD-HH:mm') + '.jpg');
    ref.put(blob);
      //const task = ref.put(blob);

    //this.uploadPercent = task.percentageChanges();

    // task.snapshotChanges().pipe(finalize(() =>
    //   this.downloadURL = ref.getDownloadURL())
    // ).subscribe()
  }
  // fim-alteracoes-paulo

}
