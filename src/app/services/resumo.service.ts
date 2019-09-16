import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
export interface Resumo {
  id? : string;
  data: String;
  conteudo: String;
  tag: String;
  titulo: String;
  idSala: string;
  tipo: string;
  criador: string;
  fotos?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ResumoService {
 // private PATH = 'resumo/';
 private todosCollection: AngularFirestoreCollection<Resumo>;
 
  private todos: Observable<Resumo[]>;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<Resumo>('resumo');
 
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
      map(actions  => {
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
    return this.todosCollection.doc<Resumo>(id).valueChanges();
  }
  addResumo(todo: Resumo) {
    return this.todosCollection.add(todo);
  }
  update(todo: Resumo){
    return this.todosCollection.doc(todo.id).update(todo)
  }
}
