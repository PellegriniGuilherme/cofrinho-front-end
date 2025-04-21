'use client'

import { TextInput } from '@/components/FormField/FormField';
import { useResetPassword } from '@/hooks/useAuth';
import alertDispatch from '@/utils/alertDispatch';
import { routes } from '@/utils/routes';
import { validateError } from '@/utils/validateError';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Heading, Separator, Text } from '@pellegrinidev/piggy-ui';
import {  MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

export interface ResetFormValues {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

const ResetPasswordPage: React.FC = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const resetPassword = useResetPassword();

  const ResetSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'As senhas não conferem')
      .required('Confirmação de senha é obrigatória'),
    token: Yup.string()
      .required('Token é obrigatório')
  });

  const form = useForm<ResetFormValues>({
    resolver: yupResolver(ResetSchema),
    defaultValues: {
      token: token || '',
      email: email || '',
    }
  });

  const onSubmit = async (data: ResetFormValues) => {
    await resetPassword.mutateAsync(data)
    .then((response) => {
      alertDispatch(response);
      router.push(routes.auth.login);
    }).catch((error) => {
      validateError(error, form.setError);
    });
  };

  return (
    <>
      <div className='flex flex-col items-center w-full h-full'>
        <div className='flex flex-col p-3 sm:p-10 w-full gap-1'>
          <Heading size='4xl' weight='semibold'>
            Recuperando sua senha!
          </Heading>
          <Heading size='4xl' as='h1' className='text-brand-500'>
            Redefinir senha
          </Heading>
          <Text className='mt-5'>
            Lembrou sua senha?
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
            src="/images/mascote/Forgot.png"
            alt="Mascote"
            className="w-full h-full object-contain"
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
              label='Confirmar senha'
              type='password'
              placeholder='Confirme sua senha'
              required
            />
            <Button className='mt-3 ml-auto'>
              Redefinir senha
            </Button>              
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ResetPasswordPage;