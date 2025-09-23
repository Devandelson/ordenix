const data = [
  {
    "cliente": {
      "nombre": "Maria Merdeces",
      "estado": "Completo"
    },
    "orden": {
      "id_orden": "A3B2",
      "fecha": "2025-09-03",
      "hora": "8:50 PM"
    },
    "productos": [
      {
        "id": 1,
        "producto": "Cabello de rapuncel",
        "unidad": 7,
        "precio": 500,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1011/600/400"
      },
      {
        "id": 9,
        "producto": "Bolso Gucci",
        "unidad": 1,
        "precio": 850,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1090/600/400"
      }
    ],
    "total": {
      "monto": 4350,
      "moneda": "USD"
    },
    "accion": "Pago"
  },
  {
    "cliente": {
      "nombre": "Carlos Peña",
      "estado": "Pendiente"
    },
    "orden": {
      "id_orden": "B7C9",
      "fecha": "2025-09-04",
      "hora": "10:15 AM"
    },
    "productos": [
      {
        "id": 2,
        "producto": "Perfume Dior",
        "unidad": 2,
        "precio": 120,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1025/600/400"
      },
      {
        "id": 10,
        "producto": "Gafas Ray-Ban",
        "unidad": 1,
        "precio": 180,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1100/600/400"
      },
      {
        "id": 11,
        "producto": "Smartwatch Samsung",
        "unidad": 1,
        "precio": 250,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1110/600/400"
      }
    ],
    "total": {
      "monto": 550,
      "moneda": "USD"
    },
    "accion": "¿Pago?"
  },
  {
    "cliente": {
      "nombre": "Lucía Gómez",
      "estado": "Completo"
    },
    "orden": {
      "id_orden": "C9D1",
      "fecha": "2025-09-05",
      "hora": "2:30 PM"
    },
    "productos": [
      {
        "id": 4,
        "producto": "Laptop Dell XPS",
        "unidad": 1,
        "precio": 1300,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1040/600/400"
      },
      {
        "id": 6,
        "producto": "Auriculares Sony WH-1000XM5",
        "unidad": 1,
        "precio": 400,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1060/600/400"
      }
    ],
    "total": {
      "monto": 1700,
      "moneda": "USD"
    },
    "accion": "Pago"
  },
  {
    "cliente": {
      "nombre": "Andrés Molina",
      "estado": "Pendiente"
    },
    "orden": {
      "id_orden": "D4E5",
      "fecha": "2025-09-05",
      "hora": "4:00 PM"
    },
    "productos": [
      {
        "id": 6,
        "producto": "Auriculares Sony WH-1000XM5",
        "unidad": 1,
        "precio": 400,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1060/600/400"
      },
      {
        "id": 8,
        "producto": "Zapatos Nike Air",
        "unidad": 2,
        "precio": 150,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1080/600/400"
      },
      {
        "id": 3,
        "producto": "Reloj Rolex",
        "unidad": 1,
        "precio": 5000,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1035/600/400"
      }
    ],
    "total": {
      "monto": 5550,
      "moneda": "USD"
    },
    "accion": "¿Pago?"
  },
  {
    "cliente": {
      "nombre": "Sofía Ruiz",
      "estado": "Cancelado"
    },
    "orden": {
      "id_orden": "E2F8",
      "fecha": "2025-09-06",
      "hora": "9:20 AM"
    },
    "productos": [
      {
        "id": 3,
        "producto": "Reloj Rolex",
        "unidad": 1,
        "precio": 5000,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1035/600/400"
      },
      {
        "id": 2,
        "producto": "Perfume Dior",
        "unidad": 1,
        "precio": 120,
        "moneda": "USD",
        "imagenes": "https://picsum.photos/id/1025/600/400"
      }
    ],
    "total": {
      "monto": 5120,
      "moneda": "USD"
    },
    "accion": "Cancelado"
  }
];

export default data;