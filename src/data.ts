import { PaymentMethodsType } from "./types/data.interface";

export const FIATS = [
  "ARS",
  "BOB",
  "BRL",
  "CLP",
  "COP",
  "EUR",
  "MXN",
  "PEN",
  "PYG",
  "USD",
  "UYU",
  "VES",
];

export const PaymentMethods: PaymentMethodsType[] = [
  {
    fiat: "ARS",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "MercadoPagoNew", name: "Mercado Pago" },
      { key: "BancoBrubankNew", name: "Brubank" },
      { key: "UalaNew", name: "Ualá" },
      { key: "BankArgentina", name: "Trans. bancaria" },
      { key: "CashInPerson", name: "Efectivo" },
    ],
  },
  {
    fiat: "BOB",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "BancoFassil", name: "Fassil" },
      { key: "BancoUnion", name: "Union" },
      { key: "BANK", name: "Trans. bancaria" },
      { key: "BancoGanadero", name: "Ganadero" },
      { key: "BancoDeBolivia", name: "Banco de Bolivia" },
      { key: "BancoSantaCruz", name: "Santa Cruz" },
    ],
  },
  {
    fiat: "BRL",
    methods: [
      { key: "", name: "Todos os pagamentos" },
      { key: "Pix", name: "Pix" },
      { key: "BankBrazil", name: "Transferência bancária" },
      { key: "PicPay", name: "PicPay" },
      { key: "SpecificBank", name: "Banco espec." },
      { key: "PagSeguro", name: "PagSeguro" },
      { key: "MercadoPagoNew", name: "Mercado Pago" },
    ],
  },
  {
    fiat: "CLP",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "BancoSantanderChile", name: "Santander" },
      { key: "BancoEstado", name: "Estado" },
      { key: "BancodeChile", name: "Banco de Chile" },
      { key: "BancoFalabella", name: "Falabella" },
      { key: "SpecificBank", name: "Banco espec." },
      { key: "MACH", name: "MACH" },
    ],
  },
  {
    fiat: "COP",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "BancolombiaSA", name: "Bancolombia" },
      { key: "Nequi", name: "Nequi" },
      { key: "DaviviendaSA", name: "Davivienda" },
      { key: "Daviplata", name: "Daviplata" },
      { key: "BancodeBogota", name: "Banco de Bogotá" },
      { key: "BBVABank", name: "BBVA" },
    ],
  },
  {
    fiat: "EUR",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "Wise", name: "Wise" },
      { key: "Revolut", name: "Revolut" },
      { key: "SEPAinstant", name: "SEPA inst." },
      { key: "SEPA", name: "SEPA" },
      { key: "Paysera", name: "Paysera" },
      { key: "ZEN", name: "ZEN" },
    ],
  },
  {
    fiat: "MXN",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "BANK", name: "Transf. bancaria" },
      { key: "BBVABank", name: "BBVA" },
      { key: "STP", name: "STP" },
      { key: "CitiBanamex", name: "Citibanamex" },
      { key: "Banorte", name: "Banorte" },
      { key: "SantanderMexico", name: "Santander Mex." },
    ],
  },
  {
    fiat: "PEN",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "CreditBankofPeru", name: "Credit Bank of Perú" },
      { key: "Interbank", name: "Interbank" },
      { key: "BancoDeCredito", name: "Banco de Crédito" },
      { key: "Yape", name: "Yape" },
      { key: "BBVABank", name: "BBVA" },
      { key: "ScotiabankPeru", name: "Scotiabank" },
    ],
  },
  {
    fiat: "PYG",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "BANK", name: "Transf. bancaria" },
      { key: "VisionBanco", name: "Vision" },
      { key: "BancoFamiliarNew", name: "Familiar" },
      { key: "TigoMoney", name: "Tigo Money" },
      { key: "BancoItauParaguay", name: "Itaú" },
      { key: "BancoContinentalPar", name: "Continental" },
    ],
  },
  {
    fiat: "USD",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "Wise", name: "Wise" },
      { key: "Zelle", name: "Zelle" },
      { key: "AirTM", name: "AirTM" },
      { key: "SkrillMoneybookers", name: "Skrill" },
      { key: "BancoPichincha", name: "Pichincha" },
      { key: "PerfectMoney", name: "Perfect Money" },
      { key: "Utoppia", name: "Utoppia" },
    ],
  },
  {
    fiat: "UYU",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "Prex", name: "Prex" },
      { key: "ItauUruguay", name: "Itaú" },
      { key: "BankRepublicUruguay", name: "Banco de la Rep." },
      { key: "SantanderUrug", name: "Santander" },
      { key: "OcaBlue", name: "OCA Blue" },
      { key: "RedPagos", name: "Red Pagos" },
    ],
  },
  {
    fiat: "VES",
    methods: [
      { key: "", name: "Todos los pagos" },
      { key: "PagoMovil", name: "Pago Movil" },
      { key: "Banesco", name: "Banesco" },
      { key: "BankVenezuela", name: "Transf. bancaria" },
      { key: "BancoDeVenezuela", name: "Banco de Ven." },
      { key: "Mercantil", name: "Mercantil" },
      { key: "Provincial", name: "Provincial" },
    ],
  },
];

export const cryptoToDonate = ["BTC", "DAI", "USDT"];

export const cryptoNetwork = ["BEP20", "ERC20", "BTC"];

export const cryptoAdresses: {
  [key: string]: any;
} = {
  BTC: {
    BEP20: "0xcba9062ee6252f86abfe37ba4092d3c81b6a9bbe",
    BTC: "1PdgpGJ21JRcnay5BAtNvVsrYkt7X6sEhy",
  },
  USDT: {
    BEP20: "0xcba9062ee6252f86abfe37ba4092d3c81b6a9bbe",
    ERC20: "0xcba9062ee6252f86abfe37ba4092d3c81b6a9bbe",
  },
  DAI: {
    BEP20: "0xcba9062ee6252f86abfe37ba4092d3c81b6a9bbe",
    ERC20: "0xcba9062ee6252f86abfe37ba4092d3c81b6a9bbe",
  },
};
