using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Data;
using CursoIgreja.Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CursoIgreja.Repository.Repository.Class
{
    public class MeioPagamentoRepository: RepositoryBase<MeioPagamento>, IMeioPagamentoRepository
    {
        public MeioPagamentoRepository(DataContext dataContext) : base(dataContext)
        {

        }
    }
}
