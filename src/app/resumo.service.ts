import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
export interface Todo {
  id?: string;
  task: string;
  priority: number;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResumoService {
 // private PATH = 'resumo/';
 private todosCollection: AngularFirestoreCollection<Todo>;
 
  private todos: Observable<Todo[]>;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<Todo>('resumo');
 
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
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
  addResumo(todo: Todo) {
    return this.todosCollection.add(todo);
  }
}
