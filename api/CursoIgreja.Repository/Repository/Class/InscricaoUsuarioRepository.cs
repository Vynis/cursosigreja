using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Data;
using CursoIgreja.Repository.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CursoIgreja.Repository.Repository.Class
{
    public class InscricaoUsuarioRepository : RepositoryBase<InscricaoUsuario>, IInscricaoUsuarioRepository
    {
        private readonly DataContext _dataContext;

        public InscricaoUsuarioRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async override Task<InscricaoUsuario[]> Buscar(Expression<Func<InscricaoUsuario, bool>> predicado)
        {
            IQueryable<InscricaoUsuario> query = _dataContext.InscricaoUsuario
                                                                .Where(predicado)
                                                                .Include(c => c.Usuario)
                                                                .Include(c => c.ProcessoInscricao)
                                                                .Include(c => c.ProcessoInscricao.Curso)
                                                                .Include(c => c.TransacaoInscricoes);

            return await query.AsNoTracking().ToArrayAsync();
        }

        public async override Task<InscricaoUsuario[]> ObterTodos()
        {
            IQueryable<InscricaoUsuario> query = _dataContext.InscricaoUsuario
                                                                .Include(c => c.Usuario)
                                                                .Include(c => c.ProcessoInscricao)
                                                                .Include(c => c.TransacaoInscricoes);

            return await query.AsNoTracking().ToArrayAsync();
        }

        public async override Task<InscricaoUsuario> ObterPorId(int id)
        {
            IQueryable<InscricaoUsuario> query = _dataContext.InscricaoUsuario
                                                                .Include(c => c.Usuario)
                                                                .Include(c => c.ProcessoInscricao)
                                                                .Include(c => c.ProcessoInscricao.Curso)
                                                                .Include(c => c.ProcessoInscricao.Curso.Modulo)
                                                                .Include(c => c.Usuario.ProvaUsuarios)
                                                                .Include("ProcessoInscricao.Curso.Modulo.Conteudos")
                                                                .Include("ProcessoInscricao.Curso.Modulo.LiberacaoModulos")
                                                                .Include("ProcessoInscricao.Curso.Modulo.Conteudos.Anexos")
                                                                .Include("ProcessoInscricao.Curso.Modulo.Conteudos.ConteudoUsuarios")
                                                                .Include("ProcessoInscricao.Curso.Modulo.Conteudos.Provas")
                                                                .Include("ProcessoInscricao.Curso.Modulo.Conteudos.Provas.ItensProvas")
                                                                .Include(c => c.TransacaoInscricoes);

            return await query.Where(c => c.Id == id).FirstOrDefaultAsync();
        }
    }
}
