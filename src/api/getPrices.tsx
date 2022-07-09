import axios from 'axios';

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
  paymentMethod: string,
  condition: string,
  verifiedUser: boolean,
  currency: string,
  controller: AbortController
) => {
  try {
    if (condition.length > 0 && condition === 'sell') {
      const req = await axios.get(
        verifiedUser
          ? `${process.env.API}/verified?currency=${currency}&condition=${condition}&paymentMethod=${paymentMethod}`
          : `${process.env.API}/?currency=${currency}&condition=${condition}&paymentMethod=${paymentMethod}`,
        {
          signal: controller.signal,
        }
      );
      const res = req;

      return res.data;
    } else {
      const req = await axios.get(
        verifiedUser
          ? `${process.env.API}/verified?currency=${currency}&paymentMethod=${paymentMethod}`
          : ` ${process.env.API}/?currency=${currency}&paymentMethod=${paymentMethod}`,
        {
          signal: controller.signal,
        }
      );
      const res: ResponseData = req;
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
