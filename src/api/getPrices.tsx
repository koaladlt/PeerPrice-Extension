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

// export const getPrices = async (
//   paymentMethod: string,
//   condition: string,
//   verifiedUser: boolean,
//   currency: string,
//   controller: AbortController
// ) => {
//   try {
//     if (condition.length > 0 && condition === 'sell') {
//       const req = await axios.get(
//         verifiedUser
//           ? `${process.env.API}/verified?currency=${currency}&condition=${condition}&paymentMethod=${paymentMethod}`
//           : `${process.env.API}/?currency=${currency}&condition=${condition}&paymentMethod=${paymentMethod}`,
//         {
//           signal: controller.signal,
//         }
//       );
//       const res = req;

//       return res.data;
//     } else {
//       const req = await axios.get(
//         verifiedUser
//           ? `${process.env.API}/verified?currency=${currency}&paymentMethod=${paymentMethod}`
//           : ` ${process.env.API}/?currency=${currency}&paymentMethod=${paymentMethod}`,
//         {
//           signal: controller.signal,
//         }
//       );
//       const res: ResponseData = req;
//       return res.data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

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
