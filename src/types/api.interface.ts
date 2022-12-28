export interface ResultStructure {
  code: string;
  message: null;
  messageDetail: null;
  data: Datum[];
  total: number;
  success: boolean;
}

export interface Datum {
  adv: Adv;
  advertiser: Advertiser;
}

export interface Adv {
  advNo: string;
  classify: Classify;
  tradeType: TradeType;
  asset: Asset;
  fiatUnit: FiatUnit;
  advStatus: null;
  priceType: null;
  priceFloatingRatio: null;
  rateFloatingRatio: null;
  currencyRate: null;
  price: string;
  initAmount: null;
  surplusAmount: string;
  amountAfterEditing: null;
  maxSingleTransAmount: string;
  minSingleTransAmount: string;
  buyerKycLimit: null;
  buyerRegDaysLimit: null;
  buyerBtcPositionLimit: null;
  remarks: null;
  autoReplyMsg: string;
  payTimeLimit: null;
  tradeMethods: { [key: string]: null | string }[];
  userTradeCountFilterTime: null;
  userBuyTradeCountMin: null;
  userBuyTradeCountMax: null;
  userSellTradeCountMin: null;
  userSellTradeCountMax: null;
  userAllTradeCountMin: null;
  userAllTradeCountMax: null;
  userTradeCompleteRateFilterTime: null;
  userTradeCompleteCountMin: null;
  userTradeCompleteRateMin: null;
  userTradeVolumeFilterTime: null;
  userTradeType: null;
  userTradeVolumeMin: null;
  userTradeVolumeMax: null;
  userTradeVolumeAsset: null;
  createTime: null;
  advUpdateTime: null;
  fiatVo: null;
  assetVo: null;
  advVisibleRet: null;
  assetLogo: null;
  assetScale: number;
  fiatScale: number;
  priceScale: number;
  fiatSymbol: FiatSymbol;
  isTradable: boolean;
  dynamicMaxSingleTransAmount: string;
  minSingleTransQuantity: string;
  maxSingleTransQuantity: string;
  dynamicMaxSingleTransQuantity: string;
  tradableQuantity: string;
  commissionRate: string;
  tradeMethodCommissionRates: any[];
  launchCountry: null;
  abnormalStatusList: null;
  closeReason: null;
}

export enum Asset {
  Usdt = 'USDT',
}

export enum Classify {
  Profession = 'profession',
}

export enum FiatSymbol {
  Ars = 'ARS$',
}

export enum FiatUnit {
  Ars = 'ARS',
}

export enum TradeType {
  Buy = 'BUY',
}

export interface Advertiser {
  userNo: string;
  realName: null;
  nickName: string;
  margin: null;
  marginUnit: null;
  orderCount: null;
  monthOrderCount: number;
  monthFinishRate: number;
  advConfirmTime: null;
  email: null;
  registrationTime: null;
  mobile: null;
  userType: UserType;
  tagIconUrls: any[];
  userGrade: number;
  userIdentity: UserIdentity;
  proMerchant: null;
  isBlocked: null;
}

export enum UserIdentity {
  MassMerchant = 'MASS_MERCHANT',
}

export enum UserType {
  Merchant = 'merchant',
}
