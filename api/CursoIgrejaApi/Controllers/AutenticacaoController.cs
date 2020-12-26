using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CursoIgreja.Api.Dtos;
using CursoIgreja.Api.Services;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CursoIgreja.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AutenticacaoController : ControllerBase
    {

        private readonly IUsuariosRepository _usuarioRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AutenticacaoController(IUsuariosRepository usuariosRepository, IConfiguration configuration, IMapper mapper)
        {
            _usuarioRepository = usuariosRepository;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost()]
        [AllowAnonymous]
        public async Task<IActionResult> Autenticar(AutenticarDto autenticarDto)
        {
            try
            {
                autenticarDto.Senha = SenhaHashService.CalculateMD5Hash(autenticarDto.Senha);

                var response = await _usuarioRepository.Buscar(x => x.Email.Equals(autenticarDto.Email) && x.Senha.Equals(autenticarDto.Senha) && x.Status.Equals("A"));

                var usuario = response.FirstOrDefault();

                if (usuario == null)
                    return Response("Usuário ou senha incorreto!", false);

                var token = TokenService.GenerateToken(usuario, _configuration);

                return Response(new { usuario = _mapper.Map<UsuarioAutDto>(usuario), token });

            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

    }
}
