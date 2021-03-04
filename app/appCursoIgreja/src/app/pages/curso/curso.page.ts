import { Modulo } from './../../core/_models/modulos.model';
import { CursoService } from './../../core/_services/curso.service';
import { MenuModel } from './../../core/_models/menu.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Conteudo } from 'src/app/core/_models/conteudos.model';

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

  @ViewChild('videoPlayer', {read: ElementRef}) videoplayer: ElementRef;
 

  constructor(
    private loadCtrl: LoadingController,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router,
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
        console.log(res.dados);
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

}
