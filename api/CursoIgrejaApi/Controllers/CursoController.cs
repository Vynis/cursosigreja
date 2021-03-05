using AutoMapper;
using CursoIgreja.Api.Dtos;
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

                //Obter lista prova realizado
                var listaProvaUsuario = await _provaUsuarioRepository.Buscar(x => x.UsuarioId.Equals(Convert.ToInt32(User.Identity.Name)));

                //Busca o ultimo conteudo do usuario
                var retornoConteudoUsuario = await _conteudoUsuarioRepository.Buscar(x => x.UsuariosId == Convert.ToInt32(User.Identity.Name) && x.Conteudo.Modulo.CursoId == retornoDadosInscricao.ProcessoInscricao.CursoId);

                if (retornoConteudoUsuario.Length > 0)
                {
                    var ultimoConteudo = retornoConteudoUsuario.OrderByDescending(c => c.DataConclusao).Select(c => c.Conteudo).FirstOrDefault();

                    await SalvarVisualizacaoUsuario(ultimoConteudo.Id);

                    PreenchConteudoConcluido(ultimoConteudo, listaProvaUsuario);

                    return Response(_mapper.Map<ConteudoDto>(ultimoConteudo));
                }

                var ultimoConteudoVisualizado = retornoDadosInscricao.ProcessoInscricao.Curso.Modulo.FirstOrDefault().Conteudos[0];

                await SalvarVisualizacaoUsuario(ultimoConteudoVisualizado.Id);

                PreenchConteudoConcluido(ultimoConteudoVisualizado, listaProvaUsuario);

                return Response(_mapper.Map<ConteudoDto>(ultimoConteudoVisualizado));
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

                //Obter lista prova realizado
                var listaProvaUsuario = await _provaUsuarioRepository.Buscar(x => x.UsuarioId.Equals(Convert.ToInt32(User.Identity.Name)));

                PreenchConteudoConcluido(response, listaProvaUsuario);

                if (!await ValidaConteudoExibicao(response, listaProvaUsuario))
                    return Response(false);

                await SalvarVisualizacaoUsuario(response.Id);

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
                PreencheModuloConteudoConcluido(obterModulosCurso, listaProvaUsuario);

                if (string.IsNullOrEmpty(acao) || (acao != "P" && acao != "A"))
                    return Response("Ação não definida", false);

                var moduloAtual = obterModulosCurso.ToList().Where(x => x.Id.Equals(conteudoAtual.ModuloId)).FirstOrDefault();

                if (acao.Equals("P"))
                {
                    var retornaProximo = moduloAtual.Conteudos.Where(x => x.Ordem > conteudoAtual.Ordem).FirstOrDefault();

                    if (retornaProximo != null)
                    {
                        
                        if (!await ValidaConteudoExibicao(retornaProximo, listaProvaUsuario))
                            return Response(false);


                        await SalvarVisualizacaoUsuario(retornaProximo.Id);
                        return Response(_mapper.Map<ConteudoDto>(retornaProximo));
                    }
                       
                    var proximoModulo = obterModulosCurso.Where(c => c.Ordem > moduloAtual.Ordem).FirstOrDefault();

                    if (proximoModulo == null)
                        return Response("Ação Proxima não definida", false);

                    if (!await ValidaConteudoExibicao(proximoModulo.Conteudos.FirstOrDefault(), listaProvaUsuario))
                        return Response(false);

                    await SalvarVisualizacaoUsuario(proximoModulo.Conteudos.FirstOrDefault().Id);

                    return Response(_mapper.Map<ConteudoDto>(proximoModulo.Conteudos.FirstOrDefault()));
                }
                else
                {
                    var retonraAnterior = moduloAtual.Conteudos.Where(x => x.Ordem < conteudoAtual.Ordem).LastOrDefault();

                    if (retonraAnterior != null)
                    {
                        await SalvarVisualizacaoUsuario(retonraAnterior.Id);
                        return Response(_mapper.Map<ConteudoDto>(retonraAnterior));
                    }
                        
                    var anteriorModulo = obterModulosCurso.Where(c => c.Ordem < moduloAtual.Ordem).LastOrDefault();

                    if (anteriorModulo == null)
                        return Response("Ação Anterior não definida", false);

                    await SalvarVisualizacaoUsuario(anteriorModulo.Conteudos.LastOrDefault().Id);

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

                PreencheModuloConteudoConcluido(retorno, listaProvaUsuario);

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

        #region Engine

        public async Task<bool> SalvarVisualizacaoUsuario(int idConteudo)
        {
            try
            {
                var valida = await _conteudoUsuarioRepository.Buscar(x => x.ConteudoId == idConteudo && x.UsuariosId == Convert.ToInt32(User.Identity.Name));

                if (valida.Any())
                    return false;

                var conteudoUsuario = new ConteudoUsuario();

                conteudoUsuario.DataConclusao = DateTime.Now;
                conteudoUsuario.UsuariosId = Convert.ToInt32(User.Identity.Name);
                conteudoUsuario.Concluido = "S";
                conteudoUsuario.ConteudoId = idConteudo;

                var retorno = await _conteudoUsuarioRepository.Adicionar(conteudoUsuario);

                if (!retorno)
                    return false;

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private void PreencheModuloConteudoConcluido(Domain.Models.Modulo[] retorno, Domain.Models.ProvaUsuario[] listaProvaUsuario)
        {
            foreach (var modulo in retorno)
                foreach (var conteudo in modulo.Conteudos)
                    PreenchConteudoConcluido(conteudo, listaProvaUsuario);
        }

        private void PreenchConteudoConcluido(Conteudo conteudo, Domain.Models.ProvaUsuario[] listaProvaUsuario)
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
                if (conteudo.ConteudoUsuarios != null)
                    conteudo.ConteudoConcluido = conteudo.ConteudoUsuarios.Exists(x => x.ConteudoId == conteudo.Id && x.UsuariosId == Convert.ToInt32(User.Identity.Name) && x.Concluido.Equals("S"));
        }

        private async Task<bool> ValidaConteudoExibicao(Conteudo conteudoSelecionado, Domain.Models.ProvaUsuario[] listaProvaUsuario)
        {
            try
            {
                //Obter todos os modulos do curso
                var obterModulosCurso = await _moduloRepository.Buscar(x => x.CursoId == conteudoSelecionado.Modulo.CursoId);

                PreencheModuloConteudoConcluido(obterModulosCurso, listaProvaUsuario);

                foreach (var mod in obterModulosCurso)
                {
                    var validarProva = true;

                    validarProva = mod.Conteudos.Where(c => (c.Tipo.Equals("PR") || c.Tipo.Equals("PA")) && !c.ConteudoConcluido).Count() > 0 ? false : true;

                    if (!validarProva)
                    {
                        if (conteudoSelecionado.Modulo.Ordem > mod.Ordem)
                            return false;
                    }
                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        

        #endregion
    }
}
