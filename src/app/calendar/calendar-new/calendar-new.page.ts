import { Component, OnInit } from '@angular/core';
import { atividade, CalendarioService } from '../../services/calendario.service'
import { sala, SalaAulaService } from '../../services/sala-aula.service'
import { Config, ConfigUserService } from '../../services/config-user.service'
import { ToastController, ModalController, Platform } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-new',
  templateUrl: './calendar-new.page.html',
  styleUrls: ['./calendar-new.page.scss'],
})
export class CalendarNewPage implements OnInit {
  titulo : string = ""
  descricao: string = ""
  dataEntrega : string = ""  
  salaEdicao = false
  todasSalas : sala[]
  idUser = sessionStorage.getItem('idUser')
  salaSelecionada : string = ""
  atividade: atividade
  config : Config
  id : string
  constructor(private provider : CalendarioService,
              private toastController : ToastController,
              private salaProvider : SalaAulaService,
              private configProvider : ConfigUserService,
              private modalController : ModalController,
              private localnotification : LocalNotifications,
              private plt : Platform,
              private activatedRoute: ActivatedRoute) { 
                this.plt.ready().then(() => {
                  this.localnotification.on('click').subscribe(res => {
                    let msg = res.data ? res.data.mydata : '';
                  })
                  this.localnotification.on('trigger').subscribe(res => {
                    let msg = res.data ? res.data.mydata : '';
                  })
                })

              }

  ngOnInit() {
    
    this.salaProvider.getAll().subscribe(res => {
      this.todasSalas = res.filter(x => {
        return (x.adm == this.idUser || (x.integrantes.find(y => y.idIntegrante == this.idUser)))
      })
      if(this.id != undefined){
        this.salaEdicao = true
      }
    })
  }

 

  async salvar(){
    const toast = await this.toastController.create({
      message: 'Atividade salva com sucesso.',
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

    if(this.titulo == "" || this.dataEntrega == "" || this.descricao == "" || this.salaSelecionada == ""){
      toast.message = "Por favor, preencha todos os campos"
      toast.present()
    }
    else{
      let dataFinalEntrega = new Date(this.dataEntrega)
      if(dataFinalEntrega <= new Date()){
        toast.message = "Data de entrega deve ser depois que hoje"
        toast.present()
      }
      else{
        this.atividade = {
          idUser : this.idUser,
          dateTime: this.dataEntrega,
          descricao: this.descricao,
          title: this.titulo,
          disciplina: this.salaSelecionada
        }
        if(!this.salaEdicao){
          this.provider.addAtividadeCalendario(this.atividade).then(res => {
            toast.message = "Atividade salva com sucesso!"
            toast.present()
            this.configProvider.getAll().subscribe(ret => {
              let config = ret.filter(x => x.idUser == this.idUser)
              this.config = config[0]
              let Texto = new Date(this.dataEntrega)
              Texto.setDate(Texto.getDate() - parseInt(this.config.qtdDias.toString()))
              let stringCodificada = ("00" + Texto.getDate()).slice(-2) + "/" + ("00" + (Texto.getMonth() + 1)).slice(-2)
              this.localnotification.schedule({
                id: 1,
                title: this.titulo,
                text: "Atividade para entregar dia " + stringCodificada,
                trigger: {
                  at: new Date(this.dataEntrega)
                }
              })
            })
            
            this.modalController.dismiss();
          })
        }else{
          this.provider.update(this.id, this.atividade).then(res => {
            toast.message = "Atividade editada com sucesso!"
            toast.present()
            this.configProvider.getAll().subscribe(ret => {
              let config = ret.filter(x => x.idUser == this.idUser)
              this.config = config[0]
              let Texto = new Date(this.dataEntrega)
              Texto.setDate(Texto.getDate() - parseInt(this.config.qtdDias.toString()))
              let stringCodificada = ("00" + Texto.getDate()).slice(-2) + "/" + ("00" + (Texto.getMonth() + 1)).slice(-2)
              this.localnotification.schedule({
                id: 1,
                title: this.titulo,
                text: "Atividade para entregar dia " + stringCodificada,
                trigger: {
                  at: new Date(this.dataEntrega)
                }
              })
            })
            
            this.modalController.dismiss();
          })
        }
        
      }
    }
  }

  fecharModal() {
    this.modalController.dismiss();
  }

}
