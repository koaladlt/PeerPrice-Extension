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
  const [condition, setCondition] = useState<string>('buy');
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const controller = new AbortController();

  useEffect(() => {
    if (selectedCurrency.length > 0) {
      getPrice(selectedCurrency);
    }

    return () => {
      controller.abort();
    };
  }, [condition, verifiedUser]);

  const getPrice = async (currency: string) => {
    try {
      setPrices([]);
      setSelectedCurrency(currency);
      setCondition(condition);
      setLoading(true);
      if (condition === 'sell') {
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
            onClick={() => getPrice('USDT')}
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
              getPrice('DAI');
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
              getPrice('BUSD');
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
              getPrice('BTC');
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
              getPrice('ETH');
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
            onChange={() => setVerifiedUser(!verifiedUser)}
            disabled={loading}
          >
            <Text fontSize={'xs'} fontWeight='bold'>
              Solo usuarios verificados
            </Text>
          </Checkbox>
          <Select
            width='25%'
            defaultValue='Comprar'
            color={'whiteAlpha.800'}
            fontSize='xs'
            size='xs'
            textAlign='center'
            borderRadius={5}
            fontWeight='bold'
            onChange={(e) => setCondition(e.target.value)}
            disabled={loading}
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
