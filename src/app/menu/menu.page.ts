import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
 
  pages = [
    {
      title: 'Disciplina - SO',
      url: 'menu/home',
      icon: 'home'
    },
    {
      title: 'Projetos disciplina',
      children: [
        {
          title: 'Resumos',
          url: '/menu/home',
          icon: 'book'
        },
        {
          title: 'Quiz',
          url: '/menu/quiz',
          icon: 'help'
        },
      ]
    }
   
  ];
 
  constructor() { }
 
  ngOnInit() {
  }
 
}