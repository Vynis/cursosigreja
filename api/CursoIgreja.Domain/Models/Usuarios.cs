using System;
using System.Collections.Generic;
using System.Text;

namespace CursoIgreja.Domain.Models
{
    public class Usuarios
    {
        public Usuarios()
        {
            Status = "A";
            DataCadastro = DateTime.Now;
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Status { get; set; }
        public DateTime DataCadastro { get; set; }
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string TipoAcesso { get; set; }

        public string Rua { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Numero { get; set; }
        public string Cep { get; set; }
        public string TelefoneCelular { get; set; }
        public string TelefoneFixo { get; set; }

        public string CongregaHaQuantoTempo { get; set; }
        public string RecebePastoreiro { get; set; }
        public string QuemPastoreia { get; set; }
        public string FrequentaCelula { get; set; }
        public string QuemLider { get; set; }

        public int CongregacaoId { get; set; }
        public Congregacao Congregacao { get; set; }

        public List<InscricaoUsuario> InscricaoUsuarios { get; set; }

    }
}

