import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { CalendarioService, atividade } from '../../services/calendario.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { sala, SalaAulaService } from '../../services/sala-aula.service';
import undefined = require('firebase/empty-import');
import { ModalController } from '@ionic/angular';
import { CalendarNewPage } from '../calendar-new/calendar-new.page'

@Component({
  selector: 'app-calendar-home',
  templateUrl: './calendar-home.page.html',
  styleUrls: ['./calendar-home.page.scss'],
})
export class CalendarHomePage implements OnInit {

  eventSource = [];
  atvSource = [];
  atividade: atividade;
  mesSelecionado: string;
  anoSelecionado: string;
  idUser = sessionStorage.getItem('idUser')
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    noEventsLabel: 'Nenhuma atividade',
    allDayLabel: ''
  };

  constructor (
    private db: AngularFireStorage,
    private providerCalendar: CalendarioService,
    private statusBar: StatusBar,
    private salaProvider : SalaAulaService,
    private modalController : ModalController) { }

  ngOnInit() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#ffffff');

  }

  async addNewEvent () {
    
    // this.atividade = {
    //   title: 'TESTE - Paulo',
    //   dateTime: new Date(),
    //   disciplina: 'Banco de Dados'
    // };
    const modal = await this.modalController.create({
      component: CalendarNewPage
    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data['data']; 
    });

    return await modal.present();
  }

  onViewTitleChanged = (title: string) => {
    let newTitle = title.split(' ');
    this.mesSelecionado = newTitle[0].toUpperCase();
    this.anoSelecionado = newTitle[1];
  };

  onEventSelected(event) {
    console.log('evento selecionado:' + event.startTime + ' - ' + event.title);
  }

  onTimeSelected(ev) {
    //console.log(ev);
  }

  onCurrentDateChanged(event: Date) {
    this.eventSource = []
    this.atvSource = []
    this.salaProvider.getAll().subscribe(res => {
      let salas = res.filter(x => (x.integrantes.find(y => y.idIntegrante == this.idUser)) || x.adm == this.idUser)
      
      let dataClicada = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2)
      let dataLimite = salas.map(x => {
        let a = new Date(x.inicioAula)
        a.setMonth(a.getMonth() + parseInt(x.qtdMeses.toString()))
        return {...x, dt_limite: a}
      })
      let salasData = dataLimite.filter(x => {
        let inicio = new Date(x.inicioAula)
        let fim = x.dt_limite
        if(event >= inicio && event <= fim){
          let dia = ""
          if(event.getDay() == 0)
            dia = "dom"
          else if(event.getDay() == 1)
            dia = "seg"
          else if(event.getDay() == 2)
            dia = "ter"
          else if(event.getDay() == 3)
            dia = "qua"
          else if(event.getDay() == 4)
            dia = "qui"
          else if(event.getDay() == 5)
            dia = "sex"
          else if(event.getDay() == 6)
            dia = "sab"
          
            let retorno = x.horariosAula.find(y => {
              return y.diaSemana == dia
            })
          if(retorno != undefined){
            return retorno
          }
        }
        
      })
      salasData.forEach((x) => {
        this.eventSource.push({
          title: x.descricao,
          disciplina: x.professor
        })
      })
      

    })

    this.providerCalendar.getAll().subscribe( res => {
      let atv = res.filter(x => x.idUser == this.idUser)

      let diaAtv = atv.filter(x => new Date(x.dateTime).getUTCDate() == event.getUTCDate())
      diaAtv.forEach((x) => {
        this.atvSource.push({
          title: x.title,
          descricao: x.descricao
        })
      })
    })
  }

  onRangeChanged = (ev: { startTime: Date, endTime: Date }) => {
    
};

}
