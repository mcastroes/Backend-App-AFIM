import { Component, inject } from '@angular/core';
import { CitaService } from '../../../servicios/cita.serv/cita.serv';
import { CitaVista, Paciente } from '../../../interfaces/cita/cita';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [], 
  templateUrl: './calendario.componente.html',
  styleUrl: './calendario.componente.css'
})
export class CalendarioComponent {
  private _Citas = inject(CitaService);

  showAgenda: boolean = false;
  showModal: boolean = false;
  
  diasVacios: number[] = [1, 2]; 
  diasMes: number[] = Array.from({length: 31}, (_, i) => i + 1);
  
  selectedDay: number | null = null;
  citasDelDia: CitaVista[] = [];
  listaPacientes: Paciente[] = [];

  constructor() {
    this.listaPacientes = this._Citas.getPacientes();
  }

  seleccionarDia(dia: number) {
    this.selectedDay = dia;
    this.showAgenda = true;
    this.citasDelDia = this._Citas.getCitasVistaPorDia(dia);
  }

  cerrarAgenda() {
    this.showAgenda = false;
    this.selectedDay = null;
  }

  tieneCitas(dia: number): boolean {
    return this._Citas.tieneCitas(dia);
  }

  abrirModal() {
    if (!this.selectedDay) return;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }

  guardarCita(hora: string, pacienteIdString: string) {
    const idPaciente = Number(pacienteIdString);

    if (!hora || !idPaciente) {
      alert("Por favor, selecciona una hora y un paciente válidos.");
      return;
    }
    
    if (this.selectedDay) {
      this._Citas.agregarCita(this.selectedDay, hora, idPaciente);
      
      this.citasDelDia = this._Citas.getCitasVistaPorDia(this.selectedDay);
      this.cerrarModal();
    }
  }
}
