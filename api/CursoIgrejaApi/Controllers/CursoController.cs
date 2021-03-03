using AutoMapper;
using CursoIgreja.Api.Dtos;
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
        private readonly IInscricaoUsuarioRepository _inscricaoUsuarioRepository;
        private readonly IProvaUsuarioRepository _provaUsuarioRepository;
        private readonly IModuloRepository _moduloRepository;
        private readonly IConteudoUsuarioRepository _conteudoUsuarioRepository;
        private readonly IConteudoRepository _conteudoRepository;
        private readonly IMapper _mapper;

        public CursoController(IInscricaoUsuarioRepository inscricaoUsuarioRepository,
                               IProvaUsuarioRepository provaUsuarioRepository, 
                               IModuloRepository moduloRepository, 
                               IConteudoUsuarioRepository conteudoUsuarioRepository, 
                               IConteudoRepository conteudoRepository,
                               IMapper mapper)
        {
            _inscricaoUsuarioRepository = inscricaoUsuarioRepository;
            _provaUsuarioRepository = provaUsuarioRepository;
            _moduloRepository = moduloRepository;
            _conteudoUsuarioRepository = conteudoUsuarioRepository;
            _conteudoRepository = conteudoRepository;
            _mapper = mapper;
        }

        [HttpGet("carrega-curso/{id}")]
        public async Task<IActionResult> CarregaCurso(int id)
        {
            try
            {
                //Retorna os dados da inscricao
                var retornoDadosInscricao = await _inscricaoUsuarioRepository.ObterPorId(id);

                if (retornoDadosInscricao.UsuarioId != Convert.ToInt32(User.Identity.Name))
                    return Response("Busca invalida", false);

                //Busca o ultimo conteudo do usuario
                var retornoConteudoUsuario = await _conteudoUsuarioRepository.Buscar(x => x.UsuariosId == Convert.ToInt32(User.Identity.Name) && x.Conteudo.Modulo.CursoId == retornoDadosInscricao.ProcessoInscricao.CursoId);

                if (retornoConteudoUsuario.Length > 0)
                {
                    var ultimoConteudo = retornoConteudoUsuario.OrderByDescending(c => c.DataConclusao).Select(c => c.Conteudo).FirstOrDefault();

                    return Response(_mapper.Map<ConteudoDto>(ultimoConteudo));
                }

                return Response(_mapper.Map<ConteudoDto>(retornoDadosInscricao.ProcessoInscricao.Curso.Modulo.FirstOrDefault().Conteudos[0]));
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        [HttpGet("carrega-conteudo-curso/{id}")]
        public async Task<IActionResult> CarregaConteudoCurso(int id)
        {
            try
            {
                var response = await _conteudoRepository.ObterPorId(id);

                return Response(_mapper.Map<ConteudoDto>(response));
            }
            catch (Exception ex)
            {

                return ResponseErro(ex);
            }
        }

        [HttpGet("carrega-conteudo-acao/{id}/{acao}")]
        public async Task<IActionResult> CarregaConteudoCursoAcao(int id, string acao)
        {
            try
            {
                var conteudoAtual = await _conteudoRepository.ObterPorId(id);

                if (conteudoAtual == null)
                    return Response("Conteudo nao encontrado", false);

                var obterModulosCurso = await _moduloRepository.Buscar(x => x.CursoId == conteudoAtual.Modulo.CursoId);

                if (obterModulosCurso.Length <= 0)
                    return Response("Modulo nao encontrado", false);

                //return Response(_mapper.Map<ConteudoDto>(response));

                return Response();
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

                var listaProvaUsuario = await _provaUsuarioRepository.Buscar(x => x.UsuarioId.Equals(Convert.ToInt32(User.Identity.Name)));

                foreach (var modulo in retorno)
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

                return Response(retorno);
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }
    }
}
