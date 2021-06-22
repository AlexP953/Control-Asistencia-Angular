import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as dni from 'dni-js-validator';
import * as EmailValidator from 'email-validator';
/**/
import { MatSnackBar } from '@angular/material/snack-bar';

dni.isValid('12345678Z') // => 'true'

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  nombre;
  dni;
  alumnosRef;
  alumnosArray = [];
  rol;
  jornada;
  nombreWrong;
  dniWrong;
  telefonoWrong;
  emailWrong;


  constructor(
    private snackBar: MatSnackBar,
    private route: Router,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['colorFondo']
    })
  }

  jornadasDefinidas(jornadaParameter) {
    this.jornada = jornadaParameter
  }

  salir() {
    this.route.navigateByUrl('login')
  }

  crearAlumno(nombre, telefono, dni, email) {
    console.log('nombre', nombre);

    if (this.comprobacion()) {
      this.db.collection('alumnos').doc(dni).set({
        nombre,
        dni: dni, //<- CON ESTO SE AÑADE EL DNI AL FIREBASE
        telefono,
        email,
        rol: this.rol,
        date: new Date(),
        jornada: parseInt(this.jornada)
      }).then(() => {
        //RESPUESTA EXITOSA
        this.openSnackBar('Registrado correctamente!', 'Vale!')
      })
      this.route.navigateByUrl('bienvenida')

        .catch((e) => {
          this.snackBar.open('Error del servidor', 'OK', {
            panelClass: ['errorSnackbar']
          })
          console.error('Error', e)
          // NOS DA ERROR
        })

    } else {
      (this.nombreWrong == null) ? this.nombreWrong = 'error' : null;
      (this.telefonoWrong == null) ? this.telefonoWrong = 'error' : null;
      (this.emailWrong == null) ? this.emailWrong = 'error' : null;
      (this.dniWrong == null) ? this.dniWrong = 'error' : null;
      this.openSnackBar('Hay algún dato incorrecto', 'Vale!');
    }
  }

  // esta función sirve para escuchar del hijo el rol
  rolDefinido(rolParameter: string) {
    this.rol = rolParameter;
  }

  comprobarDNI(dniParam) {
    if (dni.isValid(dniParam)) {
      this.dniWrong = 'success';
    } else {
      this.dniWrong = 'error'
    }
  }

  comprobarNombre(nombre) {
    if (nombre.length > 1 && nombre.length < 100) {
      this.nombreWrong = 'success';
    } else {
      this.nombreWrong = 'error'
    }
  }

  comprobarTelefono(telefono) {
    const tel = parseInt(telefono)
    console.log('tel es ', tel)
    if (telefono.length === 9) {
      this.telefonoWrong = 'success';
    } else {
      this.telefonoWrong = 'error'
    }
  }

  comprobarEmail(email) {
    const check = EmailValidator.validate(email);

    if (check == true) {
      this.emailWrong = 'success';
    } else {
      this.emailWrong = 'error'
    }
  }

  comprobacion() {
    const nombre = (this.nombreWrong === 'success')
    const phone = (this.telefonoWrong === 'success')
    const email = (this.emailWrong === 'success')
    const dni = (this.dniWrong === 'success')

    if (nombre && phone && email && dni) {
      return true

    } else {
      return false
    }
  }
}
