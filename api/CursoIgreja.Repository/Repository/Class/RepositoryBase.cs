using CursoIgreja.Repository.Data;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CursoIgreja.Repository.Repository.Class
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {
        private readonly DataContext _dataContext;

        public RepositoryBase(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public virtual async Task<bool> SaveChangesAsync()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> Adicionar(TEntity entity)
        {
            _dataContext.Add(entity);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> Atualizar(TEntity entity)
        {
            _dataContext.Update(entity);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> Remover(TEntity entity)
        {
            _dataContext.Remove(entity);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<TEntity[]> Buscar(Expression<Func<TEntity, bool>> predicado)
        {
            return await _dataContext.Set<TEntity>().Where(predicado).ToArrayAsync();
        }

        public virtual async Task<TEntity> ObterPorId(int id)
        {
            return await _dataContext.Set<TEntity>().FindAsync(id);
        }

        public virtual async Task<TEntity[]> ObterTodos()
        {
            return await _dataContext.Set<TEntity>().ToArrayAsync();
        }

        public virtual async Task<TEntity[]> ObterPorDescricao(string Descricao)
        {
            return await Buscar(b => b.GetType().Name.Contains("Name"));
        }
    }
}
