import { ResumoService, Resumo } from './../services/resumo.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { map } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router/';
import {sala, SalaAulaService} from '../services/sala-aula.service';
import * as qrcode from 'qrcode-generator';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
})
export class ResumoPage implements OnInit {
  todos: Resumo[];
  dia: any[];
  sala: sala
  encodeData: string;
  encodedData: any;
  scannedData: {};
  idSala = this.routeres.snapshot.params["sala-aula"]
  busca: Resumo[]
  backup: any[]
  elQrCode : string
  constructor(public router: Router, private provider: ResumoService, private providerSala : SalaAulaService,
    public toastController: ToastController, public routeres : ActivatedRoute, private alertController : AlertController) { }

  ngOnInit() { 
    this.providerSala.getByFilter(this.idSala).subscribe(res => {
      this.sala = res
    })   
    this.provider.getAll().subscribe(res => {
      this.todos = res.filter(x => x.idSala == this.idSala)
      this.dia = this.todos.reduce((prev, current) => {
        
        if (!prev.find(x => x.data === current.data)) {
          return [
            ...prev,
            {
              data: current.data,
              mensagens: [
                {
                  id: current.id,
                  tag: current.tag,
                },
              ],
            },
          ]
        }

        return prev.map(x => {

          if (x.data !== current.data) {
            return x
          }

          return {
            data: x.data,
            mensagens: [
              ...x.mensagens,
              {
                id: current.id,
                tag: current.tag,
              },
            ]
          }

        })

      }, [])
      
      
      this.backup = this.dia
    })
     

    
  }

  addNovo(){
    sessionStorage.removeItem('resumo')
  }
  newContact() {
    sessionStorage.removeItem('resumo')
    this.router.navigate(['/resumo-edit']);
  }

  editContact(contact: any) {
    // Maneira 1
    this.router.navigate(['/home']);

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  pesquisar(ev){
    if(ev.target.value == ""){
      this.ngOnInit()
      
    }
    else{
      console.log(this.backup)
      
      for(let i = 0; i < this.backup.length; i++){
        this.dia[i].mensagens = this.backup[i].mensagens.filter(y => y.tag.indexOf(ev.target.value) > -1)
      }
    }
    
  }
  async encodedText(){
      let teste = qrcode(0, "H")
      teste.addData(this.idSala)
      teste.make()
      this.elQrCode = teste.createImgTag(10)

      const alert = await this.alertController.create({
        header: 'Qr Code',
        message: this.elQrCode,
        buttons: [
           {
            text: 'Fechar',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
                   
  }
}
