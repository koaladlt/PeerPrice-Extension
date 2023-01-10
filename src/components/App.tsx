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
  Tooltip,
} from '@chakra-ui/react';
import { FaGithub, FaRegEnvelope } from 'react-icons/fa';

import Body from './Body';
import FeedBack from './Feedback';
import { getDollars, getPrices } from '../api/getPrices';

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
  const [paymentMethod, setPaymentMethod] = useState<string[]>([]);
  const [feedbackPage, setFeedbackPage] = useState<boolean>(false);
  const controller = new AbortController();

  useEffect(() => {
    if (selectedCurrency.length > 0) {
      getPrice(selectedCurrency, condition, verifiedUser, paymentMethod);
    } else {
      chrome.storage.sync.get(
        ['currency', 'condition', 'verifiedUser', 'paymentMethod'],
        ({ currency, condition, verifiedUser, paymentMethod }) => {
          if (currency) {
            console.log(paymentMethod);
            setCondition(condition);
            setVerifiedUser(verifiedUser);
            setPaymentMethod(paymentMethod);
            getPrice(currency, condition, verifiedUser, paymentMethod);
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
    paymentMethod: string[]
  ) => {
    try {
      await chrome.storage.sync.set({
        currency,
        condition: condition.length > 0 ? condition : 'BUY',
        verifiedUser,
        paymentMethod,
      });
      setError(false);
      setPrices({ prices: [], errorMessage: '' });
      setSelectedCurrency(currency);
      setLoading(true);

      const data = await getPrices(
        currency,
        condition,
        verifiedUser ? 'merchant' : 'user',
        controller
      );

      console.log({ data });
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
          <HStack
            onClick={() => setFeedbackPage(!feedbackPage)}
            cursor='pointer'
          >
            <FaRegEnvelope color='#F0B90B' size={15} />
            <Text color='whiteAlpha.800'>Feedback</Text>
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
          Cotizaciones P2P en Binance
        </Text>

        <HStack mt={4} justifyContent='space-evenly'>
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
      </Box>
      <Box width='100%' backgroundColor='gray.800' my={2}>
        {feedbackPage ? (
          <FeedBack setFeedbackPage={setFeedbackPage} />
        ) : (
          <>
            <HStack justifyContent='space-evenly'>
              <Button
                color='#F0B90B'
                size='sm'
                onClick={() =>
                  getPrice('USDT', condition, verifiedUser, paymentMethod)
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
                  getPrice('DAI', condition, verifiedUser, paymentMethod);
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
                  getPrice('BUSD', condition, verifiedUser, paymentMethod);
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
                  getPrice('BTC', condition, verifiedUser, paymentMethod);
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
                  getPrice('ETH', condition, verifiedUser, paymentMethod);
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
                <option value='all-payments'>Todos los pagos</option>
                <option value='MercadoPagoNew'>MercadoPago</option>
                <option value='BancoBrubankNew'>Brubank</option>
                <option value='UalaNew'>Ualá</option>
                <option value='BankArgentina'>Trans. bancaria</option>
                <option value='CashInPerson'>Efectivo</option>
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
                  Solo usuarios verificados
                </Text>
              </Checkbox>
            </Stack>
            <Body
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
