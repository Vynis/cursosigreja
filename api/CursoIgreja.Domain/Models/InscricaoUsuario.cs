using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CursoIgreja.Domain.Models
{
    [Table("inscricaousuario")]
    public class InscricaoUsuario
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("datainscricao")]
        public DateTime DataInscricao { get; set; }
        [Column("status")]
        public string Status { get; set; }
        [Column("dataconfirmacao")]
        public DateTime DataConfirmacao { get; set; }

        [Column("usuarioid")]
        public int UsuarioId { get; set; }
        public Usuarios Usuario { get; set; }
        [Column("processoinscricaoid")]
        public int ProcessoInscricaoId { get; set; }
        public ProcessoInscricao ProcessoInscricao { get; set; }

        public List<TransacaoInscricao> TransacaoInscricoes { get; set; }
    }
}
