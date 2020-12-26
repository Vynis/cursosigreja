import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.scss']
})
export class InscricaoComponent implements OnInit, AfterViewInit {

  @ViewChild('wizard', {static: true}) el: ElementRef;
  submitted = false;
  exiteErro = false;
  formulario: FormGroup;

  model: any = {
		address1: 'Address Line 1',
		address2: 'Address Line 2',
		postcode: '3000',
		city: 'Melbourne',
		state: 'VIC',
		country: 'AU',
		package: 'Complete Workstation (Monitor, Computer, Keyboard & Mouse)',
		weight: '25',
		width: '110',
		height: '90',
		length: '150',
		delivery: 'overnight',
		packaging: 'regular',
		preferreddelivery: 'morning',
		locaddress1: 'Address Line 1',
		locaddress2: 'Address Line 2',
		locpostcode: '3072',
		loccity: 'Preston',
		locstate: 'VIC',
		loccountry: 'AU',
	};

  constructor(
	private fb: FormBuilder
  ) { }

  ngOnInit() {
	  this.createForm();
  }

  createForm() {
	  this.formulario = this.fb.group({
		nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
		cpf: ['',  [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
		dataNascimento: ['', [Validators.required]]
	  });
  }

  ngAfterViewInit(): void {
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
    });

    let teste = this.model;
    
		// Validation before going to next page
		wizard.on('beforeNext', (wizardObj) => {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation

      // validate the form and use below function to stop the wizard's step
		  //	 wizardObj.stop();
		});

		// Change event
		wizard.on('change', () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}

	onSubmit() {
		this.submitted = true;

	}
}
