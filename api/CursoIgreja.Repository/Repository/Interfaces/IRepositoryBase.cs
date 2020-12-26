﻿using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CursoIgreja.Repository.Repository.Interfaces
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {
        Task<bool> Adicionar(TEntity entity);

        Task<bool> Atualizar(TEntity entity);

        Task<bool> Remover(TEntity entity);

        Task<bool> SaveChangesAsync();

        Task<TEntity[]> ObterTodos();

        Task<TEntity> ObterPorId(int id);

        Task<TEntity[]> ObterPorDescricao(string Descricao);

        Task<TEntity[]> Buscar(Expression<Func<TEntity, bool>> predicado);
    }
}
