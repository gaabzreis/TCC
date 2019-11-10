import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

export interface atividade {
  id?: string,
  idUser?: string,
  title: string,
  dateTime: string,
  disciplina: string,
  descricao: string
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private todosCollection: AngularFirestoreCollection<atividade>;
  private todasAtividades: Observable<atividade[]>;

  constructor(private db: AngularFirestore) { 
    this.todosCollection = db.collection<atividade>('atividade-calendario');
    this.todasAtividades = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addAtividadeCalendario(atividade: atividade) {
    atividade.idUser = sessionStorage.getItem('idUser');
    return this.todosCollection.add(atividade);
  }

  getAll() {
    this.todasAtividades = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.todasAtividades;
  }

  getByDay(date: Date) {
    return this.todosCollection.doc<atividade>(date.toISOString()).valueChanges();
  }

  update(key : string, data : atividade){
    return this.todosCollection.doc(key).update(data)
  }

}
