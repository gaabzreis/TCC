import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { CalendarioService, atividade } from '../../services/calendario.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-calendar-home',
  templateUrl: './calendar-home.page.html',
  styleUrls: ['./calendar-home.page.scss'],
})
export class CalendarHomePage implements OnInit {

  eventSource = [];
  atividade: atividade;
  mesSelecionado: string;
  anoSelecionado: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    noEventsLabel: 'Nenhuma atividade',
    allDayLabel: ''
  };

  constructor (
    private db: AngularFireStorage,
    private providerCalendar: CalendarioService,
    private statusBar: StatusBar) { }

  ngOnInit() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#ffffff');

  }

  addNewEvent (atv: atividade) {
    // this.atividade = {
    //   title: 'TESTE - Paulo',
    //   dateTime: new Date(),
    //   disciplina: 'Banco de Dados'
    // };
    this.providerCalendar.addAtividadeCalendario(atv);
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
    console.log(ev);
  }

  onCurrentDateChanged(event: Date) {
    this.providerCalendar.getByDay(event).subscribe( ev => {
      //this.eventSource = ev;
    })
  }

  onRangeChanged = (ev: { startTime: Date, endTime: Date }) => {
    
};

}
