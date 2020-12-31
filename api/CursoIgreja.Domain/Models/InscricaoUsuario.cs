using System;
using System.Collections.Generic;
using System.Text;

namespace CursoIgreja.Domain.Models
{
    public class InscricaoUsuario
    {
        public int Id { get; set; }
        public DateTime DataInscricao { get; set; }
        public string Status { get; set; }

        public int UsuarioId { get; set; }
        public Usuarios Usuario { get; set; }
        public int ProcessoInscricaoId { get; set; }
        public ProcessoInscricao ProcessoInscricao { get; set; }
    }
}
