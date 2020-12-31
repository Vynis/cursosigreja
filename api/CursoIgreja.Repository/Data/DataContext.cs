using CursoIgreja.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CursoIgreja.Repository.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)  {  }

        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Congregacao> Congregacao { get; set; }
        public DbSet<Curso> Cursos { get; set; }
        public DbSet<ProcessoInscricao> ProcessoInscricoes { get; set; }
        public DbSet<InscricaoUsuario> InscricaoUsuario { get; set; }
        public DbSet<MeioPagamento> MeiosPagamentos { get; set; }
        public DbSet<ParametroSistema> ParametroSistema { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Retira o delete on cascade
            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
            .SelectMany(t => t.GetForeignKeys())
            .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            base.OnModelCreating(modelBuilder);
        }
    }
}
