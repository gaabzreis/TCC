import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  pages = [
    {
      title: 'Home',
      url: '/menu/calendar-home',
      icon: 'home'
    },
    {
      title: 'Salas de aula',
      url: '/menu/sala-aula',
      icon: 'book'
    },
    {
      title: 'Kanban',
      url: '/menu/kanban',
      icon: 'list-box'
    },
    {
      title: 'Ranking geral',
      url: '/menu/ranking-total',
      icon: 'podium'
    },
    {
      title: 'Perfil',
      url: '/menu/user-perfil',
      icon: 'person'
    },
    {
      title: 'Sair',
      url: '../login',
      icon: 'log-out'
    }
  ];
 
  constructor() { }
 
  ngOnInit() {
    console.log("menu normal")
  }
 
}