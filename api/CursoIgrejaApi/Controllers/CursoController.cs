using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursoIgreja.Api.Controllers
{
    [ApiController]
    [Route("api/curso")]
    public class CursoController : ControllerBase
    {
        private readonly ICursoRepository _cursoRepository;

        public CursoController(ICursoRepository cursoRepository)
        {
            _cursoRepository = cursoRepository;
        }

        [HttpGet("buscar-todos")]
        public async Task<IActionResult> BuscarTodos()
        {
            try
            {
                return Response(await _cursoRepository.ObterTodos());
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }


        [HttpPost("busca-com-filtro")]
        public async Task<IActionResult> BuscarComFiltro([FromBody]PaginationFilter filtro)
        {
            try
            {
                if (filtro.Filtro.Count() == 0)
                    return Response(await _cursoRepository.ObterTodos());

                return Response(await _cursoRepository.BuscaFiltroDinamico(filtro));
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }


    }
}
