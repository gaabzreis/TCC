import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

export interface horariosAulas{
  diaSemana: String,
  horarioI: String,
  horarioF: String
}

export interface sala{
  id?: string,
  adm: String,
  descricao: String,
  universidade: String,
  sala: string,
  inicioAula: String,
  periodo: number,
  professor: String,
  qtdMeses: number,
  horariosAula: horariosAulas[]
  integrantes: String[]
}
@Injectable({
  providedIn: 'root'
})
export class SalaAulaService {

  private todosCollection: AngularFirestoreCollection<sala>;
 
  private todos: Observable<sala[]>;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<sala>('sala');
 
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
  getAll() {
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.todos;

  }
  getByFilter(id) {
    return this.todosCollection.doc<sala>(id).valueChanges();
  }
  addSala(todo: sala) {
    return this.todosCollection.add(todo);
  }
  update(key: string, data){
    return this.todosCollection.doc(key).update(data)
  }
  delete(key:string){
    return this.todosCollection.doc(key).delete()
  }
}
