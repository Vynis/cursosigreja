using System;
using System.Collections.Generic;
using System.Text;

namespace CursoIgreja.Domain.Models
{
    public class ProcessoInscricao
    {
        public int Id { get; set; }
        public DateTime DataInicial { get; set; }
        public DateTime DataFinal { get; set; }
        public string ConfiguraPeriodo { get; set; }
        public string Tipo { get; set; }
        public string Status { get; set; }
        public decimal  Valor { get; set; }

        public int CursoId { get; set; }
        public Curso Curso { get; set; }

        public List<InscricaoUsuario> InscricaoUsuarios { get; set; }

    }
}
