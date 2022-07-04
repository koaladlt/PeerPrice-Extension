import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import {
  VStack,
  Button,
  Text,
  HStack,
  Box,
  Checkbox,
  Select,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import Body from './Body';

interface ResponseData {
  data: {
    prices: string[];
    url: string;
  };
}

const App = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedVerifiedUser, setSelectedVerifiedUser] = useState<boolean>();
  const [condition, setCondition] = useState<string>('');
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [change, setChange] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const controller = new AbortController();

  useEffect(() => {
    if (selectedCurrency.length > 0) {
      getPrice(selectedCurrency, condition, verifiedUser);
    } else {
      chrome.storage.sync.get(
        ['currency', 'condition', 'verifiedUser'],
        ({ currency, condition, verifiedUser }) => {
          if (currency) {
            setCondition(condition);
            setVerifiedUser(verifiedUser);
            getPrice(currency, condition, verifiedUser);
          }
        }
      );
    }

    return () => {
      controller.abort();
    };
  }, [change]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
    setChange(!change);
  };

  const handleVerified = () => {
    setVerifiedUser(!verifiedUser);
    setChange(!change);
  };

  const getPrice = async (
    currency: string,
    condition?: string,
    verifiedUser?: boolean
  ) => {
    try {
      await chrome.storage.sync.set({
        currency,
        condition,
        verifiedUser,
      });

      setPrices([]);
      setSelectedCurrency(currency);

      setLoading(true);

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

        setUrl(res.data.url);

        setPrices(res.data.prices);
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
        setUrl(res.data.url);

        setPrices(res.data.prices);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <VStack backgroundColor='gray.800'>
      <Box width='100%' backgroundColor='gray.700' py={2}>
        <Text
          color={'whiteAlpha.800'}
          fontSize='large'
          fontWeight={'extrabold'}
        >
          Cotizaciones P2P en Binance
        </Text>
        <HStack
          justifyContent='flex-end'
          mt={1}
          mr={2}
          onClick={() => window.open('http://github.com/koaladlt')}
          cursor='pointer'
        >
          <FaGithub color='white' size={15} />
          <Text color={'whiteAlpha.800'}>@koaladlt</Text>
        </HStack>
      </Box>
      <Box width='100%' backgroundColor='gray.800' my={2}>
        <HStack justifyContent='space-evenly'>
          <Button
            color='#F0B90B'
            size='sm'
            onClick={() => getPrice('USDT', condition, verifiedUser)}
            fontFamily='Nunito'
            variant={'link'}
            textDecoration={
              selectedCurrency === 'USDT' ? 'underline' : undefined
            }
            textUnderlineOffset={4}
            disabled={loading}
          >
            USDT
          </Button>
          <Button
            color='#F0B90B'
            size='sm'
            variant='link'
            textDecoration={
              selectedCurrency === 'DAI' ? 'underline' : undefined
            }
            textUnderlineOffset={4}
            onClick={() => {
              getPrice('DAI', condition, verifiedUser);
            }}
            disabled={loading}
          >
            DAI
          </Button>
          <Button
            color='#F0B90B'
            size='sm'
            variant='link'
            textDecoration={
              selectedCurrency === 'BUSD' ? 'underline' : undefined
            }
            textUnderlineOffset={4}
            onClick={() => {
              getPrice('BUSD', condition, verifiedUser);
            }}
            disabled={loading}
          >
            BUSD
          </Button>
          <Button
            color='#F0B90B'
            size='sm'
            variant='link'
            textDecoration={
              selectedCurrency === 'BTC' ? 'underline' : undefined
            }
            textUnderlineOffset={4}
            onClick={() => {
              getPrice('BTC', condition, verifiedUser);
            }}
            disabled={loading}
          >
            BTC
          </Button>
          <Button
            color='#F0B90B'
            size='sm'
            variant='link'
            textDecoration={
              selectedCurrency === 'ETH' ? 'underline' : undefined
            }
            textUnderlineOffset={4}
            onClick={() => {
              getPrice('ETH', condition, verifiedUser);
            }}
            disabled={loading}
          >
            ETH
          </Button>
        </HStack>
        <HStack my={4} justifyContent={'space-around'}>
          <Checkbox
            isChecked={verifiedUser}
            textColor={'whiteAlpha.800'}
            onChange={() => handleVerified()}
            disabled={loading}
          >
            <Text fontSize={'xs'} fontWeight='bold'>
              Solo usuarios verificados
            </Text>
          </Checkbox>
          <Select
            width='25%'
            color={'whiteAlpha.800'}
            fontSize='xs'
            size='xs'
            textAlign='center'
            borderRadius={5}
            fontWeight='bold'
            onChange={(e) => handleChange(e)}
            disabled={loading}
            value={condition}
          >
            <option value='buy'>Comprar</option>
            <option value='sell'>Vender</option>
          </Select>
        </HStack>
        <Body
          loading={loading}
          error={error}
          prices={prices}
          condition={condition}
          url={url}
        />
      </Box>
    </VStack>
  );
};

export default App;
