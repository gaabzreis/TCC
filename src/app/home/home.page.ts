import { ResumoService } from './../services/resumo.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { map } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';

export interface Resumo {
  id? : String;
  data: String;
  conteudo: String;
  tag: String;
  titulo: String
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  todos: Resumo[];
  dia: {};

  constructor(public router: Router, private provider: ResumoService, public toastController: ToastController) {
  }

  ngOnInit() {    
   /* this.provider.getAll().subscribe(res => {
      this.todos = res
      this.dia = this.todos.reduce((prev, current) => {
        
        if (!prev.find(x => x.data === current.data)) {
          return [
            ...prev,
            {
              data: current.data,
              mensagens: [
                {
                  id: current.id,
                  tag: current.tag,
                },
              ],
            },
          ]
        }

        return prev.map(x => {

          if (x.data !== current.data) {
            return x
          }

          return {
            data: x.data,
            mensagens: [
              ...x.mensagens,
              {
                id: current.id,
                tag: current.tag,
              },
            ]
          }

        })

      }, [])
      console.log(this.dia)
      
      
    })
     

    
  }
  newContact() {
    this.router.navigate(['/resumo-edit']);
  }

  editContact(contact: any) {
    // Maneira 1
    this.router.navigate(['/home']);

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });*/
  } 

  calendar(){
    this.router.navigate(["calendar-home"]);
  }

}
