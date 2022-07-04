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
  condition: string,
  verifiedUser: boolean,
  currency: string,
  controller: AbortController
) => {
  if (condition.length > 0 && condition === 'sell') {
    const req = await axios.get(
      verifiedUser
        ? `${process.env.API}/verified?currency=${currency}&condition=${condition}`
        : `${process.env.API}/?currency=${currency}&condition=${condition}`,
      {
        signal: controller.signal,
      }
    );
    const res = req;

    return res.data;
    // setUrl(res.data.url);

    //setPrices(res.data.prices);
  } else {
    const req = await axios.get(
      verifiedUser
        ? `${process.env.API}/verified?currency=${currency}`
        : ` ${process.env.API}/?currency=${currency}`,
      {
        signal: controller.signal,
      }
    );
    const res: ResponseData = req;
    return res.data;
    //setUrl(res.data.url);

    //setPrices(res.data.prices);
  }
};
