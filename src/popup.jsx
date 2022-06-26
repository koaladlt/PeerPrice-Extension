import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (selectedCurrency.length > 0) {
      getPrice(selectedCurrency);
    }
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
            : `${process.env.API}/?currency=${currency}&condition=${condition}`
        );
        const res = req;

        setUrl(res.data.url);

        setPrices(res.data.prices);
      } else {
        const req = await axios.get(
          verifiedUser
            ? `${process.env.API}/verified?currency=${currency}`
            : ` ${process.env.API}/?currency=${currency}`
        );
        const res = req;
        setUrl(res.data.url);

        setPrices(res.data.prices);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
          >
            ETH
          </Button>
        </HStack>
        <HStack my={4} justifyContent={'space-around'}>
          <Checkbox
            isChecked={verifiedUser}
            textColor={'whiteAlpha.800'}
            onChange={() => setVerifiedUser(!verifiedUser)}
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
          >
            <option value='buy'>Comprar</option>
            <option value='sell'>Vender</option>
          </Select>
        </HStack>
        <VStack backgroundColor='gray.800' my={6}>
          {loading && <Spinner alignItems='center' color='#F0B90B' />}
          {prices.length > 0
            ? prices.map((price) => (
                <VStack width='100%'>
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
                <Text
                  color='whiteAlpha.800'
                  fontSize='medium'
                  textAlign='center'
                  fontWeight='extrabold'
                >
                  Selecciona un activo para obtener
                  <Text> su precio actual en ARS</Text>
                </Text>
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
