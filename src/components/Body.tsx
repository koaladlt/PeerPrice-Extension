import React from 'react';
import {
  VStack,
  Spinner,
  HStack,
  Text,
  Box,
  Button,
  Divider,
} from '@chakra-ui/react';

interface BodyProps {
  loading: boolean;
  error: boolean;
  prices: string[];
  condition: string;
  url: string;
  paymentMethod: string[];
  fiat: string;
}

const Body: React.FC<BodyProps> = ({
  loading,
  error,
  prices,
  condition,
  url,
  paymentMethod,
  fiat,
}) => {
  return (
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
      ) : prices.length > 0 ? (
        prices.map((price: string, idx: number) => (
          <VStack key={idx} width='100%'>
            <HStack justifyContent='space-evenly' spacing={4} width='100%'>
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
  );
};

export default Body;
