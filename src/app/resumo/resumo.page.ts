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
import { LoginServiceService, User } from '../services/login-service.service';

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
  idUser = sessionStorage.getItem('idUser')
  adm = sessionStorage.getItem('adm')
  contadorLiberar = 0
  constructor(public router: Router, private provider: ResumoService, private providerSala : SalaAulaService,
    public toastController: ToastController, public routeres : ActivatedRoute, 
    private alertController : AlertController, private providerUser : LoginServiceService) { }

  ngOnInit() { 
    
    this.providerSala.getByFilter(this.idSala).subscribe(res => {
      this.sala = res
      console.log(this.sala)
    })   
    this.provider.getAll().subscribe(res => {
      this.todos = res.filter(x => x.idSala == this.idSala && (x.tipo == "p" || x.criador == this.idUser)).sort((a, b) => {
        if(a == b){
          return 0
        }
        return (a < b ? -1 : 1)
      })
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
    this.router.navigate(['resumo-insert', this.idSala])
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
            }
          }
        ]
      });
  
      await alert.present();
                   
  }

  async pedirAumentarPermissao(){
    const toast = await this.toastController.create({
      message: 'Solicitação feita com sucesso. Aguarde a aprovação do administrador.',
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
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: "Você deseja solicitar nova permissão?",
      buttons: [
         {
          text: 'Sim',
          handler: () => {
            
            if(this.sala.solicitacao == undefined){
              this.sala.solicitacao = [this.idUser]
            }
            else if(this.sala.solicitacao.find(x => x == this.idUser)){
              
              toast.message = "Voce ja solicitou permissão"
              toast.present()
              return true
            }
            else if(this.sala.monitores && this.sala.monitores.find(x => x == this.idUser)){
              
              toast.message = "Voce já é monitor da sala"
              toast.present()
              return true
              
            }
            else{
              
              this.sala.solicitacao.push(this.idUser)
            }
            
            this.providerSala.update(this.idSala, this.sala).then(res => {
              toast.present()
            })
          }
        },
        {
          text: 'Não',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    if(this.adm == "sim"){
      this.aprovar()
    }
    else{
      await alert.present()
    }
    
  }

  async aprovar(){
    const toast = await this.toastController.create({
      message: 'Usuário promovido.',
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
    let lista : User
    
    const alert = await this.alertController.create({
      header: 'Usuários pra aprovar'
    });
    await this.providerUser.getByFilter(this.sala.solicitacao[this.contadorLiberar]).subscribe(res => {
      lista = res
      alert.message = lista.nome
      if(this.sala.solicitacao.length > 1 ){
        alert.buttons = [{
          text: 'Sim',
          handler: () => {
            if(this.sala.monitores == undefined){
              this.sala.monitores = [this.sala.solicitacao[this.contadorLiberar]]
            }
            else{
              this.sala.monitores.push(this.sala.solicitacao[this.contadorLiberar])
            }
            this.sala.solicitacao.splice(this.contadorLiberar, 1)

            this.providerSala.update(this.idSala, this.sala).then(res => {
              toast.present()
            })
          }
        },
        {
          text: 'Não',
          handler: () => {
            this.sala.solicitacao.splice(this.contadorLiberar, 1)
            this.providerSala.update(this.idSala, this.sala).then(res => {
              toast.message = "Permissão negada"
              toast.present()
            })
          }
        },{
          text: 'Próximo',
          handler: () => {
            this.aumentarContador()
            this.mudarUsuario(alert)
            return false
          }
        }]
      }
      else{
        alert.buttons = [{
          text: 'Sim',
          handler: () => {
            if(this.sala.monitores == undefined){
              this.sala.monitores = [this.sala.solicitacao[this.contadorLiberar]]
            }
            else{
              this.sala.monitores.push(this.sala.solicitacao[this.contadorLiberar])
            }
            this.sala.solicitacao.splice(this.contadorLiberar, 1)

            this.providerSala.update(this.idSala, this.sala).then(res => {
              toast.present()
            })
          }
        },
        {
          text: 'Não',
          handler: () => {
            this.sala.solicitacao.splice(this.contadorLiberar, 1)
            
            this.providerSala.update(this.idSala, this.sala).then(res => {
              toast.message = "Permissão negada"
              toast.present()
            })
          }
        }]
      }
      alert.present()
    })
    
  }

  mudarUsuario(alert){
    this.providerUser.getByFilter(this.sala.solicitacao[this.contadorLiberar]).subscribe(res => {
      alert.message = res.nome
      alert.present()
    })
  }

  aumentarContador(){
    if(this.sala.solicitacao.length == this.contadorLiberar + 1){
      this.contadorLiberar = 0
    }
    else{
      this.contadorLiberar++
    }
  }
}
