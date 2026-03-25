import { Injectable, signal, computed } from '@angular/core';
import { DiaCalendario } from '../../interfaces/dia_calendario/dia-calendario';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {
  fechaActual = signal<Date>(new Date());
  diasDelMes = signal<DiaCalendario[]>([]);

  // --- Nuevos métodos para compatibilidad con el HTML ---
  nombreMesActual = computed(() => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[this.fechaActual().getMonth()];
  });

  anioActual = computed(() => this.fechaActual().getFullYear());
  // ------------------------------------------------------

  constructor() {
    this.generarMes(this.fechaActual());
  }

  generarMes(fecha: Date): void {
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth();
    
    const primerDia = new Date(anio, mes, 1);
    let diaSemanaPrimerDia = primerDia.getDay(); 
    diaSemanaPrimerDia = diaSemanaPrimerDia === 0 ? 6 : diaSemanaPrimerDia - 1;

    const diasEnMesActual = new Date(anio, mes + 1, 0).getDate();
    const diasEnMesAnterior = new Date(anio, mes, 0).getDate();

    const dias: DiaCalendario[] = [];
    const hoy = new Date();

    for (let i = diaSemanaPrimerDia - 1; i >= 0; i--) {
      dias.push({
        fecha: new Date(anio, mes, -i), // Corregido para evitar saltos raros de año
        esMesActual: false,
        esHoy: false
      });
    }

    for (let i = 1; i <= diasEnMesActual; i++) {
      const fechaDia = new Date(anio, mes, i);
      dias.push({
        fecha: fechaDia,
        esMesActual: true,
        esHoy: this.esMismaFecha(fechaDia, hoy)
      });
    }

    const diasRestantes = 42 - dias.length;
    for (let i = 1; i <= diasRestantes; i++) {
      dias.push({
        fecha: new Date(anio, mes + 1, i),
        esMesActual: false,
        esHoy: false
      });
    }

    this.fechaActual.set(fecha);
    this.diasDelMes.set(dias);
  }

  cambiarMes(incremento: number): void {
    const actual = this.fechaActual();
    const nuevaFecha = new Date(actual.getFullYear(), actual.getMonth() + incremento, 1);
    this.generarMes(nuevaFecha);
  }

  irAMesYAnio(mes: number, anio: number): void {
    this.generarMes(new Date(anio, mes, 1));
  }

  irAHoy(): void {
    this.generarMes(new Date());
  }

  obtenerNombreMesCompleto(mes: number): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[mes];
  }

  private esMismaFecha(fecha1: Date, fecha2: Date): boolean {
    return fecha1.getDate() === fecha2.getDate() &&
           fecha1.getMonth() === fecha2.getMonth() &&
           fecha1.getFullYear() === fecha2.getFullYear();
  }
}
