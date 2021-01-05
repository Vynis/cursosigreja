using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursoIgreja.Api.Controllers
{
    [ApiController]
    [Route("api/processo-inscricao")]
    public class ProcessoInscricaoController : ControllerBase
    {
        private readonly IProcessoInscricaoRepository _processoInscricaoRepository;
        private readonly IMapper _mapper;

        public ProcessoInscricaoController(IProcessoInscricaoRepository processoInscricaoRepository, IMapper mapper)
        {
            _processoInscricaoRepository = processoInscricaoRepository;
            _mapper = mapper;
        }

        [HttpGet("cursos-inscricoes-abertas")]
        [AllowAnonymous]
        public async Task<IActionResult> CursosInscricoesAbertas()
        {
            try
            {
                var listaBd = await _processoInscricaoRepository.Buscar(x => x.Status.Equals("A") && DateTime.Now >= x.DataInicial && DateTime.Now <= x.DataFinal);

                return Response(listaBd);

            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        [HttpGet("cursos-inscricoes-futuras")]
        public async Task<IActionResult> CursosInscricoesFuturas()
        {
            try
            {
                var listaBd = await _processoInscricaoRepository.Buscar(x => x.Status.Equals("A") && x.DataFinal > DateTime.Now &&  x.DataFinal > DateTime.Now );

                return Response(listaBd);

            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }



    }
}
