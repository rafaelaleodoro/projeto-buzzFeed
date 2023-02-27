import { Component, OnInit } from '@angular/core';
import quizz from '../../../assets/data/quizz.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  perguntas: any;
  perguntasSelecionada: any;

  respostas: string[] = [];
  respostasSelecionada: string = '';

  perguntasIndice: number = 0;
  perguntasMaxima: number = 0;

  fim: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz) {
      this.fim = false;
      this.title = quizz.title;

      this.perguntas = quizz.perguntas;
      this.perguntasSelecionada = this.perguntas[this.perguntasIndice];

      this.perguntasIndice = 0;
      this.perguntasMaxima = this.perguntas.length;

    }
  }
  escolhaDoJogar(value: string) {
    this.respostas.push(value);
    this.proximaEtapa();
  }

  async proximaEtapa() {
    this.perguntasIndice += 1;

    if (this.perguntasMaxima > this.perguntasIndice) {
      this.perguntasSelecionada = this.perguntas[this.perguntasIndice];
    } else {
      const respostaFinal:string = await this.consultaDeResultado(this.respostas)
      this.fim = true;
      this.respostasSelecionada = quizz.resultado[respostaFinal as keyof typeof quizz.resultado];
    }
  }

  async consultaDeResultado(respostas: string[]) {
    const resultado = respostas.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })
    return resultado
  }
}
