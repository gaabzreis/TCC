import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
export interface Quiz {
  id?: string;
  titulo: String;
  pergunta: String;
  tag: String;
  respostas: Resposta[];
  criador: string;
  idSala: string;
  likes?: number;
  liker?: string[];
}

export interface Resposta{
  descricao: String;
  acerto: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
 // private PATH = 'resumo/';
 private todosCollection: AngularFirestoreCollection<Quiz>;
 
  private todos: Observable<Quiz[]>;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<Quiz>('quiz');
 
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
    return this.todosCollection.doc<Quiz>(id).valueChanges();
  }
  addQuiz(todo: Quiz) {
    return this.todosCollection.add(todo);
  }
  update(key : string, obj : Quiz){
    return this.todosCollection.doc(key).update(obj)
  }
  delete(key : string){
    return this.todosCollection.doc(key).delete()
  }
}
