import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoModel } from '../../../@core/models/curso.model';

@Component({
  selector: 'app-cursos-cadastro',
  templateUrl: './cursos-cadastro.component.html',
  styleUrls: ['./cursos-cadastro.component.scss']
})
export class CursosCadastroComponent implements OnInit {
  formulario: FormGroup;
  curso: CursoModel;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.curso = new CursoModel();
    this.createForm();
  }

  createForm() {
    this.formulario = this.fb.group({
      titulo: [this.curso.titulo,[Validators.required] ],
      cargaHoraria: [this.curso.cargaHoraria,[Validators.required] ],
      status: [this.curso.status,[Validators.required] ],
      descricao: [this.curso.descricao,[Validators.required] ]
    });
  }

}
