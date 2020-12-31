using System;
using System.Collections.Generic;
using System.Text;

namespace CursoIgreja.Domain.Models
{
    public class MeioPagamento
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
    }
}
