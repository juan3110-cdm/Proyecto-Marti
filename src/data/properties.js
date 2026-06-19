// Fuente: PROPIEDADES A VENDER.xlsx — datos reales Proyecto Martí
const PROPS = [

  // ── CASAS ──────────────────────────────────────────────────────────────────

  {
    name: "Apartamento Giacomo · La Castellana",
    zone: "Caracas", area: "La Castellana",
    op: "Venta", type: "Apartamento", tag: "Apartamento",
    price: "$1.296.000", per: "",
    beds: 3, baths: 3, m2: 294,
    desc: "294 m² + 41 m² de jardín. Área de servicio, maletero, 5 puestos de estacionamiento. Financiamiento disponible.",
    ig: ""
  },
  {
    name: "Apartamento Trompiz · La Castellana",
    zone: "Caracas", area: "La Castellana",
    op: "Venta", type: "Apartamento", tag: "Apartamento",
    price: "$672.000", per: "",
    beds: 2, baths: 3, m2: 160,
    desc: "160 m². Estudio, área de servicio, maletero, 3 puestos de estacionamiento. Financiamiento disponible.",
    ig: ""
  },
  {
    name: "Rancho Chana Carmen · Manzanillo",
    zone: "Isla de Margarita", area: "Manzanillo",
    op: "Alquiler", type: "Casa", tag: "Vacacional",
    price: "$600", per: "/noche",
    beds: null, baths: null, m2: null,
    desc: "Capacidad 14 personas. Piscina, playa privada y personal de servicio. Planta eléctrica propia.",
    ig: ""
  },
  {
    name: "Casa Mónica · Playa El Ángel",
    zone: "Isla de Margarita", area: "Playa El Ángel",
    op: "Alquiler", type: "Casa", tag: "Vacacional",
    price: "$350", per: "/noche",
    beds: null, baths: null, m2: null,
    desc: "Casa de lujo vacacional. Capacidad 8 personas.",
    ig: ""
  },
  {
    name: "Casa La Florida · Alta Florida",
    zone: "Caracas", area: "Alta Florida",
    op: "Alquiler", type: "Casa", tag: "Alquiler",
    price: "", per: "/mes",
    beds: null, baths: null, m2: null,
    desc: "Próximamente disponible. Contáctanos para más información.",
    ig: ""
  },
  {
    name: "Terrazas de Guacuco",
    zone: "Isla de Margarita", area: "Terrazas de Guacuco",
    op: "Alquiler", type: "Casa", tag: "Vacacional",
    price: "$350", per: "/noche",
    beds: null, baths: null, m2: null,
    desc: "Cabaña con jardín. Capacidad 10 personas.",
    ig: ""
  },
  {
    name: "Edificio Hércules · La Urbina",
    zone: "Caracas", area: "La Urbina",
    op: "Venta", type: "Edificio", tag: "Edificio",
    price: "$890.000", per: "",
    beds: null, baths: null, m2: 1100,
    desc: "Edificio de 1.100 m². 8 puestos de estacionamiento, local comercial, ascensor de carga.",
    ig: ""
  },
  {
    name: "PB Hatillo Humboldt · Alto Hatillo",
    zone: "Caracas", area: "Alto Hatillo",
    op: "Venta", type: "Apartamento", tag: "Apartamento",
    price: "$400.000", per: "",
    beds: 3, baths: 4, m2: 400,
    desc: "400 m² + terraza de 150 m². Área de servicio, 4 puestos de estacionamiento. Financiamiento a dos años.",
    ig: ""
  },
  {
    name: "Casa Río María · Los Palos Grandes",
    zone: "Caracas", area: "Los Palos Grandes",
    op: "Venta", type: "Casa", tag: "Casa",
    price: "$650.000", per: "",
    beds: null, baths: null, m2: 392,
    desc: "Casa comercial. 392 m² de terreno.",
    ig: ""
  },

  // ── APARTAMENTOS ───────────────────────────────────────────────────────────

  {
    name: "Hatillo Humboldt Dúplex · Alto Hatillo",
    zone: "Caracas", area: "Alto Hatillo",
    op: "Venta", type: "Apartamento", tag: "Apartamento",
    price: "$200.000", per: "",
    beds: 3, baths: 3, m2: 160,
    desc: "Dúplex de 160 m². Área de servicio, 2 puestos de estacionamiento, maletero. Financiamiento a dos años.",
    ig: ""
  },
  {
    name: "Hatillo Humboldt · Alto Hatillo",
    zone: "Caracas", area: "Alto Hatillo",
    op: "Venta", type: "Apartamento", tag: "Apartamento",
    price: "$180.000", per: "",
    beds: 3, baths: 3, m2: 180,
    desc: "180 m². Área de servicio, 2 puestos de estacionamiento, maletero. Financiamiento a dos años.",
    ig: ""
  },
  {
    name: "PB Arivana · La Lagunita",
    zone: "Caracas", area: "La Lagunita",
    op: "Venta", type: "Apartamento", tag: "Apartamento",
    price: "$170.000", per: "",
    beds: 2, baths: 2, m2: 80,
    desc: "80 m² + 40 m² de terraza. 2 puestos de estacionamiento, maletero.",
    ig: ""
  },
  {
    name: "Karolina · Campo Alegre",
    zone: "Caracas", area: "Campo Alegre",
    op: "Venta", type: "Apartamento", tag: "Apartamento",
    price: "$575.000", per: "",
    beds: 2, baths: 2, m2: 131,
    desc: "131 m². Área de servicio, maletero, 3 puestos de estacionamiento.",
    ig: ""
  },
  {
    name: "Terreno La Lagunita",
    zone: "Caracas", area: "La Lagunita",
    op: "Venta", type: "Terreno", tag: "Terreno",
    price: "$280.000", per: "",
    beds: null, baths: null, m2: 2091,
    desc: "2.091 m². Ubicado en Calle B3. Semisótano y piscina lista. Planos incluidos.",
    ig: ""
  },
  {
    name: "Apartamento Héctor · Pampatar",
    zone: "Isla de Margarita", area: "Pampatar",
    op: "Alquiler", type: "Apartamento", tag: "Vacacional",
    price: "$160", per: "/noche",
    beds: null, baths: null, m2: null,
    desc: "Apartamento vacacional en Loma Real. Capacidad 6 personas.",
    ig: ""
  },

  // ── OFICINAS ───────────────────────────────────────────────────────────────

  {
    name: "Oficinas Bancaracas · La Castellana",
    zone: "Caracas", area: "La Castellana",
    op: "Alquiler", type: "Oficina", tag: "Oficina",
    price: "", per: "/mes",
    beds: null, baths: null, m2: null,
    desc: "Próximamente disponible. Contáctanos para más información.",
    ig: ""
  },

  // ── LOCALES COMERCIALES ────────────────────────────────────────────────────

  {
    name: "Locales Maneiro · Pampatar",
    zone: "Isla de Margarita", area: "Pampatar",
    op: "Alquiler", type: "Local", tag: "Local",
    price: "$400", per: "/mes",
    beds: null, baths: null, m2: 100,
    desc: "Locales desde 100 m². Precio desde $400 mensuales.",
    ig: ""
  },
  {
    name: "Local Ramón · El Hatillo",
    zone: "Caracas", area: "El Hatillo",
    op: "Alquiler", type: "Local", tag: "Local",
    price: "$600", per: "/mes",
    beds: null, baths: null, m2: 37,
    desc: "Local de 37 m². Alquiler $600 mensuales.",
    ig: ""
  },
  {
    name: "Locales Xavi · Los Palos Grandes",
    zone: "Caracas", area: "Los Palos Grandes",
    op: "Alquiler", type: "Local", tag: "Local",
    price: "", per: "/mes",
    beds: null, baths: null, m2: null,
    desc: "Próximamente disponible. Contáctanos para más información.",
    ig: ""
  },
  {
    name: "Local Altamira",
    zone: "Caracas", area: "Altamira",
    op: "Alquiler", type: "Local", tag: "Local",
    price: "$1.500", per: "/mes",
    beds: null, baths: null, m2: 50,
    desc: "Local de 50 m². Precio $1.500 mensuales.",
    ig: ""
  }
];

export default PROPS;
