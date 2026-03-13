import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filtro-pacientes',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './filtro.pacientes.componente.html',
  styleUrl: './filtro.pacientes.componente.css'
})
export class FiltroPacientesComponent {
  @Output() buscar = new EventEmitter<any>();
  private fb = inject(FormBuilder);

  filtroForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.minLength(3)]],
    riesgo: [''],
    discapacidad: [''],
    dia: [''],
    mes: [''],
    anio: ['']
  });

  esCampoValido(nombreCampo: string): boolean | null {
    const campo = this.filtroForm.get(nombreCampo);
    return !!campo?.errors && campo?.touched;
  }

  getErrorCampo(nombreCampo: string): string | null {
    const campo = this.filtroForm.get(nombreCampo);
    if (!campo) return null;

    const errors = campo.errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'minlength': 
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  onBuscar(): void {
    if (this.filtroForm.invalid) {
      this.filtroForm.markAllAsTouched();
      return;
    }
    
    this.buscar.emit(this.filtroForm.value);
  }
}
