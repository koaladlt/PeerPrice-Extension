import axios from 'axios';
import { ResultStructure } from '../types/api.interface';

interface ResponseData {
  data: {
    prices: string[];
    url: string;
  };
}

export const getDollars = async () => {
  const req = await axios.get(process.env.API_DOLAR);
  const res = req.data;
  return res;
};

export const getPrices = async (
  asset: string,
  tradeType: string,
  publisherType: string,
  controller: AbortController
) => {
  try {
    const req = await axios.post(
      process.env.API,
      {
        proMerchantAds: false,
        page: 1,
        rows: 10,
        payTypes: [],
        countries: [],
        publisherType,
        tradeType,
        asset,
        fiat: 'ARS',
      },
      { signal: controller.signal }
    );
    return req.data as ResultStructure;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
