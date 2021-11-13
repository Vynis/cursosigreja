using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursoIgreja.Api.Controllers
{
    [ApiController]
    [Route("api/relatorio")]
    public class RelatorioController : ControllerBase
    {
        private readonly IVwContagemInscricaoCongregacaoRepository _vwContagemInscricaoCongregacaoRepository;
        private readonly IVwContagemInscricaoCursoRepository _vwContagemInscricaoCursoRepository;

        public RelatorioController(IVwContagemInscricaoCongregacaoRepository vwContagemInscricaoCongregacaoRepository, IVwContagemInscricaoCursoRepository vwContagemInscricaoCursoRepository)
        {
            _vwContagemInscricaoCongregacaoRepository = vwContagemInscricaoCongregacaoRepository;
            _vwContagemInscricaoCursoRepository = vwContagemInscricaoCursoRepository;
        }

        [HttpPost("busca-contagem-inscricao-congregacao")]
        [AllowAnonymous]
        public async Task<IActionResult> BuscaContagemInscricaoCongregacao([FromBody] PaginationFilter filtro)
        {
            try
            {
                if (filtro.Filtro.Count() == 0)
                    return Response(await _vwContagemInscricaoCongregacaoRepository.ObterTodos());

                return Response(await _vwContagemInscricaoCongregacaoRepository.BuscaFiltroDinamico(filtro));
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }


        [HttpPost("busca-contagem-inscricao-curso")]
        [AllowAnonymous]
        public async Task<IActionResult> BuscaContagemInscricaoCurso([FromBody] PaginationFilter filtro)
        {
            try
            {
                if (filtro.Filtro.Count() == 0)
                    return Response(await _vwContagemInscricaoCursoRepository.ObterTodos());

                return Response(await _vwContagemInscricaoCursoRepository.BuscaFiltroDinamico(filtro));
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }
    }
}
