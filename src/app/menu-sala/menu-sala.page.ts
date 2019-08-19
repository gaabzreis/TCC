import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sala',
  templateUrl: './menu-sala.page.html',
  styleUrls: ['./menu-sala.page.scss'],
})
export class MenuSalaPage implements OnInit {
  pages = [
    {
      title: 'Voltar',
      url: '../menu/sala-aula',
      icon: 'arrow-left'
    },
    {
      title: 'Salas de aula meczada',
      url: '/menu-sala/sala-aula',
      icon: 'book'
    },
   
   
  ];
  constructor() { }

  ngOnInit() {
  }

}
