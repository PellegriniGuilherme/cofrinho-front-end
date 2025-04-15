'use client'

import { TextInput } from '@/components/FormField/FormField';
import { useRegister } from '@/hooks/useAuth';
import alertDispatch from '@/utils/alertDispatch';
import { routes } from '@/utils/routes';
import { validateError } from '@/utils/validateError';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Heading, Separator, Text } from '@pellegrinidev/piggy-ui';
import {  MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPgae: React.FC = () => {

  const router = useRouter();
  
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nome é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'As senhas não conferem')
      .required('Confirmação de senha é obrigatória'),
  });
  
  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema)
  });

  const register = useRegister();

  const onSubmit = async (data: RegisterFormValues) => {
    console.debug('Register data', data);
    await register.mutateAsync(data, {
      onError(error) {
        validateError<RegisterFormValues>(error, form.setError);
      },
      onSuccess(data) {
        alertDispatch(data);
        router.push(routes.auth.login);
      }
    })
  };

  return (
    <>
      <div className='flex flex-col items-center w-full h-full'>
        <div className='flex flex-col p-3 sm:p-10 w-full gap-1'>
          <Heading size='4xl' weight='semibold'>
            Bem vindo!
          </Heading>
          <Heading size='4xl' as='h1' className='text-brand-500'>
            Registro
          </Heading>
          <Text className='mt-5'>
            Caso já tenha uma conta
          </Text>
          <Link href={routes.auth.login} className='w-fit'>
            <Text className='text-brand-500 flex gap-1 items-center'>
              Você pode fazer login aqui
              <MoveRight />
            </Text>
          </Link>
        </div>
        <div className="aspect-square hidden h-2/3 self-end lg:flex">
          <img
            src="/images/mascote/Register.png"
            alt="Mascote"
            className="w-full h-full object-contain -scale-x-100"
          />
        </div>
      </div>
      <div className='self-stretch my-2'>
        <Separator orientation='vertical'/>
      </div>
      <div className='flex flex-col items-center justify-center w-full self-stretch'>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full p-3 sm:px-10 lg:px-20 '>
            <TextInput
              name='name'
              label='Nome'
              type='text'
              placeholder='Digite seu nome'
              required
            />
            <TextInput
              name='email'
              label='Email'
              type='email'
              placeholder='Digite seu email'
              required
            />  
            <TextInput
              name='password'
              label='Senha'
              type='password'
              placeholder='Digite sua senha'
              required
            />
            <TextInput
              name='password_confirmation'
              label='Confirmar Senha'
              type='password'
              placeholder='Digite sua senha'
              required
            />
            <Button className='mt-3 ml-auto'>
              Criar conta
            </Button>              
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default RegisterPgae;