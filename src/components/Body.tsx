import React, { useState } from 'react';
import {
  VStack,
  Spinner,
  HStack,
  Text,
  Box,
  Button,
  Divider,
} from '@chakra-ui/react';
import { Datum } from '../types/api.interface';
import { PricesType } from './App';
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa';


interface BodyProps {
  loading: boolean;
  error: boolean;
  prices: PricesType;
  condition: string;
  url: string;
  paymentMethod: string[];
  fiat: string;
  setPage: (e: string) => void;
  page: string;
  userInfo: Datum | undefined | null;
  setUserInfo: (e: Datum | undefined | null) => void;
}

const Body: React.FC<BodyProps> = ({
  loading,
  error,
  prices,
  condition,
  url,
  paymentMethod,
  fiat,
  setPage,
  userInfo,
  setUserInfo,
}) => {
  const handleUserInfo = (user: Datum) => {
    setUserInfo(user);
    setPage('UserInfo');
  };
  return (
    <>
      <VStack backgroundColor='gray.800' my={6}>
        {loading ? (
          <>
            {paymentMethod[0] === 'CashInPerson' && (
              <Text color='#E5C232' mb={2}>
                La opción de efectivo suele tener poca demanda y por lo tanto el
                tiempo de respuesta puede ser mayor
              </Text>
            )}
            <Spinner alignItems='center' color='#F0B90B' />
          </>
        ) : null}

        {error ? (
          <>
            <Text color='red.300' fontSize='xl'>
              Ups, hubo un error
            </Text>
            <Text color='red.300' fontSize='xl'>
              Intentalo nuevamente
            </Text>
            <Text color='#F0B90B' fontSize='xl' fontWeight='extrabold'>
              Tip: probá limpiando algunos filtros
            </Text>
          </>
        ) : prices && prices.prices.length > 0 ? (
          prices.prices.map((price, idx) => (
            <VStack key={idx} width='100%'>
              <HStack justifyContent='space-evenly' spacing={4} width='100%'>
                <FaCheckCircle
                  color='#E5C232'
                  onClick={() => handleUserInfo(price)}
                  title='Usuario verificado'
                  style={{
                    visibility:
                      price.advertiser.userType !== 'merchant'
                        ? 'hidden'
                        : 'visible',
                  }}
                />

                <HStack>
                  <Text
                    ml={4}
                    color='whiteAlpha.800'
                    fontSize={'lg'}
                    fontWeight='extrabold'
                  >
                    {price.adv.price}
                  </Text>

                  <Text
                    ml='1'
                    color='whiteAlpha.800'
                    fontSize='xx-small'
                    fontWeight='extrabold'
                  >
                    {fiat}
                  </Text>
                </HStack>

                <Button
                  size='sm'
                  colorScheme={condition === 'SELL' ? 'red' : 'green'}
                  onClick={() => window.open(url)}
                >
                  {condition === 'SELL' ? 'Vender' : 'Comprar'}
                </Button>
                <FaInfoCircle
                  onClick={() => handleUserInfo(price)}
                  cursor='pointer'
                  title='Más información del usuario'
                  color='white'
                />
              </HStack>
              <Divider color='whiteAlpha.800' />
            </VStack>
          ))
        ) : (
          !loading && (
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
          )
        )}
      </VStack>
    </>
  );
};

export default Body;
