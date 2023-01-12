import {
  Textarea,
  Box,
  Text,
  VStack,
  Button,
  Input,
  FormLabel,
  Divider,
} from '@chakra-ui/react';
import React, { useState, ChangeEvent } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { sendEmail } from '../api/getPrices';
import { EmailValues } from '../types/api.interface';

interface FeedbackProps {
  setPage: (e: string) => void;
  fiat: string;
}

const FeedBack: React.FC<FeedbackProps> = ({ setPage, fiat }) => {
  const [values, setValues] = useState<EmailValues>({ message: '', mail: '' });
  // Need to implement a state manager for this
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const send = await sendEmail(values);
      if (send) {
        setLoading(false);
        setSuccess(true);
        setError(false);
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(true);
    }
  };

  const handleIsValid = (): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.mail || !re.test(values.mail) || !values.message) {
      return true;
    }

    return false;
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
      <Text color='white' fontWeight='bold' fontSize='md'>
        {fiat === 'BRL'
          ? 'Existe alguma funcionalidade que você gostaria de ver?'
          : '¿Hay alguna funcionalidad que te gustaría ver?'}
      </Text>
      <Text color='white' fontSize='sm' fontWeight='bold'>
        {fiat === 'BRL'
          ? 'Escreva-me e responderei o mais rápido possível!'
          : '¡Escribime y te contesto a la brevedad!'}
      </Text>
      <Divider color='whiteAlpha.400' my={5} />
      <VStack justifyContent='center' mt={6} mb={2} spacing={6}>
        <VStack spacing={0}>
          <FormLabel
            fontSize='xl'
            m={0}
            p={0}
            color='whiteAlpha.800'
            fontWeight='bold'
          >
            {fiat === 'BRL' ? 'Seu endereço de email' : 'Tu dirección de email'}
          </FormLabel>
          <Text
            fontSize='xs'
            m={0}
            p={0}
            color='whiteAlpha.800'
            fontWeight='bold'
          >
            {fiat === 'BRL'
              ? 'Vou usá-lo apenas para responder a sua mensagem'
              : '(lo usaré solo para contestar tu mensaje)'}
          </Text>
        </VStack>
        <Input
          name='mail'
          value={values.mail}
          onChange={handleChange}
          borderRadius={10}
          width='95%'
          color='white'
          fontWeight='bold'
          textAlign='center'
          borderColor='#F0B90B'
          _hover={{ borderColor: '#F0B90B', borderWidth: 2 }}
        />
        <FormLabel fontSize='xl' color='whiteAlpha.800' fontWeight='bold'>
          {fiat === 'BRL' ? 'Sua mensagem' : 'Tu mensaje'}
        </FormLabel>
        <Textarea
          size='xl'
          value={values.message}
          onChange={handleChange}
          color='white'
          borderRadius={10}
          padding={2}
          width='95%'
          name='message'
          fontSize='md'
          borderColor='#F0B90B'
          _hover={{ borderColor: '#F0B90B', borderWidth: 2 }}
        />
        <Button
          disabled={handleIsValid()}
          onClick={() => handleSubmit()}
          backgroundColor='#F0B90B'
          _hover={{ opacity: 0.7 }}
          isLoading={loading}
          loadingText='Enviando...'
        >
          {fiat === 'BRL' ? 'Mandar' : 'Enviar'}
        </Button>
      </VStack>
      {success && (
        <Text mb={2} color='green.300' fontWeight='bold'>
          ¡Gracias! Tu mail fue enviado correctamente
        </Text>
      )}
      {error && (
        <Text mb={2} color='red.300' fontWeight='bold'>
          ¡UPS! Algo salió mal, intenta en unos instantes nuevamente.
        </Text>
      )}
    </Box>
  );
};

export default FeedBack;
