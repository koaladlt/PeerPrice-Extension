import { VStack, Text, Heading, Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { Datum } from '../types/api.interface';

interface UserInfoProps {
  setPage: (e: string) => void;
  userInfo: Datum;
}

const UserInfo: React.FC<UserInfoProps> = ({ setPage, userInfo }) => {
  return (
    <VStack backgroundColor='gray.800' my={6} px={10}>
      <Box mb={10} w='100%'>
        <Box display='flex' alignSelf='flex-start' mt={2} mb={5}>
          <FaArrowLeft
            cursor='pointer'
            color='#F0B90B'
            size={15}
            onClick={() => setPage('Home')}
          />
        </Box>
        <Text fontSize='xl' color='whiteAlpha.900'>
          Información del usuario:
        </Text>
        <HStack alignSelf='center' justifyContent='center'>
          <Text
            textAlign='center'
            fontSize='2xl'
            color='whiteAlpha.900'
            fontWeight='bold'
          >
            {userInfo.advertiser.nickName}
          </Text>
          <FaCheckCircle
            color='#E5C232'
            title='Usuario verificado'
            style={{
              visibility:
                userInfo.advertiser.userType !== 'merchant'
                  ? 'hidden'
                  : 'visible',
            }}
          />
        </HStack>
      </Box>
      <VStack width='100%'>
        <HStack justifyContent={'space-between'} w='100%'>
          <Text fontSize='md' color='white'>
            Nombre de usuario:
          </Text>
          <Text fontSize='md' fontWeight='bold' color='white'>
            {userInfo.advertiser.nickName}
          </Text>
        </HStack>
        <HStack w='100%' justifyContent={'space-between'}>
          <Text fontSize='md' color='white'>
            Mínimo:
          </Text>
          <Text fontSize='md' fontWeight='bold' color='white'>
            {userInfo.adv.minSingleTransAmount} ARS
          </Text>
        </HStack>
        <HStack justifyContent={'space-between'} w='100%'>
          <Text fontSize='md' color='white'>
            Máximo:
          </Text>
          <Text fontSize='md' fontWeight='bold' color='white'>
            {userInfo.adv.maxSingleTransAmount} ARS
          </Text>
        </HStack>
        <VStack mt={10}>
          <Text fontSize='lg' fontWeight='bold' color='white'>
            Métodos de pago:
          </Text>
          {userInfo.adv.tradeMethods.map((method) => (
            <Text
              key={method.tradeMethodName}
              fontWeight='bold'
              color={method.tradeMethodBgColor}
              px={2}
              bg='gray.700'
            >
              {method.tradeMethodName}
            </Text>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default UserInfo;
