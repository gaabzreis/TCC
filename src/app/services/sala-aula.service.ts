import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

export interface horariosAulas{
  diaSemana: string,
  horarioI: string,
  horarioF: string
}

export interface sala{
  id?: string,
  adm: string,
  descricao: string,
  universidade: string,
  sala: string,
  inicioAula: string,
  periodo: number,
  professor: string,
  qtdMeses: number,
  horariosAula: horariosAulas[]
  integrantes: string[]
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
