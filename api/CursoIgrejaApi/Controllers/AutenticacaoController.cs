using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using AutoMapper;
using CursoIgreja.Api.Dtos;
using CursoIgreja.Api.Services;
using CursoIgreja.Domain.Models;
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

                var response = await _usuarioRepository.Buscar(x =>( x.Email.Equals(autenticarDto.Email) || x.Cpf.Equals(autenticarDto.Email)) && x.Senha.Equals(autenticarDto.Senha) && x.Status.Equals("A"));

                var usuario = response.FirstOrDefault();

                if (usuario == null)
                    return Response("Usuário ou senha incorreto!", false);

                var token = TokenService.GenerateToken(usuario, _configuration);

                return Response(new { usuario , token });

            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

        [HttpPost("recuperar-senha")]
        [AllowAnonymous]
        public async Task<IActionResult> RecuperarSenha(string EmailOuCpf)
        {
            try
            {
                //var response = await _usuarioRepository.Buscar(x => (x.Email.Equals(EmailOuCpf) || x.Cpf.Equals(EmailOuCpf)) && x.Status.Equals("A"));

                //var usuario = response.FirstOrDefault();

                var usuario = new Usuarios()
                {
                    Id = 999,
                    Nome = "Vinicius Teste",
                    Email = "vynis2005@gmail.com"
                };

                if (usuario == null)
                    return Response("Email ou senha não cadastrado no banco de dados!", false);

                var possuiEmail = true;

                if (string.IsNullOrEmpty(usuario.Email))
                {
                    possuiEmail = false;
                    usuario.Email = "cursoigrejacristobra@cursoigrejacristobrasil.kinghost.net";
                }

                MailMessage mail = new MailMessage()
                {
                    From = new MailAddress("cursoigrejacristobra@cursoigrejacristobrasil.kinghost.net", "Curso Igreja")
                };

                mail.To.Add(new MailAddress(usuario.Email));
                mail.Subject = "Teste de recuperar senha.";
                mail.Body = "Mensagem";
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;


                using (SmtpClient smtp = new SmtpClient("smtp-web.kinghost.net", 587))
                {
                    smtp.Credentials = new NetworkCredential("cursoigrejacristobra@cursoigrejacristobrasil.kinghost.net", "@Vs130986");
                    //smtp.EnableSsl = true;
                    await smtp.SendMailAsync(mail);
                }

                return Response("Envio com sucesso!");
            }
            catch (Exception ex)
            {
                return ResponseErro(ex);
            }
        }

    }
}
