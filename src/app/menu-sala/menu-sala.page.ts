import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-sala',
  templateUrl: './menu-sala.page.html',
  styleUrls: ['./menu-sala.page.scss'],
})
export class MenuSalaPage implements OnInit {
  idSala = document.URL.split("/")[document.URL.split("/").length - 1]
  idAdm = sessionStorage.getItem('adm')
  

  pages = [
    {
      title: 'Resumos',
      url: '/menu-sala/resumo/' + this.idSala,
      icon: 'book'
    },
    {
      title: 'Quiz',
      url: '/menu-sala/quiz/' + this.idSala,
      icon: 'help'
    },
    {
      title: 'Forum',
      url: '/menu-sala/forum/' + this.idSala,
      icon: 'chatboxes'
    },
    {
      title: 'Ranking',
      url: '/menu-sala/ranking-sala/' + this.idSala,
      icon: 'podium'
    },
   
   
  ];
  
  constructor(private routeres : ActivatedRoute) { 
    console.log(this.idAdm)
    if(this.idAdm == "sim"){
      this.pages.push({
        title: "Usuários inscritos",
        url: '/menu-sala/listar-usuario/' + this.idSala,
        icon: 'person'
      })
    }
  }

  ngOnInit() {
    console.log("menu da sala")
  }

}
