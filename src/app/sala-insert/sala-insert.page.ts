import { Component, OnInit } from '@angular/core';
import {sala, horariosAulas,SalaAulaService} from '../services/sala-aula.service'
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-sala-insert',
  templateUrl: './sala-insert.page.html',
  styleUrls: ['./sala-insert.page.scss'],
})
export class SalaInsertPage implements OnInit {
  contador = 1
  adm = sessionStorage.getItem('idUser')
  descricao: string
  universidade: string
  inicioAula: string
  periodo: number
  professor: string
  qtdMeses: number
  sala: string
  valores : Number[] = [1]
  horarios : horariosAulas[] = [{
    diaSemana: "",
    horarioI: "",
    horarioF: ""
  }]
  salaEdicao: sala
  constructor(private provider: SalaAulaService, public toastController: ToastController, 
    public router :ActivatedRoute, public rout : Router) { }

  ngOnInit() {
    let id = this.router.snapshot.params["sala-aula"]
    console.log(id)
    if(id != undefined){
      this.provider.getByFilter(id).subscribe(res => {
        this.salaEdicao = res
        this.descricao = this.salaEdicao.descricao
        this.universidade = this.salaEdicao.universidade
        this.inicioAula = this.salaEdicao.inicioAula
        this.periodo = this.salaEdicao.periodo
        this.professor = this.salaEdicao.professor
        this.qtdMeses = this.salaEdicao.qtdMeses
        this.sala = this.salaEdicao.sala
        this.horarios = this.salaEdicao.horariosAula
        this.salaEdicao.id = id
        this.valores = []
        this.horarios.forEach((x, index) => {
          console.log(index)
          
          this.valores.push(index + 1)
          this.contador = index + 1
        })
        console.log(this.horarios)
      })
    }
  }

  addPoint(){
    this.contador++
    if(this.horarios == undefined){
      this.horarios = [{
        diaSemana: "",
        horarioI: "",
        horarioF: ""
      }]
    }
    else{
      this.horarios = [...this.horarios, {
        diaSemana: "",
        horarioI: "",
        horarioF: ""
      }]
    }
    if(this.valores == undefined){
      this.valores = [this.contador]
    }
    else{
      this.valores = [...this.valores, this.contador]
    }
    console.log(this.valores)
  }

  removePoint(){
    if(this.contador < 1){
      return
    }
    this.horarios = this.horarios.reduce((prev, atual, index) => {
      if(index == this.contador - 1){
        return [...prev]
      }
      return [...prev, atual]
    }, [])
    
    this.valores = this.valores.reduce((prev, atual) => {
      if(atual == this.contador){
        return [...prev]
      }
      return [...prev, atual]
    }, [])
    this.contador--
  }

  async salvar(){
    let valid = 1
    const toast = await this.toastController.create({
      duration: 5000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    if(this.descricao == "" || this.universidade == "" || this.inicioAula == "" || this.periodo == 0 
    || this.professor == "" || this.qtdMeses == 0 || this.sala == ""){
      toast.message = "Por favor, preencha todos os campos"
      toast.present()
      valid = 0
    }

    if(isNaN(this.periodo) || isNaN(this.qtdMeses)){
      toast.message = "Por favor, os campos de periodo e qtd de meses devem ser numéricos"
      toast.present()
      valid = 0
    }
    else if(this.qtdMeses <= 0 ){
      toast.message = "A quantidade de meses deve ser maior que 1"
      toast.present()
      valid = 0
    }
    if(this.horarios.length == 0){
      toast.message = "Por favor, insira ao menos um dia de aula"
      toast.present()
      valid = 0
    }

    if(this.horarios.find(x => x.diaSemana == "" || x.horarioF == "" || x.horarioI == "")){
      toast.message = "Por favor, preencha todos os campos de hora"
      toast.present()
      valid = 0
    }
    else if(this.horarios.find(x => x.horarioI >= x.horarioF)){
      toast.message = "O horário fim deve ser maior que o horário inicio da aula"
      toast.present()
      valid = 0
    }
    
    if(valid == 1){
      if(this.salaEdicao != undefined){
        this.horarios = this.horarios.map(x => {
          if(x.horarioI.split("T").length == 1){
            return {diaSemana: x.diaSemana, horarioF: x.horarioF, horarioI: x.horarioI}
          }
          let horarioI = x.horarioI.split("T")[1].split(":")
          let horarioF = x.horarioF.split("T")[1].split(":")
          return {diaSemana: x.diaSemana, horarioI: horarioI[0] + ":" + horarioI[1],
           horarioF: horarioF[0] + ":" + horarioF[1]}
        })
        console.log(this.horarios)
        this.salaEdicao.adm = this.adm
        this.salaEdicao.descricao = this.descricao
        this.salaEdicao.sala = this.sala
        this.salaEdicao.universidade = this.universidade
        this.salaEdicao.inicioAula = this.inicioAula
        this.salaEdicao.periodo = this.periodo
        this.salaEdicao.professor = this.professor
        this.salaEdicao.qtdMeses = this.qtdMeses
        this.salaEdicao.horariosAula = this.horarios
        this.provider.update(this.salaEdicao.id, this.salaEdicao).then(res => {
            toast.message = 'Sala de aula editado com sucesso.'
            toast.present();
            this.rout.navigate(["menu/sala-aula"])
        })
      }
      else{
        this.horarios = this.horarios.map(x => {
          let horarioI = x.horarioI.split("T")[1].split(":")
          let horarioF = x.horarioF.split("T")[1].split(":")
          return {diaSemana: x.diaSemana, horarioI: horarioI[0] + ":" + horarioI[1],
           horarioF: horarioF[0] + ":" + horarioF[1]}
        })
  
        let conteudo : sala = {
          adm: this.adm,
          descricao: this.descricao,
          sala: this.sala,
          universidade: this.universidade,
          inicioAula: this.inicioAula,
          periodo: this.periodo,
          professor: this.professor,
          qtdMeses: this.qtdMeses,
          horariosAula: this.horarios,
          integrantes: [],
          monitores: [],
          solicitacao: []
        }
        
        
        this.provider.addSala(conteudo).then(() => {
          toast.message = 'Sala de aula criado com sucesso.'
          toast.present();
          this.rout.navigate(["menu/sala-aula"])
        })
      }
      
  
      
    }

    
  }
}
