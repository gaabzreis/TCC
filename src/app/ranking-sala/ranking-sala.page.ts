import { Component, OnInit } from '@angular/core';
import { sala, SalaAulaService } from '../services/sala-aula.service';
import { User, LoginServiceService } from '../services/login-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ranking-sala',
  templateUrl: './ranking-sala.page.html',
  styleUrls: ['./ranking-sala.page.scss'],
})
export class RankingSalaPage implements OnInit {
  idSala = this.route.snapshot.params['sala-aula']
  usuariosSalas: sala
  usuarios : User[] = []
  constructor(private provider: SalaAulaService, private route: ActivatedRoute, private userProvider : LoginServiceService) { }

  ngOnInit() {
    this.provider.getByFilter(this.idSala).subscribe(res => {
      this.usuariosSalas = res
      let users = this.usuariosSalas.integrantes

      users = users.sort((a, b) => {
        if(a.pontos == b.pontos){
          return 0
        }
        return (a.pontos < b.pontos ? 1 : -1)
      })
      
      this.montarRanking(users)
      
    })

  }

  montarRanking(users){
    for(let i = 0; i < users.length; i++){
      this.userProvider.getByFilter(users[i].idIntegrante).subscribe(res => {
        res.pontos = users[i].pontos
        this.usuarios.push(res)
      })

    }
    
  }

}
