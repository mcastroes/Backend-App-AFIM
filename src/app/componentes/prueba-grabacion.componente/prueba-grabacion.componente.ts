import { Component, OnInit, OnDestroy, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prueba-animales',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagina-completa">
      
      <div class="header-textos">
        <h1 class="titulo-pregunta">Si te digo animales...</h1>
        <h2 class="subtitulo-pregunta">¿Qué se te ocurre?</h2>
      </div>

     
      <div class="contenido-central">
        
        
        <div class="columna">
          <p class="instruccion-lateral">Di todo lo <br> que pienses</p>
          <div class="botones-placeholder">
            <div class="boton-fake rojo">COMPONENTE GRABACION</div>
            <div class="boton-fake rojo">COMPONENTE CUENTA ATRÁS (&lt;app-timer&gt;)</div>
          </div>
        </div>

       
        <div class="columna-timer">
          <div class="circulo-timer">
            <span class="numero-timer">{{ tiempo }}</span>
          </div>
        </div>

        
        <div class="columna">
          <p class="instruccion-lateral">Cualquier <br> respuesta es <br> válida</p>
        </div>
      </div>

     
      <div class="footer-acciones">
        <button class="boton-finalizar" (click)="finalizar()">FINALIZAR PRUEBA</button>
      </div>
    </div>
  `,
  styles: [`
    .pagina-completa {
      background-color: white;
      min-height: 100vh;
      padding: 40px 60px;
      display: flex;
      flex-direction: column;
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    /* Cabecera */
    .header-textos {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 40px;
    }

    .titulo-pregunta {
      font-size: 68px;
      font-weight: 700;
      color: #632a1d; 
      margin: 0;
    }

    .subtitulo-pregunta {
      font-size: 62px;
      font-weight: 700;
      color: #632a1d; 
      margin: 0;
      margin-top: -10px;
    }

    /* Layout Central */
    .contenido-central {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    .columna {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .instruccion-lateral {
      font-size: 38px;
      color: #a1887f; 
      font-weight: 300;
      line-height: 1.2;
      margin-bottom: 30px;
    }

    /* Cronómetro Circular */
    .columna-timer {
      flex: 1.5;
      display: flex;
      justify-content: center;
    }

    .circulo-timer {
      width: 380px;
      height: 380px;
      background-color: #fdf2f2; 
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 4px 10px rgba(99, 42, 29, 0.05);
      border: 1px solid #f1d3cf;
    }

    .numero-timer {
      font-size: 160px;
      font-weight: 700;
      color: #632a1d; 
    }

    .botones-placeholder {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      max-width: 350px;
    }

    .boton-fake {
      padding: 15px 20px;
      border-radius: 30px;
      color: white;
      font-weight: bold;
      font-size: 14px;
      text-transform: uppercase;
      text-align: center;
    }

    .rojo {
      background-color: #ff4444; /* Mantengo el rojo brillante para que destaque como "grabación" */
    }

    /* Footer */
    .footer-acciones {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }

    .boton-finalizar {
      background-color: #632a1d;
      color: white;
      border: none;
      padding: 18px 45px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 18px;
      cursor: pointer;
      letter-spacing: 1px;
      transition: background 0.2s;
    }

    .boton-finalizar:hover {
      background-color: #4a1d14; 
    }
  `]
})
export class PruebaAnimalesComponent implements OnInit, OnDestroy {
  public tiempo: number = 60;
  private intervalId: any;
  
  // Output para avisar al padre cuando termine
  public pruebaFinalizada = output<void>();

  ngOnInit(): void {
    this.iniciarCuentaAtras();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private iniciarCuentaAtras(): void {
    this.intervalId = setInterval(() => {
      if (this.tiempo > 0) {
        this.tiempo--;
      } else {
        this.finalizar();
      }
    }, 1000);
  }

  public finalizar(): void {
    clearInterval(this.intervalId);
    console.log('Prueba de animales finalizada');
    this.pruebaFinalizada.emit();
  }
}