import { Modulo } from './../../core/_models/modulos.model';
import { CursoService } from './../../core/_services/curso.service';
import { MenuModel } from './../../core/_models/menu.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Conteudo } from 'src/app/core/_models/conteudos.model';
import { ProvaUsuario } from 'src/app/core/_models/provaUsuario.model';
import { ItemProvaUsuario } from 'src/app/core/_models/itemprovaUsuario.model';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {
  public nomeCurso = '';
  public menu: MenuModel[] = [];
  public conteudoSelecionado: Conteudo;
  public qtdProgresso: number = 0;
  public modulo: Modulo[];
  public idConteudoInicial: number;
  public idConteudoFinal: number;
  public checkboxValorSelecionado = {};
  public groupboxValorSelecionado = {};

  @ViewChild('videoPlayer', {read: ElementRef}) videoplayer: ElementRef;
  @ViewChild('formulario', {static: false}) formulario;
 

  constructor(
    private loadCtrl: LoadingController,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param['id']) {
        this.carregamentoInicial(param['id']);
      }
      else {
        this.router.navigateByUrl('/');
      } 
    });
  }

  async carregamentoInicial(id: number) {
    const loading = await this.loadCtrl.create({ message: 'Aguarde...' });
    loading.present();

    this.cursoService.carregaCurso(id).subscribe( res => {
      if (res.success) {
        loading.dismiss();
        this.conteudoSelecionado = <Conteudo>res.dados;
        this.nomeCurso = res.dados.modulo.curso.titulo;
        this.carregarModulosMenu(id);
      }
      loading.dismiss();
    },
    err => {
      console.log(err);
      loading.dismiss();
    }
    );
  }

  async carregarModulosMenu(id: number){
    const loading = await this.loadCtrl.create({ message: 'Aguarde...' });
    loading.present();
    this.menu = [];

    this.cursoService.carregaModuloCurso(id).subscribe(
      res => {
        if (res.success) {
          this.calcularProgresso(res.dados);
          this.modulo = res.dados;
          this.idConteudoInicial = this.modulo[0].conteudos[0].id;
          this.idConteudoFinal = this.modulo[this.modulo.length - 1].conteudos[this.modulo[this.modulo.length - 1].conteudos.length - 1].id;
          res.dados.forEach(mod => {
              let sub: any[] = [];

              mod.conteudos.forEach(conteudo => {
                sub.push({idModulo: mod.id, idConteudo: conteudo.id, titulo: conteudo.titulo, url:'', icon: '', open: false, conteudoConcluido: conteudo.conteudoConcluido, children: []});
              });

              let verificaModuloExpandido = false;

              if(this.conteudoSelecionado)
                if (this.conteudoSelecionado.moduloId == mod.id)
                  verificaModuloExpandido = true;

              this.menu.push(
                { idModulo: mod.id, titulo: mod.titulo, url:'', icon: '', open: verificaModuloExpandido, conteudoConcluido: false, children: sub }
              );
          });
        }
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    )
  }

  async carregaConteudoSelecionado(id: number, idConteudo: number) {
    const loading = await this.loadCtrl.create({ message: 'Aguarde...' });
    loading.present();

    this.cursoService.carregaConteudoCurso(id,idConteudo).subscribe(
      res => {
        if (res.success) {
          if (res.dados == false) {
            loading.dismiss();
            this.alertaConfirmacaoSimples('Ops!!', '',`<br>Para visualizar este contéudo e necessário concluir a avaliação no modulo: ${this.conteudoSelecionado.modulo.titulo}`);
            return;
          }
          this.conteudoSelecionado = res.dados;
          this.setVideo();
          this.carregarModulosMenu(id);
        }
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    )
  }

  setVideo() {
    if (this.conteudoSelecionado)
    if (this.conteudoSelecionado.tipo == 'VE') {
      if (this.videoplayer != undefined)
        this.videoplayer.nativeElement.setAttribute('src', this.conteudoSelecionado.arquivo);
    }
  }

  encaminhaPagina(resposta) {
    this.route.params.subscribe(param => {
      if (param['id']) { 
        this.carregaConteudoSelecionado(param['id'],resposta.idConteudo);
      }
    }) 
  }

  async carregamentoBotoes(idConteudo: number, acao: string) {
    const loading = await this.loadCtrl.create({ message: 'Aguarde...' });
    loading.present();

    this.route.params.subscribe(param => {
      if (param['id']) { 

        this.cursoService.carregaConteudoCursoAcao(param['id'],idConteudo,acao).subscribe(
          res => {
            if (res.success){
              if (res.dados == false) {
                loading.dismiss();
                this.alertaConfirmacaoSimples('Ops!!', '',`<br>Para visualizar este contéudo e necessário concluir a avaliação no modulo: ${this.conteudoSelecionado.modulo.titulo}`);
                return;
              }
              this.conteudoSelecionado = res.dados;
              this.setVideo();
              this.carregarModulosMenu(param['id']);
            }
            loading.dismiss();
          },
          err => {
            console.log(err);
            loading.dismiss();
          }
        )
      } else {
        loading.dismiss();
      }
    }) 
  }

  calcularProgresso(modulos){
    var contGeral = 0;
    var contConcluido = 0;

    modulos.forEach( result => {
      result.conteudos.forEach (conteudo => {
        contGeral++;
        if (conteudo.conteudoConcluido) {
          contConcluido++;
        }
      })
    })

    this.qtdProgresso = ((contConcluido * 100) / contGeral) / 100 ;

  }

  atualizaGroupBoxSelecionado(event , name) {
    this.groupboxValorSelecionado[name] = event.detail.value;
  }
  
  atualizaChechkBoxSelecionado(event, name) {
    this.checkboxValorSelecionado[name] = event.detail.checked;
  }

  enviarProva() {
    if (this.validaCampos()) {
      this.alertaConfirmacaoSimples('Ops!!', '','Atenção responda todos itens do questionário.');
      return;
    }

    this.validaQuestoes();
  }

  validaQuestoes() {
    let acertos = 0;
    let erros = 0;
    let acertosItensM = 0;
    let errosItensM = 0;
    let contDiscursiva = 0;

    if (this.conteudoSelecionado.tipo === 'PA') {
      this.salvarProva();
      this.alertaConfirmacaoProximaEtapa('Parabéns!!','','Você envio sua avaliação com sucesso!!');
      return;
    }

    this.conteudoSelecionado.provas.forEach(prov => {
      if (prov.tipoComponente == "E") {
        prov.itensProvas.forEach(itens => {
          if (itens.questaoCorreta == 'S') {
            if (this.groupboxValorSelecionado['conteudo-' + prov.id] == itens.id)
              acertos++;
            else
              erros++;
          }
        });
      }

      if (prov.tipoComponente == "M") {
        prov.itensProvas.forEach(itens => {
          if (itens.questaoCorreta == 'S') {
            if (this.checkboxValorSelecionado['item-' + itens.id] == true)
              acertosItensM++;
            else
              errosItensM++;
          }
        });

        if (errosItensM > 0)
          erros++;
        else
          acertos++;

      }

      if (prov.tipoComponente == "T")
        contDiscursiva++;

    });

    let msg = '';
    if (acertos == (this.conteudoSelecionado.provas.length - contDiscursiva) ) { 
      msg = 'Você acertou todas as questões objetivas.';
      if (contDiscursiva > 0)
        msg += '<br>As questões discursivas será analisada pelo seu professor.';

      this.salvarProva();
      this.alertaConfirmacaoProximaEtapa('Parabéns!!','',msg);
    }

    if (erros > 0) { 
      msg = `Das ${this.conteudoSelecionado.provas.length} questões você acertou ${acertos}.`;

      if (this.conteudoSelecionado.minAcerto > 0){
        if (acertos <  this.conteudoSelecionado.minAcerto) {
          msg+= `<br>E necessário acertar pelo menos ${this.conteudoSelecionado.minAcerto} questões para passar pra poxima etapa! `;
          this.alertaConfirmacaoSimples('Ops!!', '',msg);
        } else {
          this.salvarProva();
          this.alertaConfirmacaoProximaEtapa('Parabéns!!','',msg);
        }
      } 
      else {
        msg+= '<br>É obrigatorio acertar todas as questões para passar pra proxima etapa!';
        this.alertaConfirmacaoSimples('Ops!!', '',msg);
      }
    }

  }

  validaCampos() {
    let exiteErro = false;

    this.conteudoSelecionado.provas.forEach(prov => {
      if (prov.tipoComponente == "E") {
        if (this.groupboxValorSelecionado['conteudo-' + prov.id] == undefined || this.groupboxValorSelecionado['conteudo-' + prov.id] == '')
          exiteErro = true;
      }

      if (prov.tipoComponente == "M") {
        let validaItens = false;
        prov.itensProvas.forEach(itens => {
          if (this.checkboxValorSelecionado['item-' + itens.id] == true)
            validaItens = true;
        });
        if (!validaItens)
          exiteErro = true;
      }

      if (prov.tipoComponente == "T") {
        if (this.formulario.nativeElement['conteudo-' + prov.id].value == '')
         exiteErro = true;
      }
    });

    return exiteErro;
  }

  salvarProva() {
    var idItensProva = [];
    var provaUsuario: ProvaUsuario[] = [];

    this.conteudoSelecionado.provas.forEach(prov => {
      var itensProvaUsuario: ItemProvaUsuario[] = [];

      if (prov.tipoComponente == "E") {
        prov.itensProvas.forEach(itens => {
          if (this.groupboxValorSelecionado['conteudo-' + prov.id] == itens.id)
            itensProvaUsuario.push({ id: 0,  provaUsuarioId: 0, itensProvaId: itens.id});
        });
      }

      if (prov.tipoComponente == "M") {
        prov.itensProvas.forEach(itens => {
            if (this.checkboxValorSelecionado['item-' + itens.id] == true)
              itensProvaUsuario.push({ id: 0,  provaUsuarioId: 0, itensProvaId: itens.id});
        });
      }

      var pergunta = '';

      if (prov.tipoComponente == "T") {
        pergunta = this.formulario.nativeElement['conteudo-' + prov.id].value;
      }

      provaUsuario.push({ id: 0, provaId: prov.id, itemProvaUsuarios: itensProvaUsuario, perguntaTexto: pergunta , usuarioId: 0 });
    })

    this.cursoService.salvarProva(provaUsuario).subscribe();
  }

  async alertaConfirmacaoSimples(titulo: string, subTitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: subTitulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertaConfirmacaoProximaEtapa(titulo: string, subTitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: subTitulo,
      message: mensagem,
      buttons: [
      {
          text: 'Ir pra proxima etapa?',
          handler: () => {
            if (this.conteudoSelecionado.id == this.idConteudoFinal){
              this.route.params.subscribe(param => {
                if (param['id']) {
                  this.carregamentoInicial(param['id']);
                  //Definir a mensagem de conclusao do curso
                }
              });
              
            }
            else
              this.carregamentoBotoes(this.conteudoSelecionado.id,'P');
          }
        }
      ]
    });

    await alert.present();
  }

}
