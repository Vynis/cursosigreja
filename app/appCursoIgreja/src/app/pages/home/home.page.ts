import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { InscricaoUsuario } from 'src/app/core/_models/inscricaoUsuario.model';
import { ModeloBase } from 'src/app/core/_models/modelo-base';
import { InscricaoUsuarioService } from 'src/app/core/_services/inscricaoUsuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  listaInscricaoCurso: InscricaoUsuario[];
  dataAtual: Date = new Date();

  constructor(
    private inscricaoUsuarioService: InscricaoUsuarioService, 
    public alertController: AlertController, 
    private navCtrl: NavController) { }

  ngOnInit(): void {
    this.buscarMinhasInscoes(null);
  }

  buscarMinhasInscoes(event) {
    this.inscricaoUsuarioService.buscaCursoIsncrito().subscribe(
      res => {
        console.log('solicitou');
        let dados = res.dados;
        dados.forEach(element => {
          element.processoInscricao.dataFinal = new Date(element.processoInscricao.dataFinal);
          element.processoInscricao.dataInicial = new Date(element.processoInscricao.dataInicial);
          element.processoInscricao.dataInicalPagto = new Date(element.processoInscricao.dataInicalPagto);
          element.processoInscricao.dataFinalPagto = new Date(element.processoInscricao.dataFinalPagto);
        });
        this.listaInscricaoCurso = dados;
        if (event !== null)
          event.target.complete();
      }
    )
  }

  async cancelarInscricao(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tem certeza que deseja cancelar sua inscrição',
      message: 'Caso cancele poderá efetuar inscrição novamente se estiver dentre os prazos!',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.inscricaoUsuarioService.cancelarInscricao(id).subscribe(
              res => {
                if (res.success) {
                  this.buscarMinhasInscoes(null);
                }
              }
            )
          }
        }
      ]
    });

    await alert.present();
  }

  gerarPagamento(inscricao: InscricaoUsuario) {
    if (inscricao.transacaoInscricoes) {
      if (inscricao.transacaoInscricoes.length > 0) {
        this.inscricaoUsuarioService.buscaTransacao(inscricao.transacaoInscricoes[0].codigo).subscribe(
          res => {
            if (res.success) {
              this.mensagemTransacao(res);
            }
          }
        )
      } else {
        this.inscricaoUsuarioService.gerarPagamentoSemToken(inscricao.id).subscribe(
          res => {
            if (res.success) {
              this.mensagemTransacao(res);
            }
          }
        );
      }
    } else {
      this.inscricaoUsuarioService.gerarPagamentoSemToken(inscricao.id).subscribe(
        res => {
          if (res.success) {
            this.mensagemTransacao(res);
          }
        }
      );
    }

  }

  async mensagemTransacao(res: ModeloBase) {
    window.open(res.dados, '_blank');

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Parabéns',
      subHeader: 'O pagamento foi gerado com sucesso',
      message: `Caso a página de pagamento não foi aberta pelo seu navegador <a href=\'${res.dados}\'  target="_blank"  >clique aqui.</a>`,
      buttons: ['OK']
    });

    await alert.present();
  }


}
