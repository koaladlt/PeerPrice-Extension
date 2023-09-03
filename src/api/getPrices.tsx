import axios from 'axios';
import { ResultStructure, EmailValues } from '../types/api.interface';

export const getDollars = async () => {
  const req = await axios.get(process.env.API_DOLAR);
  const res = req.data;
  return res;
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
      process.env.API,
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
    const req = await axios.post(`${process.env.API}/sendMail`, body);
    return req.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
