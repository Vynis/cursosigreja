﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CursoIgreja.Domain.Models
{
    [Table("processoinscricoes")]
    public class ProcessoInscricao
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("datainicial")]
        public DateTime DataInicial { get; set; }
        [Column("datafinal")]
        public DateTime DataFinal { get; set; }
        [Column("configuraperiodo")]
        public string ConfiguraPeriodo { get; set; }
        [Column("tipo")]
        public string Tipo { get; set; }
        [Column("status")]
        public string Status { get; set; }
        [Column("valor")]
        public decimal  Valor { get; set; }

        public DateTime? DataInicalPagto { get; set; }
        public DateTime? DataFinalPagto { get; set; }

        public DateTime? DataInicioVisualizacaoCurso { get; set; }
        public DateTime? DataFinalVisualizacaoCurso { get; set; }

        public string Ciclo { get; set; }
        public string Ano { get; set; }

        [Column("cursoid")]
        public int CursoId { get; set; }
        public Curso Curso { get; set; }

        public List<InscricaoUsuario> InscricaoUsuarios { get; set; }
        public List<LiberacaoModulo> LiberacaoModulos { get; set; }

    }
}
