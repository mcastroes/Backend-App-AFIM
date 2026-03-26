import { Component, ElementRef, ViewChild, AfterViewInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prueba-dibujo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div class="border-2 border-gray-300 rounded-xl overflow-hidden bg-white shadow-inner">
        <canvas 
          #lienzo
          width="400" 
          height="400"
          class="cursor-crosshair touch-none"
          (mousedown)="iniciarDibujo($event)"
          (mousemove)="dibujar($event)"
          (mouseup)="detenerDibujo()"
          (mouseleave)="detenerDibujo()"
          (touchstart)="iniciarDibujoTouch($event)"
          (touchmove)="dibujarTouch($event)"
          (touchend)="detenerDibujo()">
        </canvas>
      </div>
      <button 
        (click)="limpiar()"
        class="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200">
        Borrar lienzo
      </button>
    </div>
  `
})
export class PruebaDibujoComponent implements AfterViewInit {
  @ViewChild('lienzo') canvasRef!: ElementRef<HTMLCanvasElement>;
  public respuesta = output<string>();

  private ctx!: CanvasRenderingContext2D;
  private dibujando = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000000';
    this.limpiarFondo();
  }

  public iniciarDibujo(event: MouseEvent): void {
    this.dibujando = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  public dibujar(event: MouseEvent): void {
    if (!this.dibujando) return;
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
  }

  public iniciarDibujoTouch(event: TouchEvent): void {
    event.preventDefault();
    this.dibujando = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    this.ctx.beginPath();
    this.ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  }

  public dibujarTouch(event: TouchEvent): void {
    if (!this.dibujando) return;
    event.preventDefault();
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    this.ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    this.ctx.stroke();
  }

  public detenerDibujo(): void {
    if (this.dibujando) {
      this.dibujando = false;
      this.ctx.closePath();
      this.emitirRespuesta();
    }
  }

  public limpiar(): void {
    this.limpiarFondo();
    this.emitirRespuesta();
  }

  private limpiarFondo(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private emitirRespuesta(): void {
    const base64 = this.canvasRef.nativeElement.toDataURL('image/png');
    this.respuesta.emit(base64);
  }
}