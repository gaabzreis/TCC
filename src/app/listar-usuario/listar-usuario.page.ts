import { Component, OnInit } from '@angular/core';
import { sala, SalaAulaService } from '../services/sala-aula.service'
import { User, CadastrarUserService } from '../services/cadastrar-user.service'
import { ActivatedRoute } from '@angular/router/';
import { AlertController, ToastController } from '@ionic/angular/';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.page.html',
  styleUrls: ['./listar-usuario.page.scss'],
})
export class ListarUsuarioPage implements OnInit {
  idSala = this.route.snapshot.params["sala-aula"]
  users : User[]
  sala : sala
  constructor(private provider : SalaAulaService, private providerUser : CadastrarUserService,
  private route : ActivatedRoute, public alertController: AlertController, private toast : ToastController) { }

  ngOnInit() {
    this.provider.getByFilter(this.idSala).subscribe(res => {
      this.sala = res
      this.providerUser.getAll().subscribe(usersRet => {  
        let ids = res.integrantes
        this.users = []
        for(let i = 0; i < usersRet.length; i++){
          for(let j = 0; j < ids.length; j++){
            if(ids[j] == usersRet[i].id){
              this.users.push(usersRet[i])
            }
          }
        }
        console.log(this.users)
      })
    })
  }
  async excluirSala(obj){
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Tem certeza que deseja excluir o ' + obj.nome + " da sala de aula?",
      buttons: [
        {
          text: 'Sim',
          cssClass: 'secondary',
          handler: (action) => {
            this.remove(obj.id)
          }
        }, {
          text: 'Cancelar',
          cssClass: "primary",
          role: "cancel",
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    })
    alert.present()
  }

  async remove(id){
    const toast = await this.toast.create({
      message: 'Usuário excluido com sucesso!',
      duration: 5000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this.sala.integrantes = this.sala.integrantes.filter(x => x != id)
    this.provider.update(this.sala.id, this.sala).then(res => {
      toast.present()
    })
  }
}
