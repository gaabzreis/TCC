import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

export interface atividade {
  id?: string
  nome: string
  idDisciplina: string
  idUser: string
  dataEntrega: string
  descricao: string
  quadro: string
}

@Injectable({
  providedIn: 'root'
})
export class AtividadeKanbanService {

  private todosCollection: AngularFirestoreCollection<atividade>;
  private todasAtividades: Observable<atividade[]>;

  constructor(private db: AngularFirestore) { 
    this.todosCollection = db.collection<atividade>('atividade-kanban');
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

  addAtividadeKanban(atividade: atividade) {
    return this.todosCollection.add(atividade);
  }
  moverAtividade(idAtividade: string, quadroDestino: string){
    return this.todosCollection.doc(idAtividade).update({quadro: quadroDestino});
  }
  updateAtividade(atv: atividade){
    return this.todosCollection.doc(atv.id).update(atv);
  }
  deleteAtividade(idAtividade: string){
    return this.todosCollection.doc(idAtividade).delete()
  }

}
