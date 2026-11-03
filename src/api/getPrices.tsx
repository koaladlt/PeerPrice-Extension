import axios from "axios";
import { ResultStructure, EmailValues } from "../types/api.interface";

const BINANCE_P2P_SEARCH =
  "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export const getDollars = async () => {
  const req = await axios.get(process.env.API_DOLAR);
  const res = req.data;
  return res;
};

export const getDollarBlue = async () => {
  const req = await axios.get(process.env.API_DOLAR_BLUE);
  const res = req.data;
  if (res.venta) {
    return res.venta;
  }
};

export const getPrices = async (
  asset: string,
  tradeType: string,
  publisherType: string,
  fiat: string,
  payType: string[],
  controller: AbortController
) => {
  try {
    const req = await axios.post(
      BINANCE_P2P_SEARCH,
      {
        proMerchantAds: false,
        page: 1,
        rows: 10,
        payTypes: payType[0].length > 0 ? payType : [],
        countries: [],
        publisherType,
        tradeType,
        asset,
        fiat: fiat,
      },
      { signal: controller.signal }
    );

    return req.data as ResultStructure;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const sendEmail = async (body: EmailValues) => {
  try {
    const req = await axios.post(WEB3FORMS_URL, {
      access_key: process.env.WEB3FORMS_KEY,
      subject: "¡Nuevo feedback!",
      from_name: "PeerPrice",
      email: body.mail,
      message: body.message,
    });
    if (!req.data?.success) throw new Error(req.data?.message);
    return req.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
