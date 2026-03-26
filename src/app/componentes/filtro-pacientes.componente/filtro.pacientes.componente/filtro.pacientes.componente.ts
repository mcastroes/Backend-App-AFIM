import { Component, output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FiltrosPaciente } from '../../../interfaces/paciente/paciente';

@Component({
  selector: 'app-filtro-pacientes',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './filtro.pacientes.componente.html',
})
export class FiltroPacientesComponent {
  buscar = output<FiltrosPaciente>();
  private fb = inject(FormBuilder);

  filtroForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.minLength(3)]],
    riesgo: [''],
    discapacidad: [''],
    dia: [''],
    mes: [''],
    anio: ['']
  });

  esCampoValido(nombreCampo: string): boolean {
    const campo = this.filtroForm.get(nombreCampo);
    return !!campo?.errors && !!campo?.touched;
  }

  getErrorCampo(nombreCampo: string): string | null {
    const campo = this.filtroForm.get(nombreCampo);
    if (!campo || !campo.errors) return null;

    const errors = campo.errors;
    if (errors['minlength']) {
      return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
    }
    
    return null;
  }

  onBuscar(): void {
    if (this.filtroForm.invalid) {
      this.filtroForm.markAllAsTouched();
      return;
    }
    
    const formValues = this.filtroForm.getRawValue();
    const filtrosLimpios = Object.fromEntries(
      Object.entries(formValues).filter(([_, valor]) => valor !== '' && valor !== null)
    ) as FiltrosPaciente;
    
    this.buscar.emit(filtrosLimpios);
  }
}
