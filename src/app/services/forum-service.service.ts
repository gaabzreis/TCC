import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

export interface forum{
  id?: string;
  pergunta: string;
  criador: string;
  idSala: string;
  respostas?:[resp]
}
export interface resp{
  criador: string;
  resposta: string;
  likes: number;
  pessoasResponderam?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ForumServiceService {

  private todosCollection: AngularFirestoreCollection<forum>;
 
  private todos: Observable<forum[]>;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<forum>('forum');
 
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
    return this.todosCollection.doc<forum>(id).valueChanges();
  }
  addForum(todo: forum) {
    return this.todosCollection.add(todo);
  }

  updateForum(key: string, data: forum){
    return this.todosCollection.doc(key).update(data)
  }
}
