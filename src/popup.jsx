import React, { useState, useEffect, lazy } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {
  ChakraProvider,
  VStack,
  Button,
  Text,
  HStack,
  Box,
  Spinner,
  Checkbox,
  Select,
  Divider,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const App = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [condition, setCondition] = useState('buy');
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [url, setUrl] = useState('');
  const controller = new AbortController();

  useEffect(() => {
    if (selectedCurrency.length > 0) {
      getPrice(selectedCurrency);
    }

    return () => {
      controller.abort();
    };
  }, [condition, verifiedUser]);

  const getPrice = async (currency) => {
    setPrices([]);
    setSelectedCurrency(currency);
    setCondition(condition);
    setLoading(true);

    try {
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
        const res = req;
        setUrl(res.data.url);

        setPrices(res.data.prices);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  };

  const handleChangeSelect = (e) => {
    setCondition(e.target.value);
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
            variant={'link'}
            textDecoration={selectedCurrency === 'USDT' ? 'underline' : null}
            textUnderlineOffset={4}
            disabled={loading}
          >
            USDT
          </Button>
          <Button
            color='#F0B90B'
            size='sm'
            variant='link'
            textDecoration={selectedCurrency === 'DAI' ? 'underline' : null}
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
            textDecoration={selectedCurrency === 'BUSD' ? 'underline' : null}
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
            textDecoration={selectedCurrency === 'BTC' ? 'underline' : null}
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
            textDecoration={selectedCurrency === 'ETH' ? 'underline' : null}
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
            <Text fontSize={'x-small'} fontWeight='bold'>
              Solo usuarios verificados
            </Text>
          </Checkbox>
          <Select
            width='25%'
            spacing={3}
            defaultValue='Comprar'
            color={'whiteAlpha.800'}
            fontSize='xs'
            size='xs'
            textAlign='center'
            borderRadius={5}
            fontWeight='bold'
            onChange={(e) => handleChangeSelect(e)}
            disabled={loading}
          >
            <option value='buy'>Comprar</option>
            <option value='sell'>Vender</option>
          </Select>
        </HStack>
        <VStack backgroundColor='gray.800' my={6}>
          {loading && <Spinner alignItems='center' color='#F0B90B' />}
          {prices.length > 0
            ? prices.map((price, idx) => (
                <VStack key={idx} width='100%'>
                  <HStack
                    justifyContent='space-evenly'
                    spacing={4}
                    width='100%'
                  >
                    <HStack>
                      <Text
                        color='whiteAlpha.800'
                        fontSize={'lg'}
                        fontWeight='extrabold'
                      >
                        {price}
                      </Text>
                      <Text
                        ml='1'
                        color='whiteAlpha.800'
                        fontSize='xx-small'
                        fontWeight='extrabold'
                      >
                        ARS
                      </Text>
                    </HStack>
                    <Button
                      size='sm'
                      colorScheme={condition === 'sell' ? 'red' : 'green'}
                      onClick={() => window.open(url)}
                    >
                      {condition === 'sell' ? 'Vender' : 'Comprar'}
                    </Button>
                  </HStack>
                  <Divider color='whiteAlpha.800' />
                </VStack>
              ))
            : !loading && (
                <Box>
                  <Text
                    color='whiteAlpha.800'
                    fontSize='medium'
                    textAlign='center'
                    fontWeight='extrabold'
                  >
                    Selecciona un activo para obtener
                  </Text>
                  <Text
                    color='whiteAlpha.800'
                    fontSize='medium'
                    textAlign='center'
                    fontWeight='extrabold'
                  >
                    su precio actual en ARS
                  </Text>
                </Box>
              )}
        </VStack>
      </Box>
    </VStack>
  );
};

render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('react-target')
);
