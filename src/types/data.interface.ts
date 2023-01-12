export interface PaymentMethodsType {
  fiat: string;
  methods: { key: string; name: string }[];
}

export interface CryptoToDonate {
  BTC: 'BTC';
  BUSD: 'BUSD';
  USDT: 'USDT';
  DAI: 'DAI';
}

export interface CryptoAddresses {
  BTC: {
    BEP20: string;
    BTC: string;
  };
  BUSD: {
    BEP20: string;
    ERC20: string;
  };
  USDT: { BEP20: string; ERC20: string };
  DAI: { BEP20: string; ERC20: string };
}
