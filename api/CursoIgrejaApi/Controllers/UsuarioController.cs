using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CursoIgreja.Api.Services;
using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursoIgreja.Api.Controllers
{
    [ApiController]
    [Route("api/usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuariosRepository _usuarioRepository;
        private readonly IMapper _mapper;

        public UsuarioController(IUsuariosRepository usuariosRepository, IMapper mapper)
        {
            _usuarioRepository = usuariosRepository;
            _mapper = mapper;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Cadastrar(Usuarios usuario)
        {
            try
            {

                //Valida se usuario já existe no banco
                var verficaCadastro = await _usuarioRepository.Buscar(x => x.Email.Equals(usuario.Email));

                if (verficaCadastro.Any())
                    return Response("Cadastro já se encontra na base de dados!", false);

                var usuarioModel = _mapper.Map<Usuarios>(usuario);
                usuarioModel.Senha = SenhaHashService.CalculateMD5Hash(usuarioModel.Senha);

                //Salva os dados
                var response = await _usuarioRepository.Adicionar(usuarioModel);

                if (response)
                    return Response("Cadastro realizado com sucesso!");

                return Response("Cadastro não realizado", false);
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

    }
}
