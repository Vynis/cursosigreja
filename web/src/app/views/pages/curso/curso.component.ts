import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    public inscricaoUsuarioService: InscricaoUsuarioService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private orderPipe: OrderPipe
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
          this.selecionarConteudo(this.modulos[0].conteudos[0]);

          this.setCarregamento.next(true);
        }
      }
    )
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

    } else {
      this.conteudoSelecionado = conteudo;
    }
  }

}
