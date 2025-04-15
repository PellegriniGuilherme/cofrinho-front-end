'use client'

import { TextInput } from '@/components/FormField/FormField';
import { useForgotPassword } from '@/hooks/useAuth';
import alertDispatch from '@/utils/alertDispatch';
import { routes } from '@/utils/routes';
import { validateError } from '@/utils/validateError';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Heading, Separator, Text } from '@pellegrinidev/piggy-ui';
import {  MoveRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface ForgotFormValues {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
  });

  const form = useForm<ForgotFormValues>({
    resolver: yupResolver(forgotPasswordSchema)
  });

  const forgotPassword = useForgotPassword();

  const onSubmit = async (data: ForgotFormValues) => {
    await forgotPassword.mutateAsync(data.email, {
      onSuccess(data) {
        alertDispatch(data);
      },
      onError(error) {
        validateError(error, form.setError);
      }
    });
    form.reset();
  };

  return (
    <>
      <div className='flex flex-col items-center w-full h-full'>
        <div className='flex flex-col p-3 sm:p-10 w-full gap-1'>
          <Heading size='4xl' weight='semibold'>
            Esqueceu sua senha?
          </Heading>
          <Heading size='4xl' as='h1' className='text-brand-500'>
            Recuperar senha
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
            <Button className='mt-3 ml-auto' disabled={form.formState.isSubmitting} type='submit'>
              Enviar email de recuperação
            </Button>              
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ForgotPasswordPage;