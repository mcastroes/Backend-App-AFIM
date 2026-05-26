import { Component, ElementRef, ViewChild, AfterViewInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prueba-dibujo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagina-completa">
      <!-- Indicador superior integrado -->
     

      <div class="contenido-principal">
        <!-- COLUMNA IZQUIERDA -->
        <div class="columna-dibujo">
          <p class="texto-dibuja-aqui">Dibuja aquí</p>
          <div class="contenedor-canvas">
            <canvas 
              #lienzo
              width="450" 
              height="450"
              (mousedown)="iniciarDibujo($event)"
              (mousemove)="dibujar($event)"
              (mouseup)="detenerDibujo()"
              (mouseleave)="detenerDibujo()"
              (touchstart)="iniciarDibujoTouch($event)"
              (touchmove)="dibujarTouch($event)"
              (touchend)="detenerDibujo()">
            </canvas>
          </div>
          <button (click)="limpiar()" class="boton-borrar">Borrar lienzo</button>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="columna-textos">
          <h1 class="titulo-reloj">Dibuja un <br> reloj</h1>
          <p class="descripcion-reloj">
            Utiliza el cuadrado de la izquierda para dibujar
          </p>
        </div>
      </div>

      
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: white;
    }

    .pagina-completa {
      max-width: 1300px; /* Un poco más ancho para permitir el desplazamiento */
      margin: 0 auto;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      min-height: 90vh;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .contenido-principal {
      display: flex;
      justify-content: center; /* Centrado para controlar mejor los márgenes internos */
      align-items: center;
      flex-grow: 1;
      gap: 100px; /* Espacio extra entre el lienzo y los textos */
    }

    /* Dibujo */
    .columna-dibujo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .texto-dibuja-aqui {
      color: #bcaaa4;
      font-size: 36px;
      font-weight: 300;
      margin-bottom: 25px;
    }

    .contenedor-canvas {
      background: white;
      border: 1px solid #efebe9;
      border-radius: 40px;
      padding: 15px;
      box-shadow: 0 10px 40px rgba(99, 42, 29, 0.05);
    }

    canvas {
      display: block;
      cursor: crosshair;
      touch-action: none;
    }

    /* Textos movidos a la derecha y con más separación */
    .columna-textos {
      max-width: 500px;
      text-align: center;
      margin-left: 50px; /* Desplazamiento extra a la derecha */
    }

    .titulo-reloj {
      font-size: 80px;
      font-weight: 700;
      color: #632a1d; 
      line-height: 0.9;
      margin-bottom: 60px; /* Mayor separación entre título y descripción */
    }

    .descripcion-reloj {
      font-size: 28px;
      color: #a1887f; 
      font-weight: 300;
      line-height: 1.4;
    }

    .boton-borrar {
      margin-top: 25px;
      background: none;
      border: none;
      color: #d7ccc8;
      text-decoration: underline;
      cursor: pointer;
      font-size: 16px;
    }

    .boton-borrar:hover {
      color: #632a1d;
    }
  `]
})
export class PruebaDibujoComponent implements AfterViewInit {
  // @ViewChild permite acceder al elemento <canvas> del HTML una vez renderizado
  @ViewChild('lienzo') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  // Nuevo sistema de 'output' de Angular para emitir la imagen al componente padre
  public respuesta = output<string>();

  // El contexto 2D (ctx) es el motor que permite pintar líneas y figuras
  private ctx!: CanvasRenderingContext2D;
  private dibujando = false; // Flag para saber si el usuario está pulsando/arrastrando

  // Ciclo de vida: Se ejecuta cuando el HTML ya está listo.
  // Es obligatorio para poder inicializar el Canvas.
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!; // Obtenemos el contexto para dibujo 2D
    
    // Configuración estética del pincel
    this.ctx.lineWidth = 3;        // Grosor del trazo
    this.ctx.lineCap = 'round';    // Final de línea redondeado (más natural)
    this.ctx.strokeStyle = '#000000'; // Color negro
    
    this.limpiarFondo(); // Inicializamos el fondo en blanco
  }

  // LOGICA PARA RATÓN (PC)
  public iniciarDibujo(event: MouseEvent): void {
    this.dibujando = true;
    this.ctx.beginPath(); // Iniciamos un nuevo camino de dibujo
    this.ctx.moveTo(event.offsetX, event.offsetY); // Posicionamos el pincel
  }

  public dibujar(event: MouseEvent): void {
    if (!this.dibujando) return; // Si no está pulsando, no hace nada
    this.ctx.lineTo(event.offsetX, event.offsetY); // Crea una línea hasta la nueva posición
    this.ctx.stroke(); // Dibuja físicamente la línea
  }

  // LOGICA PARA PANTALLAS TÁCTILES (Móvil/Tablet)
  public iniciarDibujoTouch(event: TouchEvent): void {
    event.preventDefault(); // Evita que la pantalla se mueva (scroll) al dibujar
    this.dibujando = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect(); // Posición del canvas en pantalla
    const touch = event.touches[0]; // Captura el primer dedo que toca
    this.ctx.beginPath();
    // Calculamos la posición exacta restando los márgenes del canvas
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

  // Finaliza el trazo y envía la imagen actualizada
  public detenerDibujo(): void {
    if (this.dibujando) {
      this.dibujando = false;
      this.ctx.closePath(); // Cierra el camino actual
      this.emitirRespuesta(); // Notifica al componente padre
    }
  }

  // Resetea el lienzo
  public limpiar(): void {
    this.limpiarFondo();
    this.emitirRespuesta();
  }

  // Rellena el fondo de blanco (por defecto el canvas es transparente)
  private limpiarFondo(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Convierte el dibujo en una cadena de texto (Base64) para poder guardarlo
  private emitirRespuesta(): void {
    const base64 = this.canvasRef.nativeElement.toDataURL('image/png');
    this.respuesta.emit(base64); // Enviamos el "fichero" imagen como un string
  }
}
