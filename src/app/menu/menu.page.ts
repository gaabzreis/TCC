import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  pages = [
    {
      title: 'Calendário',
      url: '/menu/calendar-home',
      icon: '../assets/menuHome.png'
    },
    {
      title: 'Salas de aula',
      url: '/menu/sala-aula',
      icon: '../assets/menuSalas.png'
    },
    {
      title: 'Kanban',
      url: '/menu/kanban',
      icon: '../assets/menuKanban.png'
    },
    {
      title: 'Ranking geral',
      url: '/menu/ranking-total',
      icon: 'podium'
    },
    {
      title: 'Perfil',
      url: '/menu/user-perfil',
      icon: '../assets/menuUserProfile.png'
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