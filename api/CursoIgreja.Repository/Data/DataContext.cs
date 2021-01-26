using CursoIgreja.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CursoIgreja.Repository.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)  
        {  
        }

        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Congregacao> Congregacao { get; set; }
        public DbSet<Curso> Cursos { get; set; }
        public DbSet<ProcessoInscricao> ProcessoInscricoes { get; set; }
        public DbSet<InscricaoUsuario> InscricaoUsuario { get; set; }
        public DbSet<MeioPagamento> MeiosPagamentos { get; set; }
        public DbSet<ParametroSistema> ParametroSistema { get; set; }
        public DbSet<TransacaoInscricao> TransacaoInscricoes { get; set; }
        public DbSet<LogNotificacao> LogNotificacoes { get; set; }
        public DbSet<LogUsuario> LogUsuarios { get; set; }
        public DbSet<Modulo> Modulos { get; set; }
        public DbSet<Conteudo> Conteudos { get; set; }
        public DbSet<Anexo> Anexos { get; set; }
        public DbSet<ConteudoUsuario> ConteudoUsuarios { get; set; }
        public DbSet<Prova> Provas { get; set; }
        public DbSet<ItemProva> ItemProvas { get; set; }

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
