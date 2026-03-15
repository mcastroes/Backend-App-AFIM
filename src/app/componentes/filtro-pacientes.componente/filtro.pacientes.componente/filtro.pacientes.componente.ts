import { Component, output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filtro-pacientes',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './filtro.pacientes.componente.html',
  styleUrl: './filtro.pacientes.componente.css'
})
export class FiltroPacientesComponent {
  buscar = output<any>();
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
    
    const formValues = this.filtroForm.value;
    const filtrosLimpios = Object.fromEntries(
      Object.entries(formValues).filter(([_, valor]) => valor !== '' && valor !== null)
    );
    
    this.buscar.emit(filtrosLimpios);
  }
}
