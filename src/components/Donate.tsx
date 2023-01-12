import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaCopy, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { cryptoNetwork, cryptoToDonate, cryptoAdresses } from '../data';
import { CryptoAddresses, CryptoToDonate } from '../types/data.interface';

interface DonateProps {
  fiat: string;
  setPage: (e: string) => void;
}

const Donate: React.FC<DonateProps> = ({ fiat, setPage }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const QR: { [key: string]: any } = {
    BEP20: require.context('../images/addresses/BEP20', true),

    ERC20: require.context('../images/addresses/ERC20', true),

    BTC: require.context('../images/addresses/BTC', true),
  };

  useEffect(() => {
    if (copied) {
      const delayDebounceFn = setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [copied]);

  const handleCopy = (text: string) => {
    setCopied(true);
    navigator.clipboard.writeText(text);
  };
  return (
    <Box backgroundColor='gray.800'>
      <Box display='flex' ml={5} mt={2} mb={5}>
        <FaArrowLeft
          cursor='pointer'
          color='#F0B90B'
          size={15}
          onClick={() => setPage('Home')}
        />
      </Box>
      <Text color='whiteAlpha.800' fontSize='sm' fontWeight='bold'>
        {fiat === 'BRL'
          ? 'ajuda-me a seguir mejorando esta extensión'
          : 'Ayúdame a seguir mejorando esta extensión'}
        <br />
        {fiat === 'BRL'
          ? '¡Sua doação é apreciada!'
          : '¡Tu donación es apreciada!'}
      </Text>
      <Divider my={4} />

      <Text color='whiteAlpha.800' fontSize='md' fontWeight='bold'>
        {fiat === 'BRL'
          ? 'Selecione a moeda a ser usada'
          : 'Selecciona la moneda a utilizar'}
      </Text>
      <HStack my={4} justifyContent='space-evenly'>
        {cryptoToDonate.map((crypto) => (
          <Button
            value={crypto}
            onClick={() => setSelectedCrypto(crypto)}
            textDecoration={selectedCrypto === crypto ? 'underline' : undefined}
            color='#F0B90B'
            size='sm'
            fontFamily='Nunito'
            variant='link'
          >
            {crypto}
          </Button>
        ))}
      </HStack>
      {!selectedCrypto.length ? null : (
        <VStack my={6}>
          <Text color='whiteAlpha.800' fontWeight='bold' fontSize='sm'>
            {fiat === 'BRL' ? 'Selecione a rede' : 'Selecciona la red'}
          </Text>
          <HStack width='100%' justifyContent='space-evenly'>
            {cryptoNetwork.map((network) =>
              (selectedCrypto === 'BTC' && network === 'ERC20') ||
              (selectedCrypto !== 'BTC' && network === 'BTC') ? null : (
                <Button
                  value={network}
                  onClick={() => setSelectedNetwork(network)}
                  textDecoration={
                    selectedNetwork === network ? 'underline' : undefined
                  }
                  color='#F0B90B'
                  size='xs'
                  fontFamily='Nunito'
                  variant='link'
                >
                  {network}
                </Button>
              )
            )}
          </HStack>
        </VStack>
      )}
      {!selectedNetwork ? null : (
        <VStack alignItems='center'>
          <img
            style={{ height: 120, width: 120 }}
            src={QR[selectedNetwork](`./${selectedCrypto}.png`).default}
          />
          <HStack>
            <Text color='whiteAlpha.800' fontWeight='bold' fontSize='xs'>
              {cryptoAdresses[selectedCrypto][selectedNetwork]}
            </Text>
            {copied ? (
              <FaCheck color='white' size={15} />
            ) : (
              <FaCopy
                onClick={() =>
                  handleCopy(cryptoAdresses[selectedCrypto][selectedNetwork])
                }
                cursor='pointer'
                color='white'
                size={15}
              />
            )}
          </HStack>
          <Text my={4} color='green.400' fontSize='md' fontWeight='bold'>
            !Muchas gracias por tu aporte!
          </Text>
        </VStack>
      )}
    </Box>
  );
};

export default Donate;
