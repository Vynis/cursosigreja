using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Data;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CursoIgreja.Repository.Repository.Class
{
    public class CursoRepository : RepositoryBase<Curso>, ICursoRepository
    {
        private readonly DataContext _dataContext;

        public CursoRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async override Task<Curso[]> Buscar(Expression<Func<Curso, bool>> predicado)
        {
            IQueryable<Curso> query = _dataContext.Cursos
                                                                .Where(predicado)
                                                                .Include(c => c.Modulo);

            return await query.AsNoTracking().ToArrayAsync();
        }

        public async override Task<Curso[]> ObterTodos()
        {
            IQueryable<Curso> query = _dataContext.Cursos
                                                                .Include(c => c.Modulo);

            return await query.AsNoTracking().ToArrayAsync();
        }

        public async override Task<Curso> ObterPorId(int id)
        {
            IQueryable<Curso> query = _dataContext.Cursos
                                                                .Include(c => c.Modulo);

            return await query.Where(c => c.Id == id).FirstOrDefaultAsync();
        }
    }
}
