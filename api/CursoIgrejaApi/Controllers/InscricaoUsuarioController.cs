using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CursoIgreja.Domain.Models;
using CursoIgreja.PagSeguro;
using CursoIgreja.PagSeguro.TransferObjects;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        private string urlWsPagueSeguro = "";
        private string urlSitePagueSeguro = "";

        public InscricaoUsuarioController(IInscricaoUsuarioRepository inscricaoUsuarioRepository, IMeioPagamentoRepository meioPagamentoRepository, ICursoRepository cursoRepository, IParametroSistemaRepository parametroSistemaRepository)
        {
            _inscricaoUsuarioRepository = inscricaoUsuarioRepository;
            _meioPagamentoRepository = meioPagamentoRepository;
            _cursoRepository = cursoRepository;
            _parametroSistemaRepository = parametroSistemaRepository;
            urlSitePagueSeguro = _parametroSistemaRepository.Buscar(x => x.Status.Equals("A") && x.Titulo.Equals("SitePagueSeguro")).Result.FirstOrDefault().Valor;
            urlWsPagueSeguro = _parametroSistemaRepository.Buscar(x => x.Status.Equals("A") && x.Titulo.Equals("WsPagueSeguro")).Result.FirstOrDefault().Valor;
         }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> Cadastrar(InscricaoUsuario inscricaoUsuario)
        {
            try
            {
                var validaInscricao = await _inscricaoUsuarioRepository.Buscar(x => x.ProcessoInscricaoId.Equals(inscricaoUsuario.ProcessoInscricaoId)
                && x.UsuarioId.Equals(inscricaoUsuario.UsuarioId) && x.Status != "CA");

                if (validaInscricao.Any())
                    Response("Já se encontra inscrito neste curso", false);

                inscricaoUsuario.DataInscricao = DateTime.Now;
                inscricaoUsuario.Usuario = null;
                inscricaoUsuario.ProcessoInscricao = null;

                var response = await _inscricaoUsuarioRepository.Adicionar(inscricaoUsuario);

                if (response)
                    return Response(inscricaoUsuario);

                return Response("Cadastro não realizado", false);
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
                    inscricao.Usuario.Email = "sememail@igrejadecristobrasil.com.br";

                var dadosComprador = new PagSeguroCompradorDTO
                {
                    SenderName = inscricao.Usuario.Nome.Length > 50 ? inscricao.Usuario.Nome.Substring(0, 50) : inscricao.Usuario.Nome,
                    senderEmail = inscricao.Usuario.Email.Length > 60 ? inscricao.Usuario.Nome.Substring(0, 60) : inscricao.Usuario.Email,
                    senderPhone = inscricao.Usuario.TelefoneCelular.Length > 9 ? inscricao.Usuario.TelefoneCelular.Substring(0,9) : inscricao.Usuario.TelefoneCelular ,
                    SenderAreaCode = "62"
                };

                var referencia = id.ToString();

                var apiPagSeguro = new PagSeguroAPI();

                var retornoApiPagSeguro = apiPagSeguro.Checkout(emailPagSeguro, tokenPagSeguro, urlCheckout, listaItensPedido, dadosComprador, referencia);

                var paymentUrl = string.Concat($"{urlSitePagueSeguro}/v2/checkout/payment.html?code=", retornoApiPagSeguro);

                return Response(paymentUrl);

            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

    }
}
