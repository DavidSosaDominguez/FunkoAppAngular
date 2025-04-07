import { Injectable } from '@angular/core';
import {Funko} from './funko';

@Injectable({
  providedIn: 'root'
})
export class FiguresService {

  ProductDetailedList: Funko[] = [
    {
      "id": 1,
      "name": "Riven",
      "series": "LOL",
      "description": "Riven es una guerrera exiliada de *League of Legends*, conocida por su destreza con la espada rota y su habilidad para desatar poderosas habilidades de combate. En su búsqueda de redención, Riven lucha contra sus propios demonios internos y el pasado oscuro que la persigue. A pesar de su dolor y arrepentimiento, ella sigue adelante con una fuerza inquebrantable y un deseo de encontrar su verdadero propósito.",
      "price": "85,75",
      "image": "https://m.media-amazon.com/images/I/61PZ-2lUe4L._AC_SX679_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 2,
      "name": "Ahri",
      "series": "LOL",
      "description": "Ahri es una campeona del popular videojuego *League of Legends*. Es una hechicera con el poder de manipular las energías mágicas. Su habilidad para controlar las esferas de energía y su destreza en combate la convierten en un oponente formidable. Es conocida por su habilidad de seducir a sus enemigos con su encantadora personalidad y por ser la portadora de las Nueve Colas, que le otorgan poderes sobrenaturales.",
      "price": "90,00",
      "image": "https://m.media-amazon.com/images/I/717xddZ+rpL._AC_SY300_SX300_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 3,
      "name": "Lucian",
      "series": "LOL",
      "description": "Lucian, el Purificador, es uno de los campeones más valientes y decididos de *League of Legends*. Equipado con sus icónicas pistolas gemelas y un corazón lleno de justicia, Lucian caza incansablemente a los espectros y seres oscuros que amenazan el mundo de Runaterra. Movido por la pérdida de su amada esposa Senna, él lucha por liberar su alma y proteger a los inocentes de la oscuridad que acecha.",
      "price": "74,50",
      "image": "https://m.media-amazon.com/images/I/6170A8DDtOL._AC_SX679_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 4,
      "name": "Senna",
      "series": "LOL",
      "description": "Senna es una redentora del universo de *League of Legends*, conocida por su habilidad para manipular la luz y combatir a los espectros. Resucitada tras siglos atrapada en la linterna de Thresh, ella lucha junto a su esposo Lucian para librar a Runaterra de las fuerzas oscuras. Senna porta un relicario de su pasado y un cañón de luz ancestral, utilizando ambas para canalizar su poder y proteger a los inocentes.",
      "price": "59,75",
      "image": "https://m.media-amazon.com/images/I/61jaGqQrcUL._AC_SX679_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 5,
      "name": "Viego",
      "series": "LOL",
      "description": "Viego, el Rey Arruinado, es uno de los personajes más oscuros y trágicos de *League of Legends*. Después de perder a su esposa, la Reina Isolde, en un evento catastrófico, Viego se embarca en una misión de venganza que lo lleva a corromperse a sí mismo y al mundo que lo rodea. Su trágica historia y su búsqueda por revivir a su amada lo convierten en un personaje muy complejo dentro del universo de *Runaterra*.",
      "price": "79,25",
      "image": "https://m.media-amazon.com/images/I/61Ji8z8mRqL.__AC_SX300_SY300_QL70_ML2_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 6,
      "name": "Invincible",
      "series": "INVINCIBLE",
      "description": "Mark Grayson, conocido como Invincible, es el héroe protagonista de la serie de cómics *Invincible*. A pesar de ser un adolescente, Mark hereda los poderes sobrehumanos de su padre, Omni-Man, un miembro de una raza alienígena que busca conquistar la Tierra. A lo largo de la serie, Mark lucha con el peso de su responsabilidad como héroe y los oscuros secretos que se revelan sobre su familia.",
      "price": "84,50",
      "image": "https://m.media-amazon.com/images/I/617vEtzvMnL._AC_SX679_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 7,
      "name": "Omni-Man",
      "series": "INVINCIBLE",
      "description": "Omni-Man es uno de los personajes más complejos y aterradores de *Invincible*. Como miembro de una raza alienígena superior, Omni-Man posee habilidades sobrehumanas que lo convierten en el protector de la Tierra. Sin embargo, a medida que la serie avanza, se revelan sus verdaderos motivos, lo que lleva a un enfrentamiento con su hijo, Invincible. Su historia es una de traición, conflictos familiares y la lucha por el poder.",
      "price": "85,50",
      "image": "https://m.media-amazon.com/images/I/61amI03-N5L.__AC_SX300_SY300_QL70_ML2_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 8,
      "name": "Atom Eve",
      "series": "INVINCIBLE",
      "description": "Atom Eve es una heroína de *Invincible* con la habilidad de alterar la composición molecular de cualquier objeto, lo que le permite crear o modificar cualquier cosa a su alrededor. A pesar de su impresionante poder, Atom Eve tiene que lidiar con las dificultades de ser una heroína joven y con las complejidades de las relaciones humanas, especialmente con su compañero de lucha, Invincible.",
      "price": "65,00",
      "image": "https://m.media-amazon.com/images/I/61if7mhBk1L._AC_UF1000,1000_QL80_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 9,
      "name": "Harry Potter",
      "series": "HARRY POTTER",
      "description": "Harry Potter, el niño que vivió, es el protagonista de la serie de libros y películas *Harry Potter*. Con su cicatriz en forma de rayo y sus gafas redondas, Harry es conocido por su valentía y su habilidad para enfrentarse a las fuerzas oscuras.",
      "price": "32,50",
      "image": "https://m.media-amazon.com/images/I/61+MrOrNfvL._AC_SL1300_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 10,
      "name": "Ron Weasley",
      "series": "HARRY POTTER",
      "description": "Ron Weasley es uno de los mejores amigos de Harry Potter. Con su lealtad y su sentido del humor, Ron es un compañero invaluable en las aventuras del trío.",
      "price": "25,25",
      "image": "https://m.media-amazon.com/images/I/81FwWwneJAL._AC_SX679_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 11,
      "name": "Hermione Granger",
      "series": "HARRY POTTER",
      "description": "Hermione Granger es una de las mejores amigas de Harry Potter y una de las brujas más brillantes de su generación. Con su inteligencia y su habilidad para resolver problemas, Hermione es una pieza clave en la lucha contra Voldemort.",
      "price": "30,25",
      "image": "https://m.media-amazon.com/images/I/81IHhIftaRL.__AC_SX300_SY300_QL70_ML2_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 12,
      "name": "Luke Skywalker",
      "series": "STAR WARS",
      "description": "Luke Skywalker es el héroe de la trilogía original de *Star Wars*. Con su sable de luz y su conexión con la Fuerza, Luke lucha contra el Imperio y busca restaurar la paz en la galaxia.",
      "price": "79,50",
      "image": "https://m.media-amazon.com/images/I/71WpjXq6QYL.__AC_SX300_SY300_QL70_ML2_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 13,
      "name": "Princess Leia",
      "series": "STAR WARS",
      "description": "La Princesa Leia es una líder valiente y decidida de la Alianza Rebelde. Con su icónico peinado y su habilidad para liderar, Leia es una figura clave en la lucha contra el Imperio.",
      "price": "79,50",
      "image": "https://m.media-amazon.com/images/I/71L-tOekYxL.__AC_SX300_SY300_QL70_ML2_.jpg",
      "link": "product_page.html"
    },
    {
      "id": 14,
      "name": "Darth Vader",
      "series": "STAR WARS",
      "description": "Darth Vader, anteriormente conocido como Anakin Skywalker, es uno de los villanos más icónicos de *Star Wars*. Con su armadura negra y su respiración característica, Darth Vader es temido en toda la galaxia.",
      "price": "94,99",
      "image": "https://m.media-amazon.com/images/I/61s6vlqz-LL._AC_SX425_.jpg",
      "link": "product_page.html"
    }
  ];

  getAllFunkos(): Funko[] {
    return this.ProductDetailedList;
  }

  getFunkobyId(id: number): Funko | undefined {
    return this.ProductDetailedList.find((Funko) => Funko.id === id);
  }

  submitApplication(name: string, surname: string, email: string, password: string) {
    console.log(
      "Application by ", name, " ", surname, " with email ", email, "and password ", password, "."
    );
  }
  constructor() { }
}
