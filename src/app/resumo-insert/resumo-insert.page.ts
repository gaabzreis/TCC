import { Component, OnInit } from '@angular/core';
import { ResumoService, Resumo } from './../services/resumo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router/';

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
  idSala = this.routeres.snapshot.params["sala-aula"]
  idResumo = sessionStorage.getItem('resumo')
  constructor(private routeres: ActivatedRoute, private provider: ResumoService, private camera: Camera,public toastController: ToastController) { }

  ngOnInit() {
  }
  async salvar(){
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
    this.data = this.data.split('-')[2].substr(0,2) + "/"+ this.data.split('-')[1] + "/"+ this.data.split('-')[0]
    console.log(this.data)
    let todo = {
      conteudo: this.conteudo, titulo: this.titulo, data: this.data, tag: this.tag, idSala: this.idSala
    };
    console.log(todo)
    this.provider.addResumo(todo).then(() => {
     
      toast.present();
    })
  }

  acessarCamera(){
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

}
