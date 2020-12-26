﻿using CursoIgreja.Domain.Models;
using CursoIgreja.Repository.Data;
using CursoIgreja.Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CursoIgreja.Repository.Repository.Class
{
    public class CongregacaoRepository : RepositoryBase<Congregacao>, ICongregacaoRepository
    {
        public CongregacaoRepository(DataContext dataContext) : base(dataContext)
        {

        }
    }
}
