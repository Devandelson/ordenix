interface Producto {
  id: number | undefined;
  producto: string | undefined;
  unidad: number | undefined;
  precio: number | undefined;
  "moneda": string | undefined,
  "imagenes": string
}

interface Cliente {
  nombre: string | undefined;
  estado: string | undefined;
}

interface Orden {
  id_orden: string | undefined;
  fecha: string | undefined;
  hora: string | undefined;
}

interface Total {
  monto: number | undefined;
  moneda: string | undefined;
}

export interface DataJsonTypes {
  cliente: Cliente | undefined;
  orden: Orden | undefined;
  productos: Producto[] | undefined;
  total?: Total | undefined;
  accion: string
}