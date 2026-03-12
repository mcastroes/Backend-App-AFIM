import { Component, OnInit, inject } from '@angular/core';
import { CitaVista } from '../../../interfaces/cita/cita';
import { Paciente } from '../../../interfaces/paciente/paciente';
import { CitaService } from '../../../servicios/cita.serv/cita.serv'; 
import { PacienteService } from '../../../servicios/paciente.serv/paciente.serv'; 

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.componente.html',
  styleUrls: ['./calendario.componente.css']
})
export class CalendarioComponent implements OnInit {
  private _Citas = inject(CitaService);
  private _Pacientes = inject(PacienteService);

  listaPacientes: Paciente[] = [];
  citasDelDia: CitaVista[] = [];
  
  diasVacios: number[] = [1, 2, 3];
  diasMes: number[] = Array.from({length: 31}, (_, i) => i + 1);
  
  selectedDay: number = 0;
  showAgenda: boolean = false;
  showModal: boolean = false;

  ngOnInit(): void {
    this.listaPacientes = this._Pacientes.getPacientes();
  }

  seleccionarDia(dia: number): void {
    this.selectedDay = dia;
    this.showAgenda = true;
    this.actualizarCitasDelDia();
  }

  cerrarAgenda(): void {
    this.showAgenda = false;
  }

  abrirModal(): void {
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  tieneCitas(dia: number): boolean {
    return this._Citas.tieneCitas(dia);
  }

  guardarCita(hora: string, pacienteId: string): void {
    if (!hora || !pacienteId) {
      return;
    }

    const idNumerico = Number(pacienteId);

    this._Citas.agregarCita(this.selectedDay, hora, idNumerico);
    this.actualizarCitasDelDia();
    this.cerrarModal();
  }

  private actualizarCitasDelDia(): void {
    this.citasDelDia = this._Citas.getCitasVistaPorDia(this.selectedDay);
  }
}
