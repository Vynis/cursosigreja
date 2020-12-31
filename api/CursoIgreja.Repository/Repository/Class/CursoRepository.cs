using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Data;
using CursoIgreja.Repository.Repository.Interfaces;

namespace CursoIgreja.Repository.Repository.Class
{
    public class CursoRepository : RepositoryBase<Curso>, ICursoRepository
    {
        public CursoRepository(DataContext dataContext) : base(dataContext)
        {

        }
    }
}
