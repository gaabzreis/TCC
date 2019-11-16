import { Component, OnInit } from '@angular/core';
import { sala, SalaAulaService } from '../services/sala-aula.service';
import { User, LoginServiceService } from '../services/login-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ranking-total',
  templateUrl: './ranking-total.page.html',
  styleUrls: ['./ranking-total.page.scss'],
})
export class RankingTotalPage implements OnInit {
  idUser = sessionStorage.getItem('idUser')
  usuariosSalas: sala
  usuarios : User[] = []
  diferenca : number
  constructor(private provider: SalaAulaService, private route: ActivatedRoute, private userProvider : LoginServiceService) { }

  ngOnInit() {
    this.userProvider.getAll().subscribe(res => {
      this.usuarios = res
     

      this.usuarios = this.usuarios.sort((a, b) => {
        if(a.pontos == b.pontos){
          return 0
        }
        else if(a.pontos == undefined){
          return 1
        }
        else if(b.pontos == undefined){
          return -1
        }
        return (a.pontos < b.pontos ? 1 : -1)
      })
      
      let pontosUser = this.usuarios.filter(x => x.id == this.idUser)
      let pontosUlt = this.usuarios[2]

      if(pontosUlt.pontos == undefined){
        pontosUlt.pontos = 0
      }
      this.diferenca = pontosUser[0].pontos - pontosUlt.pontos
    })

  }


}
