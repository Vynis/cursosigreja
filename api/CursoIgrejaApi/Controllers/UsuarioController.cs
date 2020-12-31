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

        [HttpPost("cadastrar")]
        [AllowAnonymous]
        public async Task<IActionResult> Cadastrar(Usuarios usuario)
        {
            try
            {
                //Valida se usuario já existe no banco
                var verficaCadastro = new Usuarios();

                if (!string.IsNullOrEmpty(usuario.Email))
                    verficaCadastro = _usuarioRepository.Buscar(x => x.Email.Equals(usuario.Email)).Result.FirstOrDefault();
                else
                    verficaCadastro = _usuarioRepository.Buscar(x => x.Cpf.Equals(usuario.Cpf)).Result.FirstOrDefault();

                if (verficaCadastro == null)
                    return Response("Cadastro já se encontra na base de dados!", false);

                usuario.Senha = SenhaHashService.CalculateMD5Hash(usuario.Senha);

                //Salva os dados
                var response = await _usuarioRepository.Adicionar(usuario);

                if (response)
                    return Response(usuario);

                return Response("Cadastro não realizado", false);
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

    }
}
