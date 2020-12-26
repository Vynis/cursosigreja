using System;
using System.Collections.Generic;
using System.Text;

namespace CursoIgreja.Domain.Models
{
    public class Congregacao
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Status { get; set; }
        public List<Usuarios> Usuarios { get; set; }

    }
}
