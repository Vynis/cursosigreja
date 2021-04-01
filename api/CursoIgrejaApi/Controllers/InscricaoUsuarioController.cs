using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CursoIgreja.Api.Dtos;
using CursoIgreja.Domain.Models;
using CursoIgreja.PagSeguro;
using CursoIgreja.PagSeguro.Enum;
using CursoIgreja.PagSeguro.TransferObjects;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CursoIgreja.Api.Controllers
{
    [ApiController]
    [Route("api/inscricao-usuario")]
    public class InscricaoUsuarioController : ControllerBase
    {
        private readonly IInscricaoUsuarioRepository _inscricaoUsuarioRepository;
        private readonly IMeioPagamentoRepository _meioPagamentoRepository;
        private readonly ICursoRepository _cursoRepository;
        private readonly IParametroSistemaRepository _parametroSistemaRepository;
        private readonly ITransacaoInscricaoRepository _transacaoInscricaoRepository;
        private readonly ILogNotificacoesRepository _logNotificacoesRepository;
        private readonly IProcessoInscricaoRepository _processoInscricaoRepository;
        private readonly IProvaUsuarioRepository _provaUsuarioRepository;
        private string urlWsPagueSeguro = "";
        private string urlSitePagueSeguro = "";

        public InscricaoUsuarioController(IInscricaoUsuarioRepository inscricaoUsuarioRepository,
                                          IMeioPagamentoRepository meioPagamentoRepository,
                                          ICursoRepository cursoRepository,
                                          IParametroSistemaRepository parametroSistemaRepository,
                                          ITransacaoInscricaoRepository transacaoInscricaoRepository,
                                          ILogNotificacoesRepository logNotificacoesRepository,
                                          IProcessoInscricaoRepository processoInscricaoRepository,
                                          IProvaUsuarioRepository provaUsuarioRepository
                                          )
        {
            _inscricaoUsuarioRepository = inscricaoUsuarioRepository;
            _meioPagamentoRepository = meioPagamentoRepository;
            _cursoRepository = cursoRepository;
            _parametroSistemaRepository = parametroSistemaRepository;
            _transacaoInscricaoRepository = transacaoInscricaoRepository;
            _logNotificacoesRepository = logNotificacoesRepository;
            _processoInscricaoRepository = processoInscricaoRepository;
            _provaUsuarioRepository = provaUsuarioRepository;
            urlSitePagueSeguro = _parametroSistemaRepository.Buscar(x => x.Status.Equals("A") && x.Titulo.Equals("SitePagueSeguro")).Result.FirstOrDefault().Valor;
            urlWsPagueSeguro = _parametroSistemaRepository.Buscar(x => x.Status.Equals("A") && x.Titulo.Equals("WsPagueSeguro")).Result.FirstOrDefault().Valor;
        }


        [HttpGet("processar-curso-inscrito/{id}")]
        [Obsolete("Nao esta sendo utilizado neste modulo. Olhar CursoController")]
        public async Task<IActionResult> ProcessarCursoInscrito(int id)
        {
            try
            {
                var response = await _inscricaoUsuarioRepository.ObterPorId(id);

                if (response.UsuarioId != Convert.ToInt32(User.Identity.Name))
                    return Response("Busca invalida", false);

                var listaProvaUsuario = await _provaUsuarioRepository.Buscar(x => x.UsuarioId.Equals(Convert.ToInt32(User.Identity.Name)));

                foreach (var modulo in response.ProcessoInscricao.Curso.Modulo)
                   foreach (var conteudo in modulo.Conteudos)
                    {
                        if (conteudo.Tipo.Equals("PR") || conteudo.Tipo.Equals("PA"))
                        {
                            var provaUsuario = listaProvaUsuario.Where(x => x.Prova.ConteudoId.Equals(conteudo.Id)).ToList();

                            if (provaUsuario.Count > 0)
                                conteudo.ConteudoConcluido = true;
                            else
                                conteudo.ConteudoConcluido = false;
                        }
                        else
                            conteudo.ConteudoConcluido = conteudo.ConteudoUsuarios.Exists(x => x.ConteudoId == conteudo.Id && x.UsuariosId == Convert.ToInt32(User.Identity.Name) && x.Concluido.Equals("S"));
                    }
                       

               return Response(response);
                
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> Cadastrar(InscricaoUsuario inscricaoUsuario)
        {
            try
            {
                var validaInscricao = await _inscricaoUsuarioRepository.Buscar(x => x.ProcessoInscricaoId.Equals(inscricaoUsuario.ProcessoInscricaoId)
                && x.UsuarioId.Equals(Convert.ToInt32(User.Identity.Name)) && x.Status != "CA");

                if (validaInscricao.Any())
                    return Response("Já se encontra inscrito neste curso", false);

                //var listaInscricaoUsuario = await _inscricaoUsuarioRepository.Buscar(x => x.UsuarioId.Equals(Convert.ToInt32(User.Identity.Name)) && x.Status != "CA");

                //if (listaInscricaoUsuario.Any())
                //{
                //    var idCursoProcessoInscricao = _processoInscricaoRepository.ObterPorId(inscricaoUsuario.ProcessoInscricaoId).Result.CursoId;

                //    var validaFezCurso = listaInscricaoUsuario.ToList().Exists(x => x.ProcessoInscricao.CursoId.Equals(idCursoProcessoInscricao));

                //    if (validaFezCurso)
                //        return Response("Já se encontra inscrito neste curso", false);
                //}

                inscricaoUsuario.DataInscricao = DateTime.Now;
                inscricaoUsuario.Usuario = null;
                inscricaoUsuario.ProcessoInscricao = null;
                inscricaoUsuario.UsuarioId = Convert.ToInt32(User.Identity.Name);

                var response = await _inscricaoUsuarioRepository.Adicionar(inscricaoUsuario);

                if (response)
                {
                    inscricaoUsuario.ProcessoInscricao = await _processoInscricaoRepository.ObterPorId(inscricaoUsuario.ProcessoInscricaoId);
                    return Response(inscricaoUsuario);
                }
                    

                return Response("Cadastro não realizado", false);
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        [HttpPut("cancelar-incricao/{id}")]
        public async Task<IActionResult> CancelarInscricao(int id)
        {
            try
            {
                var buscarInscricao = await _inscricaoUsuarioRepository.ObterPorId(id);

                if (buscarInscricao == null)
                    return Response("Inscrição nao existe", false);

                buscarInscricao.Status = "CA";

                var response = await _inscricaoUsuarioRepository.Atualizar(buscarInscricao);

                if (!response)
                    return Response("Erro ao atualizar", false);

                return Response(buscarInscricao);

            }
            catch (Exception ex)
            {

                return ResponseErro(ex);
            }
        }

        [HttpGet("buscar-transacao/{idTransacao}")]
        public async Task<IActionResult> BuscarTransacao(string idTransacao)
        {

            try
            {
                var paymentUrl = string.Concat($"{urlSitePagueSeguro}/v2/checkout/payment.html?code=", idTransacao);

                return Response(paymentUrl);
            }
            catch (Exception ex)
            {

                return ResponseErro(ex);
            }

        }

        [HttpPost("gerar/{id}")]
        public async Task<IActionResult> Gerar(int id)
        {
            try
            {
                var inscricao = await _inscricaoUsuarioRepository.ObterPorId(id);

                if (inscricao == null)
                    return Response("Inscrição não localizada!", false);

                var dadosConfigPagamento = await _meioPagamentoRepository.Buscar(x => x.Status.Equals("A"));

                var dadosCurso = await _cursoRepository.ObterPorId(inscricao.ProcessoInscricao.CursoId);

                var emailPagSeguro = dadosConfigPagamento.FirstOrDefault().Email;
                var tokenPagSeguro = dadosConfigPagamento.FirstOrDefault().Token;
                string urlCheckout = $"{urlWsPagueSeguro}/v2/checkout";

                var listaItensPedido = new List<PagSeguroItemDTO> {
                    new PagSeguroItemDTO {
                        itemId = id.ToString(),
                        itemQuantity = "1",
                        itemDescription = $"Inscrição para o curso: {dadosCurso.Titulo}",
                        itemAmount = inscricao.ProcessoInscricao.Valor.ToString("F").Replace(",","."),
                        itemWeight = "200"
                    }
                };

                if (string.IsNullOrEmpty(inscricao.Usuario.Email))
                    inscricao.Usuario.Email = "sememail@cursoigrejacristobrasil.kinghost.net";

                var dadosComprador = new PagSeguroCompradorDTO
                {
                    SenderName = inscricao.Usuario.Nome.Length > 50 ? inscricao.Usuario.Nome.Substring(0, 50).Trim() : inscricao.Usuario.Nome.Trim(),
                    senderEmail = inscricao.Usuario.Email.Length > 60 ? inscricao.Usuario.Nome.Substring(0, 60).ToLower().Trim() : inscricao.Usuario.Email.ToLower().Trim(),
                    senderPhone = inscricao.Usuario.TelefoneCelular.Length > 9 ? inscricao.Usuario.TelefoneCelular.Substring(0, 9).Trim() : inscricao.Usuario.TelefoneCelular.Trim(),
                    SenderAreaCode = "62"
                };

                var referencia = id.ToString();

                var apiPagSeguro = new PagSeguroAPI();

                //Retira os espaçõs entre o nome
                Regex regex = new Regex(@"\s{2,}");
                dadosComprador.SenderName = regex.Replace(dadosComprador.SenderName, " ");
                dadosComprador.SenderName = dadosComprador.SenderName.Replace("\0", "");

                var retornoApiPagSeguro = apiPagSeguro.Checkout(emailPagSeguro, tokenPagSeguro, urlCheckout, listaItensPedido, dadosComprador, referencia);

                if (!string.IsNullOrEmpty(retornoApiPagSeguro))
                {
                    var transacao = new TransacaoInscricao()
                    {
                        Codigo = retornoApiPagSeguro,
                        InscricaoUsuarioId = id
                    };

                    var registraTransacao = await _transacaoInscricaoRepository.Adicionar(transacao);

                    if (!registraTransacao)
                        return Response("Erro na transação de pagamento", false);
                } else
                {
                    return Response("Erro ao fazer a comunicação de pagamento", false);
                }

                var paymentUrl = string.Concat($"{urlSitePagueSeguro}/v2/checkout/payment.html?code=", retornoApiPagSeguro);

                return Response(paymentUrl);

            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        [HttpGet("busca-curso-inscrito")]
        public async Task<IActionResult> BuscarCursosInscrito()
        {
            try
            {
                var resultado = await _inscricaoUsuarioRepository.Buscar(x => x.UsuarioId == Convert.ToInt32(User.Identity.Name) && !x.Status.Equals("CA"));

                return Response(resultado.OrderByDescending(c => c.DataInscricao));
            }
            catch (Exception ex)
            {

                return ResponseErro(ex);
            }
        }

        [HttpPost("notificacoes")]
        [AllowAnonymous]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> Notificacoes([FromForm] NotificacaoDto notificacaoDto)
        {
            try
            {

                //Inicia com log
                var logNotificacoes = new LogNotificacao()
                {
                    Data = DateTime.Now,
                    NotificationCode = notificacaoDto.NotificationCode,
                    NotificationType = notificacaoDto.NotificationType
                };

                var response = await _logNotificacoesRepository.Adicionar(logNotificacoes);

                //Busca os dados dados da transacao
                var dadosConfigPagamento = await _meioPagamentoRepository.Buscar(x => x.Status.Equals("A"));
                var emailPagSeguro = dadosConfigPagamento.FirstOrDefault().Email;
                var tokenPagSeguro = dadosConfigPagamento.FirstOrDefault().Token;
                string urlPagseguro = $"{urlWsPagueSeguro}/v3/transactions/notifications/";

                var apiPagSeguro = new PagSeguroAPI();

                var retornoApiPagSeguro = apiPagSeguro.ConsultaPorCodigoNotificacao(emailPagSeguro, tokenPagSeguro, urlPagseguro, notificacaoDto.NotificationCode);

                if (!retornoApiPagSeguro.Status.Equals(Convert.ToInt32(StatusTransacaoEnum.Paga)) && !retornoApiPagSeguro.Status.Equals(Convert.ToInt32(StatusTransacaoEnum.Disponivel)))
                    return Response("Não foi possível fazer operacao", false);

                var dadosInscricao = await _inscricaoUsuarioRepository.Buscar(x => x.Id.Equals(Convert.ToInt32(retornoApiPagSeguro.Reference)));
                var buscaDadosInscricao = dadosInscricao.FirstOrDefault();


                //Atualiza o status da isncricao
                if (!buscaDadosInscricao.Status.Equals("AG"))
                    return Response("Não foi possível fazer operacao", false);

                buscaDadosInscricao.Status = "CO";
                buscaDadosInscricao.DataConfirmacao = DateTime.Now;
                buscaDadosInscricao.ProcessoInscricao = null;
                buscaDadosInscricao.TransacaoInscricoes = null;
                buscaDadosInscricao.Usuario = null;

                var atualizaInscricao = await _inscricaoUsuarioRepository.Atualizar(buscaDadosInscricao);

                if (!atualizaInscricao)
                    return Response("Erro ao atualizar inscrição", false);

                return Response(buscaDadosInscricao);
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }

        }

        [HttpPost("notificacao-especifica")]
        [AllowAnonymous]
        public async Task<IActionResult> NotificacaoEspecificao(NotificacaoDto notificacaoDto)
        {
            try
            {
                //Busca os dados dados da transacao
                var dadosConfigPagamento = await _meioPagamentoRepository.Buscar(x => x.Status.Equals("A"));
                var emailPagSeguro = dadosConfigPagamento.FirstOrDefault().Email;
                var tokenPagSeguro = dadosConfigPagamento.FirstOrDefault().Token;
                string urlPagseguro = $"{urlWsPagueSeguro}/v3/transactions/notifications/";

                var apiPagSeguro = new PagSeguroAPI();

                var retornoApiPagSeguro = apiPagSeguro.ConsultaPorCodigoNotificacao(emailPagSeguro, tokenPagSeguro, urlPagseguro, notificacaoDto.NotificationCode);

                return Response(retornoApiPagSeguro);
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }


    }
}
