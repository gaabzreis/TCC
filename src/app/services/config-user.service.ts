import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

export interface Config {
  id?: string;
  permite: string;
  qtdDias: number;
  idUser: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConfigUserService {

  private todosCollection: AngularFirestoreCollection<Config>;
  private todos: Observable<Config[]>;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<Config>('config');
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
    return this.todosCollection.doc<Config>(id).valueChanges();
  }
  addUser(todo: Config) {
    return this.todosCollection.add(todo);
  }
  update(key, data) {
    return this.todosCollection.doc(key).update(data)
  }
  getById(id) {
    let subscription;
    return new Promise((resolve, reject) => {
      subscription = this.todosCollection.doc<Config>(id)
        .valueChanges()
        .subscribe(observer => {
          resolve(observer)
        })
    })
  }
}
