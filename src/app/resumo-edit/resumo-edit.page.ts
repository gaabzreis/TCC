import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { ResumoService } from './../resumo.service';


export interface Todo {
  id?: string;
  task: string;
  priority: number;
  createdAt: number;
}

@Component({
  selector: 'app-resumo-edit',
  templateUrl: './resumo-edit.page.html',
  styleUrls: ['./resumo-edit.page.scss'],
})


export class ResumoEditPage implements OnInit {
  todo: Todo = {
    task: 'test',
    createdAt: new Date().getTime(),
    priority: 2
  };
  todoId: String
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
      console.log(this.todo)
    });
  }

}
