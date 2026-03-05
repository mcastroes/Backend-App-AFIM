import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  verificarCodigo(passcode: string): Observable<{ success: boolean, role?: string }> {
    if (passcode === "1") {
      return of({ success: true, role: 'admin' }).pipe(delay(1000));
    } else if (passcode === "2") {
      return of({ success: true, role: 'user' }).pipe(delay(1000));
    } else {
      return of({ success: false }).pipe(delay(500));
    }
  }
}
