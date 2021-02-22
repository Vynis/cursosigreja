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

        [HttpGet("buscar-por-id/{id}")]
        public async Task<IActionResult> BuscaPorId(int id)
        {
            try
            {
                return Response(await _cursoRepository.ObterPorId(id));
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        [HttpPost("adcionar")]
        public async Task<IActionResult> Add(Curso curso)
        {
            try
            {
                var response = await _cursoRepository.Adicionar(curso);

                if (!response)
                    return Response("Erro ao cadastrar.", false);

                return Response("Cadastro realizado com sucesso!");
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        [HttpPut("alterar")]
        public async Task<IActionResult> Alt(Curso curso)
        {
            try
            {
                var valida = await _cursoRepository.ObterPorId(curso.Id);

                if (valida == null)
                    return Response("Id não enconrado", false);

                var response = await _cursoRepository.Atualizar(curso);

                if (!response)
                    return Response("Erro ao atualizar.", false);

                return Response("Atualização realizada com sucesso!");
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }


    }
}
