import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface Asistente {
  nombre: string;
  telefono: any;
  email: string;
  dni: string;
  jornada:any;
  rol:any;
  id:any;
}

@Component({
selector: 'app-listado-alumnos',
templateUrl: './listado-alumnos.component.html',
styleUrls: ['./listado-alumnos.component.css']
})
export class ListadoAlumnosComponent implements OnInit, OnChanges {


alumnosRef;
alumnosArray = [];
alumnosArrayFiltrado = [];
@Input() jornada;
sortedData: any;
displayedColumns: string[] = ['nombre', 'dni', 'telefono', 'email','jornada','rol','id'];

dataSource;

@ViewChild(MatSort) sort: MatSort;

ngAfterViewInit(){
this.dataSource.sort = this.sort;
}

constructor(
  private db: AngularFirestore,
  ) {
this.alumnosRef = this.db.collection('alumnos');
}

ngOnInit(): void {
const alumnos = this.db.collection('alumnos').snapshotChanges()
alumnos.subscribe((res:any)=>{
const arrayMapped:Asistente[] = res.map((a)=>{
const data = a.payload.doc.data();
const id = a.payload.doc.id;
return { ...data, id}
})
this.alumnosArray = arrayMapped;
this.alumnosArrayFiltrado = this.alumnosArray;
console.log('ARRAY MAPPED', arrayMapped)
this.filtrar()
});


}


ngOnChanges(changes: SimpleChanges) {
console.log('NG ON CHANGES');
this.filtrar()

}

filtrar(){
const jornadaParseada = parseInt(this.jornada);
this.alumnosArrayFiltrado = this.alumnosArray.filter((participante)=>{
  if(participante.jornada === jornadaParseada ){
    return true
  }else{
    return false
}
})

this.dataSource = new MatTableDataSource(this.alumnosArrayFiltrado);
this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminar(id:string){

this.alumnosRef.doc(id).delete()
}

}