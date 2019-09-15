import { Component, OnInit } from '@angular/core';
import { ResumoService, Resumo } from './../services/resumo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, ActionSheetController, AlertController  } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router/';

import { File } from '@ionic-native/file/ngx';
import { stringify } from '@angular/core/src/util';
import { database } from 'firebase';

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
  constructor(private routeres: ActivatedRoute, private provider: ResumoService, private camera: Camera,
    public toastController: ToastController, private rotas : Router, private alert : AlertController) { }

  ngOnInit() {
    if(this.idResumo != null){
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
    if(this.idResumo != null){
      todo = {
        conteudo: this.conteudo, titulo: this.titulo, data: this.data, 
        tag: this.tag, idSala: this.idSala, id: this.idResumo, tipo: this.tipo, criador: this.criador
      }
      this.provider.update(todo).then(() => {
        this.rotas.navigate(['menu-sala/resumo/', this.idSala])
        toast.present();
      })
    }
    else{
      todo = {
        conteudo: this.conteudo, titulo: this.titulo, data: this.data, tag: this.tag, 
        idSala: this.idSala, criador: this.criador, tipo: this.tipo
      };
      
      
     this.provider.addResumo(todo).then(() => {
        this.conteudo = ""
        this.titulo = ""
        this.data = ""
        this.tag = ""
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



}
