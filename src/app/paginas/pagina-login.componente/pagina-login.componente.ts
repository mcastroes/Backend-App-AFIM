import { Component } from '@angular/core';
import { LoginComponente } from '../../componentes/login.componente/login.componente';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponente], 
  templateUrl: './pagina-login.componente.html',
  styleUrls: ['./pagina-login.componente.css']
})
export class LoginPageComponent {
  
}
