import { Component, input, output, signal } from '@angular/core';
import { CitaVista } from '../../../interfaces/cita/cita';

@Component({
  selector: 'app-calendario',
  standalone: true,
  templateUrl: './calendario.componente.html',
  styleUrls: ['./calendario.componente.css']
})
export class CalendarioComponent {
  listaPacientes = input.required<any[]>();
  citasDelDia = input.required<CitaVista[]>();
  diasConCitas = input<number[]>([]);

  diaSeleccionado = output<number>();
  nuevaCita = output<{dia: number, hora: string, id_paciente: number}>();
  
  diasVacios = signal<number[]>([1, 2, 3]);
  diasMes = signal<number[]>(Array.from({length: 31}, (_, i) => i + 1));
  
  selectedDay = signal<number>(0);
  showAgenda = signal<boolean>(false);
  showModal = signal<boolean>(false);

  seleccionarDia(dia: number): void {
    this.selectedDay.set(dia);
    this.showAgenda.set(true);
    this.diaSeleccionado.emit(dia);
  }

  cerrarAgenda(): void {
    this.showAgenda.set(false);
  }

  abrirModal(): void {
    this.showModal.set(true);
  }

  cerrarModal(): void {
    this.showModal.set(false);
  }

  tieneCitas(dia: number): boolean {
    return this.diasConCitas().includes(dia);
  }

  guardarCita(hora: string, pacienteId: string): void {
    if (!hora || !pacienteId || this.selectedDay() === 0) return;
    
    this.nuevaCita.emit({
      dia: this.selectedDay(),
      hora: hora,
      id_paciente: Number(pacienteId)
    });
    
    this.cerrarModal();
  }
}