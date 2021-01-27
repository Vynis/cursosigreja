import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import Swal from 'sweetalert2';


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
  private _mobileQueryListener: () => void;
  public localApi: string = '';
  public idConteudoInicial = 0;
  public idConteudoFinal = 0;
  public qtdProgresso = 0;
  public itensProvaSelecionado: ItemProva[];
  @ViewChild('formulario', {static: false}) formulario;
  checkboxValorSelecionado = {};
  groupboxValorSelecionado = {};
  exiteErro = false;

  constructor(
    public inscricaoUsuarioService: InscricaoUsuarioService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private orderPipe: OrderPipe,
    private fb: FormBuilder
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
        console.log("sem id");
      }
    });

  }

  buscaDadosCurso(idInscricao: number) {
    this.inscricaoUsuarioService.processarCursoInscrito(idInscricao).subscribe(
      res => {
        // console.log(res);
        if (res.success) {
          let dados = res.dados;
          this.curso = dados.processoInscricao.curso;
          this.modulos = this.orderPipe.transform(dados.processoInscricao.curso.modulo, 'ordem');

          this.idConteudoInicial = this.modulos[0].conteudos[0].id;
          this.idConteudoFinal = this.modulos[this.modulos.length - 1].conteudos[this.modulos[this.modulos.length - 1].conteudos.length - 1].id;

          //Modulo inicial
          this.calcularProgresso();
          this.selecionarConteudo(this.modulos[0].conteudos[0]);
          this.buscarUltimoConteudoUsuario(dados.processoInscricao.cursoId);

          this.setCarregamento.next(true);
        }
      }
    )
  }

  buscarUltimoConteudoUsuario(idCurso: number) {
    this.inscricaoUsuarioService.buscaConteudoUsuario(idCurso).subscribe( result => {
      if (result.success) {
        if (result.dados.length > 0){
          let conteudoUsuario = this.orderPipe.transform(result.dados,'dataConclusao',true);
          this.selecionarConteudo(conteudoUsuario[0].conteudo);
        }
      }
    })
  }

  selecionarConteudo(conteudo: Conteudo, acao: string = '') {

    if (conteudo == null) {

      var ehProximoModulo = false;
      var ehAnteriorModulo = false;

      if (acao == 'p') {
        this.modulos.forEach(mod => {
          
          if (ehProximoModulo) 
            this.conteudoSelecionado = mod.conteudos[0];           
          
          if (mod.id == this.conteudoSelecionado.moduloId) {

            //Busa proximo dentro o proprio modulo
            const retornaProximo = mod.conteudos.find(cont => cont.ordem > this.conteudoSelecionado.ordem);

            if (retornaProximo) 
              this.conteudoSelecionado = retornaProximo;
            else 
              ehProximoModulo = true;  
          }

        })
      } else {
        this.modulos.forEach((mod,i) => {
                
          if (mod.id == this.conteudoSelecionado.moduloId) {

            //Busa anterior dentro o proprio modulo
            const retornaAnterior = mod.conteudos.find(cont => cont.ordem == (this.conteudoSelecionado.ordem - 1 ) );

            if (retornaAnterior) 
              this.conteudoSelecionado = retornaAnterior;
            else 
              this.conteudoSelecionado = this.modulos[i - 1].conteudos[this.modulos[i - 1].conteudos.length - 1]; 
          }

        })
      }

      this.salvarConteudoUsuario(this.conteudoSelecionado);

    } else {
      this.salvarConteudoUsuario(conteudo);      
      this.conteudoSelecionado = conteudo;
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
        this.modulos = res.dados;
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

    this.qtdProgresso = (contConcluido * 100) / contGeral;

  }

  enviarProva(conteudo: Conteudo) {
    console.log(this.checkboxValorSelecionado['item-7']);
    console.log(this.groupboxValorSelecionado['conteudo-1']);
    this.exiteErro = this.validaCampos();

    if (this.exiteErro)
      return;

    Swal.fire({
      title: 'Tem certeza que deseja enviar',
      text: '',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: "Não",
      reverseButtons: true,
      allowOutsideClick: false
    }).then( result => {
      if (result.value) {



      }
    });

    this.validaQuestoes();


    //console.log(this.formulario.nativeElement['0'].value);
  }

  private validaQuestoes() {
    let acertos = 0;
    let erros = 0;
    let acertosItensM = 0;
    let errosItensM = 0;

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

    });


    if(this.conteudoSelecionado.minAcerto > 0){
      
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

  atualizaChechkBoxSelecionado(event: MatCheckboxChange, name) {
    this.checkboxValorSelecionado[name] = event.checked;
  }

  atualizaGroupBoxSelecionado(event: MatRadioChange, name) {
    this.groupboxValorSelecionado[name] = event.value;
  }

}
