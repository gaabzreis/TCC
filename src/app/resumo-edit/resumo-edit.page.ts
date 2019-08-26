import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { ResumoService, Resumo } from './../services/resumo.service';


@Component({
  selector: 'app-resumo-edit',
  templateUrl: './resumo-edit.page.html',
  styleUrls: ['./resumo-edit.page.scss'],
})


export class ResumoEditPage implements OnInit {
  todo: Resumo 
  fotos: String[] = []
  todoId: string
  idUser = sessionStorage.getItem('idUser')
  constructor(private route: ActivatedRoute, private loadingController: LoadingController, private provider: ResumoService) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
    
    this.provider.getByFilter(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
      let randomValue = Math.floor(Math.random() * (10 - 1))
      for(let i = 0; i < randomValue; i++){
        this.fotos = [...this.fotos, ""]
      }
      console.log(this.todo)
    });
  }
  setarId(){
    sessionStorage.setItem('resumo', this.todoId)
  }
}
