import { Component, OnInit } from '@angular/core';
import { ResumoService, Resumo } from './../services/resumo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, ActionSheetController, AlertController, Platform  } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router/';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as moment from "moment"; 

import { stringify } from '@angular/core/src/util';

import { LoginServiceService, User} from '../services/login-service.service'
import { sala, SalaAulaService} from '../services/sala-aula.service'

@Component({
  selector: 'app-resumo-insert',
  templateUrl: './resumo-insert.page.html',
  styleUrls: ['./resumo-insert.page.scss'],
})

export class ResumoInsertPage implements OnInit {
  tag: String = ""
  titulo: String = ""
  conteudo: String = ""
  data: String = ""
  idUser = sessionStorage.getItem('idUser')
  idSala = this.routeres.snapshot.params["sala-aula"]
  idResumo = sessionStorage.getItem('resumo')
  tipo : string = "p"
  criador: string = this.idUser
  blob: Blob
  usuario: User
  sala: sala
  

  constructor(
    private routeres: ActivatedRoute, 
    private provider: ResumoService, 
    private camera: Camera,
    public toastController: ToastController, 
    private rotas : Router, 
    private alert : AlertController,
    private afStorage: AngularFireStorage,
    private platform: Platform,
    private file: File,
    private userPorvider: LoginServiceService,
    private salaProvider: SalaAulaService) { }

  ngOnInit() {
    this.userPorvider.getByFilter(this.idUser).subscribe(res => {
      this.usuario = res
    })
    this.salaProvider.getByFilter(this.idSala).subscribe(res => {
      this.sala = res
    })
    if (this.idResumo != null) {
      

      this.provider.getByFilter(this.idResumo).subscribe(res => {
        this.tag = res.tag
        this.titulo = res.titulo
        this.data = res.data.split("/")[2] + "-" + res.data.split("/")[1] + "-" + res.data.split('/')[0]
        this.idSala = res.idSala
        this.conteudo = res.conteudo
        this.tipo = res.tipo
        this.criador = res.criador
      })
    }
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
    if(this.data == "" || this.conteudo == "" || this.titulo == "" || this.tag == ""){
      toast.message = "Preencha todos os campos corretamente"
      toast.present()
      return
    }
    if(this.data.indexOf("-") > -1){
      this.data = this.data.split('-')[2].substr(0,2) + "/"+ this.data.split('-')[1] + "/"+ this.data.split('-')[0]
    }

    let todo;
    if (this.idResumo != null) {
      todo = {
        conteudo: this.conteudo, titulo: this.titulo, data: this.data, 
        tag: this.tag, idSala: this.idSala, id: this.idResumo, tipo: this.tipo, criador: this.criador
      }
      this.provider.update(todo).then(() => {
        this.rotas.navigate(['menu-sala/resumo/', this.idSala])
        toast.present();
      })
    }
    else {
      todo = {
        conteudo: this.conteudo, titulo: this.titulo, data: this.data, tag: this.tag, 
        idSala: this.idSala, criador: this.criador, tipo: this.tipo
      };
      

      
      
      this.provider.addResumo(todo).then(() => {
        let usuarioSala = this.sala.integrantes.find(x => x.idIntegrante == this.idUser)
        
        if(this.usuario.pontos == undefined){
          this.usuario.pontos = 0
        }
        if(this.blob != undefined){
          if(this.tipo == "p"){
            usuarioSala.pontos += 10
            this.usuario.pontos += 10
          }
          
          this.uploadFoto(this.blob);
        }
        else{
          if(this.tipo == "p"){
            usuarioSala.pontos += 5
            this.usuario.pontos += 5
          }
        }
        console.log("TAG ->", this.tag)
        this.conteudo = ""
        this.titulo = ""
        this.data = ""
        this.tag = ""
        if(this.tipo == "p"){
          this.userPorvider.update(this.idUser, this.usuario)
          this.salaProvider.update(this.idSala, this.sala)
        }

        toast.present();
        this.rotas.navigate(['menu-sala/resumo/', this.idSala])
      })
    }


  }

  async help(){
    const alert = await this.alert.create({
      header: 'Ajuda',
      message: "Tags são as palavras chave do seu resumo! O título é demonstrado como título do resumo quando demonstrado seus resumos são abertos",
      buttons: [
        {
          text: 'Fechar',
          cssClass: "primary",
          role: "cancel",
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    });

    await alert.present();
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
