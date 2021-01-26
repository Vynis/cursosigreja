using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursoIgreja.Api.Controllers
{
    [ApiController]
    [Route("api/modulo")]
    public class ModuloController : ControllerBase
    {
        private readonly IModuloRepository _moduloRepository;

        public ModuloController(IModuloRepository moduloRepository)
        {
            _moduloRepository = moduloRepository;
        }


        [HttpGet("buscar-modulos")]
        public async Task<IActionResult> BuscarModulos()
        {
            try
            {
                var modulos = await _moduloRepository.ObterTodos();

                return Response(modulos);
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }


        [HttpGet("buscar-modulo-curso/{idCurso}")]
        public async Task<IActionResult> BuscarModuloCurso(int idCurso)
        {
            try
            {
                var retorno = await _moduloRepository.Buscar(x => x.CursoId.Equals(idCurso));

                foreach (var modulo in retorno)
                    foreach(var conteudo in modulo.Conteudos)
                        conteudo.ConteudoConcluido = conteudo.ConteudoUsuarios.Exists(x => x.ConteudoId == conteudo.Id && x.UsuariosId == Convert.ToInt32(User.Identity.Name) && x.Concluido.Equals("S"));

                return Response(retorno);
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }


    }
}
