import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-sala',
  templateUrl: './menu-sala.page.html',
  styleUrls: ['./menu-sala.page.scss'],
})
export class MenuSalaPage implements OnInit {
  idSala = document.URL.split("/")[document.URL.split("/").length - 1]
  
  pages = [
    {
      title: 'Voltar',
      url: '../menu/sala-aula',
      icon: 'arrow-back'
    },
    {
      title: 'Resumos',
      url: '/menu-sala/resumo/' + this.idSala,
      icon: 'book'
    },
    {
      title: 'Quiz',
      url: '/menu-sala/quiz/' + this.idSala,
      icon: 'book'
    },
    {
      title: 'Forum',
      url: '#',
      icon: 'book'
    },
   
   
  ];
  constructor(private routeres : ActivatedRoute) { }

  ngOnInit() {
    console.log()
  }

}
