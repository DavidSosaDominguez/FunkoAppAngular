import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient
import { Funko } from '../../funko';
import { Observable, throwError, from } from 'rxjs'; // Agrega 'from' de RxJS
import { catchError, map, switchMap } from 'rxjs/operators'; // Agrega 'switchMap'
import { environment } from '../../environments/environment';
import { getAuth } from 'firebase/auth'; // Importa Firebase Authentication

@Injectable({
  providedIn: 'root'
})
export class FiguresService {

  ProductDetailedList: Funko[] = []; // Inicializa como un array vacío

  private firestoreUrl = `https://firestore.googleapis.com/v1/projects/funkostorepwm113/databases/(default)/documents/products`;

  constructor(private http: HttpClient) {
    this.loadFunkosFromFirestore(); // Llama a la función para cargar los datos al inicializar el servicio
  }

  // Función para cargar los Funkos desde Firestore usando la API REST
  loadFunkosFromFirestore(): void {
    this.getFunkosFromFirestore().subscribe(
      (funkos) => {
        this.ProductDetailedList = funkos;
      },
      (error) => {
        console.error('Error al cargar los Funkos desde Firestore:', error);
      }
    );
  }

  // Función que realiza la petición HTTP para obtener los datos de Firestore
  private getFunkosFromFirestore(): Observable<Funko[]> {
    const auth = getAuth();
    const user = auth.currentUser;

    // Verifica si el usuario está autenticado
    if (!user) {
      console.error('Usuario no autenticado');
      return throwError(() => new Error('Usuario no autenticado'));
    }

    // Convierte la promesa en un Observable usando 'from'
    return from(user.getIdToken()).pipe( // Cambié esto a 'from()'
      switchMap((idToken) => { // Usamos 'switchMap' para aplanar los observables
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${idToken}` // Usa el token de Firebase Authentication
        });

        // Realiza la solicitud HTTP a Firestore y mapea la respuesta
        return this.http.get<any>(this.firestoreUrl, { headers }).pipe(
          map((response: any) => {
            // Procesa la respuesta de la API para transformar los datos al formato Funko
            return response.documents.map((doc: any) => this.mapDocumentToFunko(doc));
          }),
          catchError((error: any) => {
            console.error('Error en la petición HTTP:', error.message || error);
            return throwError(() => new Error(error)); // Propaga el error
          })
        );
      })
    );
  }

  // Función para mapear un documento de Firestore a un objeto Funko
  private mapDocumentToFunko(doc: any): Funko {
    const fields = doc.fields;
    return {
      id: parseInt(doc.name.split('/').pop(), 10) || 0, // Asegura que el ID sea válido
      name: fields.name?.stringValue || '',
      series: fields.series?.stringValue || '',
      description: fields.description?.stringValue || '',
      image: fields.imageUrl?.stringValue || '',
      price: fields.price?.doubleValue?.toString() || '0',
      link: fields.link?.stringValue || ''
    };
  }

  // Obtén todos los Funkos almacenados
  getAllFunkos(): Funko[] {
    return this.ProductDetailedList;
  }

  // Obtén un Funko por su ID
  getFunkobyId(id: number): Funko | undefined {
    return this.ProductDetailedList.find((funko) => funko.id === id);
  }

  // Función de ejemplo para procesar una solicitud de aplicación (no relacionada con Funkos)
  submitApplication(name: string, surname: string, email: string, password: string) {
    console.log(
      "Application by ", name, " ", surname, " with email ", email, "and password ", password, "."
    );
  }
}
