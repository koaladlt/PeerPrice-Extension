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
}

const Body: React.FC<BodyProps> = ({
  loading,
  error,
  prices,
  condition,
  url,
}) => {
  return (
    <VStack backgroundColor='gray.800' my={6}>
      {loading && <Spinner alignItems='center' color='#F0B90B' />}
      {error ? (
        <>
          <Text color='red.300' fontSize='xl'>
            Ups, hubo un error
          </Text>
          <Text color='red.300' fontSize='xl'>
            Intentalo nuevamente
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
