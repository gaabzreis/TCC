import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { CalendarioService, atividade } from '../../services/calendario.service';

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
    private providerCalendar: CalendarioService) { }

  ngOnInit() {
    this.eventSource.push({
      title: 'Atividade_01',
      startTime: new Date(),
      endTime: new Date(),
      allDay: true
    },
    {
      title: 'Atividade_02',
      startTime: new Date(),
      endTime: new Date(),
      allDay: true
    });
  }

  addNewEvent () {
    this.atividade = {
      title: 'TESTE - Paulo',
      startTime: new Date(),
      endTime: new Date(),
      allDay: false
    };

    this.providerCalendar.addAtividadeCalendario(this.atividade);

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

  }

  onCurrentDateChanged(event: Date) {

  }

  onRangeChanged(ev) {

  }

}
