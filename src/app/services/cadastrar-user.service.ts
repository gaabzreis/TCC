import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';


export interface User {
  id?: string;
  email: String;
  instituicao: String;
  curso: String;
  senha: String;
  login: String;
  nome: string

}

@Injectable({
  providedIn: 'root'
})

export class CadastrarUserService {
  private todosCollection: AngularFirestoreCollection<User>;
  private todos: Observable<User[]>;

  constructor(private db: AngularFirestore) { 
    this.todosCollection = db.collection<User>('users');
 
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

  addUser(todo: User) {
    return this.todosCollection.add(todo);
  }

  getByFilter(id) {
    return this.todosCollection.doc<User>(id).valueChanges();
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
}
