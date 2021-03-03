using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Data;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CursoIgreja.Repository.Repository.Class
{
    public class ConteudoRepository : RepositoryBase<Conteudo>, IConteudoRepository
    {
        private readonly DataContext _dataContext;

        public ConteudoRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async override Task<Conteudo> ObterPorId(int id)
        {
            IQueryable<Conteudo> query = _dataContext.Conteudos
                                                .Include(c => c.Provas)
                                                .Include(c => c.Modulo);

            return await query.Where(c => c.Id == id).FirstOrDefaultAsync();
        }
    }
}
