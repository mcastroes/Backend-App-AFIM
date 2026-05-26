import { Component, input, output, signal, inject, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CalendarioService } from '../../../servicios/calendario.serv/calendario.serv';
import { Paciente } from '../../../interfaces/paciente/paciente'; 
import { CitaVista } from '../../../interfaces/cita/cita';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './calendario.componente.html'
})
export class CalendarioComponent {
  public calendarioServ = inject(CalendarioService);
  private fb = inject(FormBuilder);

  listaPacientes = input.required<Paciente[]>();
  citasDelDia = input.required<CitaVista[]>();
  diasConCitas = input.required<number[]>();

  diaSeleccionado = output<number>();
  nuevaCita = output<{dia: number, hora: string, id_paciente: number}>();
  
  selectedDay = signal<number>(new Date().getDate());
  showAgenda = signal<boolean>(false);
  showModal = signal<boolean>(false);

  citaForm = this.fb.nonNullable.group({
    hora: ['', [Validators.required]],
    id_paciente: ['', [Validators.required]]
  });

  diasMes = computed(() => {
    const fecha = this.calendarioServ.fechaActual();
    const dias = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
    return Array.from({ length: dias }, (_, i) => i + 1);
  });

  diasVacios = computed(() => {
    const fecha = this.calendarioServ.fechaActual();
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
    const diasVaciosCount = primerDia === 0 ? 6 : primerDia - 1;
    return Array.from({ length: diasVaciosCount }, (_, i) => i);
  });

  seleccionarDia(dia: number): void {
    this.selectedDay.set(dia);
    this.showAgenda.set(true);
    this.diaSeleccionado.emit(dia);
  }

  tieneCitas(dia: number): boolean {
    return this.diasConCitas().includes(dia);
  }

  cambiarMes(incremento: number): void {
    this.calendarioServ.cambiarMes(incremento);
    this.showAgenda.set(false);
  }

  abrirModal(): void {
    this.citaForm.reset();
    this.showModal.set(true);
  }

  cerrarModal(): void {
    this.showModal.set(false);
  }

  cerrarAgenda(): void {
    this.showAgenda.set(false);
  }

  onGuardar(): void {
    if (this.citaForm.valid) {
      const formValues = this.citaForm.getRawValue();
      this.nuevaCita.emit({
        dia: this.selectedDay(),
        hora: formValues.hora,
        id_paciente: Number(formValues.id_paciente)
      });
      this.cerrarModal();
    } else {
      this.citaForm.markAllAsTouched();
    }
  }
}