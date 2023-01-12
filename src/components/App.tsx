import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  VStack,
  Button,
  Text,
  HStack,
  Box,
  Checkbox,
  Select,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { FaGithub, FaRegEnvelope, FaDonate } from 'react-icons/fa';

import Body from './Body';
import FeedBack from './Feedback';
import { getDollars, getPrices } from '../api/getPrices';
import { FIATS, PaymentMethods } from '../data';
import Donate from './Donate';

const App = () => {
  const [prices, setPrices] = useState({ prices: [], errorMessage: '' });
  const [loading, setLoading] = useState(false);
  const [loadingDollars, setLoadingDollars] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [dollars, setDollars] = useState({ blue: '', mep: '', ccl: '' });
  const [condition, setCondition] = useState<string>('BUY');
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [change, setChange] = useState(false);
  const [url, setUrl] = useState('https://p2p.binance.com/');
  const [error, setError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string[]>([
    'all-payments',
  ]);
  const [page, setPage] = useState<string>('Home');
  const [fiat, setFiat] = useState<string>('ARS');
  const controller = new AbortController();

  useEffect(() => {
    if (selectedCurrency.length > 0) {
      getPrice(selectedCurrency, condition, verifiedUser, paymentMethod, fiat);
    } else {
      chrome.storage.sync.get(
        ['currency', 'condition', 'verifiedUser', 'paymentMethod', 'fiat'],
        ({ currency, condition, verifiedUser, paymentMethod, fiat }) => {
          if (currency) {
            console.log(paymentMethod);
            setCondition(condition);
            setVerifiedUser(verifiedUser);
            setPaymentMethod(paymentMethod);
            setFiat(fiat);
            getPrice(currency, condition, verifiedUser, paymentMethod, fiat);
          }
        }
      );
    }

    return () => {
      controller.abort();
    };
  }, [change]);

  useEffect(() => {
    getDollarsPrices();
  }, []);

  const handleConditionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
    setChange(!change);
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod([e.target.value]);
    setChange(!change);
  };

  const handleVerified = () => {
    setVerifiedUser(!verifiedUser);
    setChange(!change);
  };

  const handleFiatChange = (currency: string) => {
    setFiat(currency);
    setPaymentMethod(['']);
    setChange(!change);
  };

  const getDollarsPrices = async () => {
    try {
      setLoadingDollars(true);
      const d = await getDollars();
      setDollars({ blue: d.blue, ccl: d.ccl, mep: d.mep });
      setLoadingDollars(false);
    } catch (error) {
      console.log(error);
      setLoadingDollars(false);
    }
  };

  const getPrice = async (
    currency: string,
    condition: string,
    verifiedUser: boolean,
    paymentMethod: string[],
    fiat: string
  ) => {
    try {
      await chrome.storage.sync.set({
        currency,
        condition: condition.length > 0 ? condition : 'BUY',
        verifiedUser,
        paymentMethod,
        fiat,
      });
      setError(false);
      setPrices({ prices: [], errorMessage: '' });
      setSelectedCurrency(currency);
      setFiat(fiat);
      setLoading(true);

      const data = await getPrices(
        currency,
        condition,
        verifiedUser ? 'merchant' : null,
        fiat,
        paymentMethod,
        controller
      );

      // setUrl(data.url);
      setPrices({
        prices: data.data.map((price) => price.adv.price),
        errorMessage:
          data.data.length > 0 ? '' : 'No se ha encontrado ninguna oferta',
      });
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
        <HStack justifyContent='space-between' mr={2} ml={2} mb={3}>
          <HStack onClick={() => setPage('Feedback')} cursor='pointer'>
            <FaRegEnvelope color='#F0B90B' size={15} />
            <Text color='whiteAlpha.800'>Feedback</Text>
          </HStack>
          <HStack onClick={() => setPage('Donate')} cursor='pointer'>
            <FaDonate color='#F0B90B' size={15} />
          </HStack>
          <HStack
            cursor='pointer'
            onClick={() => window.open('http://github.com/koaladlt')}
          >
            <FaGithub color='#F0B90B' size={15} />
            <Text color={'whiteAlpha.800'}>@koaladlt</Text>
          </HStack>
        </HStack>
        <Text
          color={'whiteAlpha.800'}
          fontSize='large'
          fontWeight={'extrabold'}
        >
          {fiat === 'BRL' ? 'Cotações P2P' : 'Cotizaciones P2P en Binance'}
        </Text>
        <Box my={3} display='flex' justifyContent='center'>
          <Select
            color='whiteAlpha.800'
            fontWeight='bold'
            fontSize='md'
            value={fiat}
            width='25%'
            size='sm'
            borderColor='#F0B90B'
            _hover={{ opacity: 0.8 }}
            borderRadius={10}
            onChange={(e) => handleFiatChange(e.target.value)}
          >
            {FIATS.map((fiat) => (
              <option key={fiat} value={fiat}>
                {fiat}
              </option>
            ))}
          </Select>
        </Box>
        {fiat === 'ARS' && (
          <HStack mt={2} justifyContent='space-evenly'>
            {loadingDollars ? (
              <>
                <Skeleton
                  startColor='whiteAlpha.600'
                  endColor='whiteAlpha.400'
                  height={'20px'}
                  width='50px'
                />
                <Skeleton
                  startColor='whiteAlpha.600'
                  endColor='whiteAlpha.400'
                  height={'20px'}
                  width='50px'
                />
                <Skeleton
                  startColor='whiteAlpha.600'
                  endColor='whiteAlpha.400'
                  height={'20px'}
                  width='50px'
                />
              </>
            ) : (
              <>
                <Text color='whiteAlpha.800' fontWeight='bold'>
                  Blue: ${dollars.blue}
                </Text>
                <Text color='whiteAlpha.800' fontWeight='bold'>
                  Mep: ${dollars.mep}
                </Text>
                <Text color='whiteAlpha.800' fontWeight='bold'>
                  CCL: ${dollars.ccl}
                </Text>
              </>
            )}
          </HStack>
        )}
      </Box>
      <Box width='100%' backgroundColor='gray.800' my={2}>
        {page === 'Feedback' ? (
          <FeedBack fiat={fiat} setPage={setPage} />
        ) : page === 'Donate' ? (
          <Donate setPage={setPage} fiat={fiat} />
        ) : (
          <>
            <HStack justifyContent='space-evenly'>
              <Button
                color='#F0B90B'
                size='sm'
                onClick={() =>
                  getPrice('USDT', condition, verifiedUser, paymentMethod, fiat)
                }
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
                  getPrice('DAI', condition, verifiedUser, paymentMethod, fiat);
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
                  getPrice(
                    'BUSD',
                    condition,
                    verifiedUser,
                    paymentMethod,
                    fiat
                  );
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
                  getPrice('BTC', condition, verifiedUser, paymentMethod, fiat);
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
                  getPrice('ETH', condition, verifiedUser, paymentMethod, fiat);
                }}
                disabled={loading}
              >
                ETH
              </Button>
            </HStack>

            <HStack my={4} justifyContent={'space-around'}>
              <Select
                width='35%'
                color={'whiteAlpha.800'}
                fontSize='xs'
                size='xs'
                textAlign='center'
                borderRadius={5}
                fontWeight='bold'
                disabled={loading}
                value={paymentMethod}
                onChange={(e) => handlePaymentMethodChange(e)}
              >
                {PaymentMethods.map(
                  ({ fiat: countryFiat, methods }) =>
                    countryFiat === fiat &&
                    methods.map(({ key, name }) => (
                      <option value={key}>{name}</option>
                    ))
                )}
              </Select>

              <Select
                width='35%'
                color={'whiteAlpha.800'}
                fontSize='xs'
                size='xs'
                borderRadius={5}
                fontWeight='bold'
                textAlign='center'
                onChange={(e) => handleConditionChange(e)}
                disabled={loading}
                value={condition}
              >
                <option value='BUY'>Comprar</option>
                <option value='SELL'>Vender</option>
              </Select>
            </HStack>
            <Stack my={4} display='flex' alignItems='center'>
              <Checkbox
                isChecked={verifiedUser}
                textColor={'whiteAlpha.800'}
                onChange={() => handleVerified()}
                disabled={loading}
                _hover={{ borderColor: '#E5C232' }}
                colorScheme='yellow'
              >
                <Text fontSize={'xs'} fontWeight='bold'>
                  {fiat === 'BRL'
                    ? 'Anúncios de comerciantes'
                    : 'Solo usuarios verificados'}
                </Text>
              </Checkbox>
            </Stack>
            <Body
              fiat={fiat}
              loading={loading}
              error={error}
              prices={prices.prices}
              condition={condition}
              url={url}
              paymentMethod={paymentMethod}
            />
          </>
        )}
      </Box>
    </VStack>
  );
};

export default App;
