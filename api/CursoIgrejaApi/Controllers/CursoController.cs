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

        [HttpGet("carrega-conteudo-curso/{id}/{idConteudo}")]
        public async Task<IActionResult> CarregaConteudoCurso(int id, int idConteudo)
        {
            try
            {    
                //Retorna os dados da inscricao
                var retornoDadosInscricao = await _inscricaoUsuarioRepository.ObterPorId(id);

                if (retornoDadosInscricao.UsuarioId != Convert.ToInt32(User.Identity.Name))
                    return Response("Busca invalida", false);

                var response = await _conteudoRepository.ObterPorId(idConteudo);

                return Response(_mapper.Map<ConteudoDto>(response));
            }
            catch (Exception ex)
            {

                return ResponseErro(ex);
            }
        }

        [HttpGet("carrega-conteudo-acao/{id}/{idConteudo}/{acao}")]
        public async Task<IActionResult> CarregaConteudoCursoAcao(int id, int idConteudo, string acao)
        {
            try
            {
                //Valida se esta acesso do curso
                var retornoDadosInscricao = await _inscricaoUsuarioRepository.ObterPorId(id);

                if (retornoDadosInscricao.UsuarioId != Convert.ToInt32(User.Identity.Name))
                    return Response("Busca invalida", false);

                //Obter conteudo atual
                var conteudoAtual = await _conteudoRepository.ObterPorId(idConteudo);

                if (conteudoAtual == null)
                    return Response("Conteudo nao encontrado", false);

                //Obter todos os modulos do curso
                var obterModulosCurso = await _moduloRepository.Buscar(x => x.CursoId == conteudoAtual.Modulo.CursoId);

                if (obterModulosCurso.Length <= 0)
                    return Response("Modulo nao encontrado", false);

                //Obter lista prova realizado
                var listaProvaUsuario = await _provaUsuarioRepository.Buscar(x => x.UsuarioId.Equals(Convert.ToInt32(User.Identity.Name)));

                //Preenche o conteudo concluido
                PreencheConteudoConcluido(obterModulosCurso, listaProvaUsuario);

                if (string.IsNullOrEmpty(acao) || (acao != "P" && acao != "A"))
                    return Response("Ação não definida", false);

                var moduloAtual = obterModulosCurso.ToList().Where(x => x.Id.Equals(conteudoAtual.ModuloId)).FirstOrDefault();

                if (acao.Equals("P"))
                {
                    var retornaProximo = moduloAtual.Conteudos.Where(x => x.Ordem > conteudoAtual.Ordem).FirstOrDefault();

                    if (retornaProximo != null)
                        return Response(_mapper.Map<ConteudoDto>(retornaProximo));


                    var proximoModulo = obterModulosCurso.Where(c => c.Ordem > moduloAtual.Ordem).FirstOrDefault();

                    if (proximoModulo == null)
                        return Response("Ação Proxima não definida", false);

                    return Response(_mapper.Map<ConteudoDto>(proximoModulo.Conteudos.FirstOrDefault()));
                }
                else
                {
                    var retonraAnterior = moduloAtual.Conteudos.Where(x => x.Ordem < conteudoAtual.Ordem).LastOrDefault();

                    if (retonraAnterior != null)
                        return Response(_mapper.Map<ConteudoDto>(retonraAnterior));

                    var anteriorModulo = obterModulosCurso.Where(c => c.Ordem < moduloAtual.Ordem).LastOrDefault();

                    if (anteriorModulo == null)
                        return Response("Ação Anterior não definida", false);

                    return Response(_mapper.Map<ConteudoDto>(anteriorModulo.Conteudos.LastOrDefault()));
                }
            }
            catch (Exception ex)
            {

                return ResponseErro(ex);
            }
        }

        [HttpGet("carrega-modulo-curso/{id}")]
        public async Task<IActionResult> CarregaModuloCurso(int id)
        {
            try
            {
                //Valida se esta acesso do curso
                var retornoDadosInscricao = await _inscricaoUsuarioRepository.ObterPorId(id);

                if (retornoDadosInscricao.UsuarioId != Convert.ToInt32(User.Identity.Name))
                    return Response("Busca invalida", false);

                var retorno = await _moduloRepository.Buscar(x => x.CursoId.Equals(retornoDadosInscricao.ProcessoInscricao.CursoId));

                var listaProvaUsuario = await _provaUsuarioRepository.Buscar(x => x.UsuarioId.Equals(Convert.ToInt32(User.Identity.Name)));

                PreencheConteudoConcluido(retorno, listaProvaUsuario);

                var listaLiberacaoModulo = new List<ModuloDto>();

                foreach(var modulo in retorno)
                {
                    if (modulo.LiberacaoModulos.Count > 0)
                    {
                        if (DateTime.Now > modulo.LiberacaoModulos.FirstOrDefault().DataInicio)
                            listaLiberacaoModulo.Add(_mapper.Map<ModuloDto>(modulo));
                    }
                    else
                        listaLiberacaoModulo.Add(_mapper.Map<ModuloDto>(modulo));
                }


                return Response(listaLiberacaoModulo.OrderBy(c => c.Ordem));
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        private void PreencheConteudoConcluido(Domain.Models.Modulo[] retorno, Domain.Models.ProvaUsuario[] listaProvaUsuario)
        {
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
        }
    }
}
