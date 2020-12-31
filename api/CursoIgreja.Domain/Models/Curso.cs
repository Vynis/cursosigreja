using System;
using System.Collections.Generic;
using System.Text;

namespace CursoIgreja.Domain.Models
{
    public class Curso
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public DateTime DataCadastro { get; set; }
        public string Status { get; set; }
        public string Descricao { get; set; }
        public string CargaHoraria { get; set; }
        public string ArquivoImg { get; set; }

        public List<ProcessoInscricao> ProcessoInscricao { get; set; }
    }
}
