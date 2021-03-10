import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../../core/processo-inscricao/_models/curso.model';
import { InscricaoUsuarioService } from '../../../core/inscricao-usuario/_services/inscricaoUsuario.service';
import { Modulo } from '../../../core/inscricao-usuario/_models/modulos.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { Conteudo } from '../../../core/inscricao-usuario/_models/conteudos.model';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { OrderPipe } from 'ngx-order-pipe';
import { environment } from '../../../../environments/environment';
import { ConteudoUsuario } from '../../../core/inscricao-usuario/_models/conteudoUsuario.model';
import { ItemProva } from '../../../core/inscricao-usuario/_models/itemprova.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange, MatRadioChange } from '@angular/material';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { EmbedVideoService } from 'ngx-embed-video';
import { ItemProvaUsuario } from '../../../core/inscricao-usuario/_models/itemprovaUsuario.model';
import { ProvaUsuario } from '../../../core/inscricao-usuario/_models/provaUsuario.model';


@Component({
  selector: 'kt-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  panelOpenState = false;
  public isCollapsed = true;
  public curso: Curso = new Curso();
  public modulos: Modulo[];
  videoData: any = {};
  public linkVideo = 'https://drive.google.com/file/d/0B0L2cgFYp2uSZGt1dXFQR3Y3VWc/preview';
  public conteudoSelecionado: Conteudo;
  public setCarregamento = new Subject<boolean>();
  public carregou: Observable<boolean>;
  mobileQuery: MediaQueryList;
  // private _mobileQueryListener: () => void;
  public localApi: string = '';
  public idConteudoInicial = 0;
  public idConteudoFinal = 0;
  public qtdProgresso = 0;
  public itensProvaSelecionado: ItemProva[];
  @ViewChild('formulario', {static: false}) formulario;
  checkboxValorSelecionado = {};
  groupboxValorSelecionado = {};
  exiteErro = false;
  urlVideoSelecionado = '';
  provaUsuario = [];
  provaRealizada = false;
  showModal: boolean;

  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;

  constructor(
    public inscricaoUsuarioService: InscricaoUsuarioService,
    private route: ActivatedRoute,
    private media: MediaMatcher,
    // changeDetectorRef: ChangeDetectorRef,
    private orderPipe: OrderPipe,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);
    this.localApi = environment.api.replace('api/', '');
  }

  ngOnInit() {

    let conteudo = new Conteudo();
    conteudo.id = 0;
    this.conteudoSelecionado = conteudo;

    this.carregou = this.setCarregamento.pipe(tap(res => { return res }));

    this.setCarregamento.next(false);

    this.route.params.subscribe(param => {
      if (param['id']) {
        this.buscaDadosCurso(param['id']);
      } else {
        this.alertaSemConteudoCurso();
      }
    });



  }

  alertaSemConteudoCurso() {
    Swal.fire({
      title: 'Atenção',
      text: 'Não foi disponibilizado nenhum contéudo para o curso. Aguarde..',
      icon: 'warning',
      confirmButtonText: 'Voltar',
      allowOutsideClick: false
    }).then((result: any) => {
      if (result.value) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  buscaDadosCurso(idInscricao: number) {
    this.inscricaoUsuarioService.processarCursoInscrito(idInscricao).subscribe(
      res => {
        // console.log(res);
        if (res.success) {
          if (res.dados) {
            let dados = res.dados;
            this.curso = dados.processoInscricao.curso;

            if (dados.processoInscricao.curso.modulo.length == 0)
            {
              this.alertaSemConteudoCurso();
              return;
            }

            let listaModulos: Modulo[] = [];

            dados.processoInscricao.curso.modulo.forEach(modulo => {
              if (modulo.liberacaoModulos.length > 0) {
                if (new Date() > new Date(modulo.liberacaoModulos[0].dataInicio))
                  listaModulos.push(modulo);
              }
              else {
                listaModulos.push(modulo);
              }
            });

            dados.processoInscricao.curso.modulo = listaModulos;


            if (dados.processoInscricao.curso.modulo.length == 0)
            {
              this.alertaSemConteudoCurso();
              return;
            }


            this.modulos = this.orderPipe.transform(dados.processoInscricao.curso.modulo, 'ordem');

            if (this.modulos[0].conteudos.length == 0){
              this.alertaSemConteudoCurso();
              return;
            }

            this.idConteudoInicial = this.modulos[0].conteudos[0].id;
            this.idConteudoFinal = this.modulos[this.modulos.length - 1].conteudos[this.modulos[this.modulos.length - 1].conteudos.length - 1].id;
            this.provaUsuario = dados.usuario.provaUsuarios;


            //Modulo inicial
            this.calcularProgresso();
            this.selecionarConteudo(this.modulos[0].conteudos[0], '', this.modulos[0]);
            this.buscarUltimoConteudoUsuario(dados.processoInscricao.cursoId);

            this.setCarregamento.next(true);
          }
          else {
            this.alertaSemConteudoCurso();
          }

        }
        else {
          this.alertaSemConteudoCurso();
        }
      },
      erro => {
        this.alertaSemConteudoCurso();
      }
    )
  }

  buscarUltimoConteudoUsuario(idCurso: number) {
    this.inscricaoUsuarioService.buscaConteudoUsuario(idCurso).subscribe( result => {
      if (result.success) {
        if (result.dados.length > 0){
          let conteudoUsuario = this.orderPipe.transform(result.dados,'dataConclusao',true);
          this.selecionarConteudo(conteudoUsuario[0].conteudo,'', conteudoUsuario[0].conteudo.modulo);
        }
      }
    })
  }

  validaProvaUsuario()  {

    var validaDados = true;

    this.modulos.forEach(mod => {
      var validaProva = true;
      var conteudoProva: any;

      mod.conteudos.forEach(conte => {
        if (conte.tipo == 'PR' && !conte.conteudoConcluido)  {
          conteudoProva = conte;
          validaProva = false;
        }
      })

      if (!validaProva) {

        if (this.conteudoSelecionado.modulo.ordem > mod.ordem) {
          validaDados = false;
          var msg = `<br>Para visualizar este contéudo e necessário concluir a avaliação no modulo: ${mod.titulo} `;
          Swal.fire({
            title: 'Ops!!',
            html: msg,
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then(result => {
            if (result.value)
              location.reload();
          })

        }

      }

    });

    return validaDados;
  }

  selecionarConteudo(conteudo: Conteudo, acao: string = '', modulo: Modulo = null) {

    if (conteudo == null) {

      var ehProximoModulo = false;

      if (acao == 'p') {
        this.modulos.forEach(mod => {

          if (ehProximoModulo)
            this.conteudoSelecionado = mod.conteudos[0];

          if (mod.id == this.conteudoSelecionado.moduloId) {

            //Busa proximo dentro o proprio modulo
            const retornaProximo = mod.conteudos.find(cont => cont.ordem > this.conteudoSelecionado.ordem);

            if (retornaProximo) {
              this.conteudoSelecionado = retornaProximo;
              this.conteudoSelecionado.modulo = mod;
            }
            else
              ehProximoModulo = true;
          }

        })
      } else {
        this.modulos.forEach((mod,i) => {

          if (mod.id == this.conteudoSelecionado.moduloId) {

            //Busa anterior dentro o proprio modulo
            const retornaAnterior = mod.conteudos.find(cont => cont.ordem == (this.conteudoSelecionado.ordem - 1 ) );

            if (retornaAnterior){
              this.conteudoSelecionado = retornaAnterior;
              this.conteudoSelecionado.modulo = mod;
            }
            else
              this.conteudoSelecionado = this.modulos[i - 1].conteudos[this.modulos[i - 1].conteudos.length - 1];
          }

        })
      }

      if (this.validaProvaUsuario())
        this.salvarConteudoUsuario(this.conteudoSelecionado);

    } else {
      this.conteudoSelecionado = conteudo;
      this.conteudoSelecionado.modulo = modulo;

      if (this.validaProvaUsuario())
        this.salvarConteudoUsuario(conteudo);
    }

    if (this.conteudoSelecionado.tipo == 'VE') {
      if (this.videoplayer != undefined)
        this.videoplayer.nativeElement.setAttribute('src', this.conteudoSelecionado.arquivo);
    }

    if (this.conteudoSelecionado.tipo == 'PR') {
      this.provaRealizada = false;

      if (this.provaUsuario) {
        this.provaUsuario.forEach( res => {
          if (res.prova !== null)
            if (res.prova.conteudoId === this.conteudoSelecionado.id)
              this.provaRealizada = true;
        })
      }
    }


  }

  salvarConteudoUsuario(conteudo: Conteudo) {
    var conteudoUsuario = new ConteudoUsuario();
    conteudoUsuario.id = 0;
    conteudoUsuario.conteudoId = conteudo.id;
    conteudoUsuario.concluido = "S";
    conteudoUsuario.dataConclusao = null;
    conteudoUsuario.usuariosId = 0;
    this.inscricaoUsuarioService.salvarConteudoUsuario(conteudoUsuario).subscribe( res => {
      if (res){
        this.atualizaModulos();
      }
    });
  }

  atualizaModulos() {
    this.inscricaoUsuarioService.buscarModuloCurso(this.curso.id).subscribe(res => {
      if (res.success) {
        let dados = res.dados;

        let listaModulos: Modulo[] = [];

        dados.forEach(modulo => {
          if (modulo.liberacaoModulos.length > 0) {
            if (new Date() > new Date(modulo.liberacaoModulos[0].dataInicio))
              listaModulos.push(modulo);
          }
          else {
            listaModulos.push(modulo);
          }
        });

        this.modulos = listaModulos;
        this.calcularProgresso();
      }
    })
  }

  calcularProgresso(){
    var contGeral = 0;
    var contConcluido = 0;

    this.modulos.forEach( result => {
      result.conteudos.forEach (conteudo => {
        contGeral++;
        if (conteudo.conteudoConcluido) {
          contConcluido++;
        }
      })
    })

    this.qtdProgresso = Math.round((contConcluido * 100) / contGeral);

  }

  enviarProva(conteudo: Conteudo) {
    this.exiteErro = this.validaCampos();

    if (this.exiteErro)
      return;

    Swal.fire({
      title: 'Tem certeza que deseja enviar o teste',
      text: '',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: "Não",
      reverseButtons: true,
      allowOutsideClick: false
    }).then( result => {
      if (result.value) {
        this.validaQuestoes();
      }
    });

  }

  private validaQuestoes() {
    let acertos = 0;
    let erros = 0;
    let acertosItensM = 0;
    let errosItensM = 0;
    let contDiscursiva = 0;

	if (this.conteudoSelecionado.tipo === 'PA') {
		this.salvarProva();

		Swal.fire({
			title: 'Parabéns!!',
			html: 'Você envio sua avaliação com sucesso!!',
			icon: 'success',
			confirmButtonText: 'Ir pra proxima etapa?',
			allowOutsideClick: false
		  }).then((result: any) => {
			if (result.value) {
			  location.reload();
			}
		  });

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
        msg += '<br>As questões discursivas será analisada pelo seu professor.'

      this.salvarProva();

      Swal.fire({
        title: 'Parabéns!!',
        html: msg,
        icon: 'success',
        confirmButtonText: 'Ir pra proxima etapa?',
        allowOutsideClick: false
      }).then((result: any) => {
        if (result.value) {
          this.selecionarConteudo(null, 'p');
          location.reload();
        }
      });
    }

    if (erros > 0) {
      msg = `Das ${this.conteudoSelecionado.provas.length} questões você acertou ${acertos}.`;

      if (this.conteudoSelecionado.minAcerto > 0){
        if (acertos <  this.conteudoSelecionado.minAcerto) {
          msg+= `<br>E necessário acertar pelo menos ${this.conteudoSelecionado.minAcerto} questões para passar pra poxima etapa! `;
          Swal.fire({
            title: 'Ops!!',
            html: msg,
            icon: 'error',
            confirmButtonText: 'Reveja suas respostas',
          }).then(result => {
            if (result.value)
              this.selecionarConteudo(this.conteudoSelecionado);
          })
        }
        else {

          this.salvarProva();

          Swal.fire({
            title: 'Parabéns!!',
            html: msg,
            icon: 'success',
            confirmButtonText: 'Ir pra proxima etapa?',
            allowOutsideClick: false
          }).then((result: any) => {
            if (result.value) {
              this.selecionarConteudo(null, 'p');
              location.reload();
            }
          });

        }
      }
      else {
        msg+= '<br>É obrigatorio acertar todas as questões para passar pra proxima etapa!';
        Swal.fire({
          title: 'Ops!!',
          html: msg,
          icon: 'error',
          confirmButtonText: 'Reveja suas respostas',
          allowOutsideClick: false
        }).then((result: any) => {
          if (result.value) {
            if (result.value)
              this.selecionarConteudo(this.conteudoSelecionado);
          }
        });
      }
    }

  }

  private validaCampos() {

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

    this.inscricaoUsuarioService.salvarProva(provaUsuario).subscribe();
  }


  atualizaChechkBoxSelecionado(event: MatCheckboxChange, name) {
    this.checkboxValorSelecionado[name] = event.checked;
  }

  atualizaGroupBoxSelecionado(event: MatRadioChange, name) {
    this.groupboxValorSelecionado[name] = event.value;
  }

  show()
  {
    this.showModal = true; // Show-Hide Modal Check

  }

  hide()
  {
    this.showModal = false;
  }



}
