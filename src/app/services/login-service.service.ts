import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

export interface User{
  id?: string;
  curso: String;
  email: String;
  nome: string;
  senha: String;
  universidade: String;
  instituicao?: string;
  login: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
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
    return this.todosCollection.doc<User>(id).valueChanges();
  }
  addUser(todo: User) {
    return this.todosCollection.add(todo);
  }
  update(key, data){
    return this.todosCollection.doc(key).update(data)
  }
}
