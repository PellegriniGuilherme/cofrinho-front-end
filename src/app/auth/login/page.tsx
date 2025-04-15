'use client'
import { TextInput } from '@/components/FormField/FormField';
import GlobalError from '@/components/GlobalError/GlobalError';
import { useLogin } from '@/hooks/useAuth';
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

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {

  const router = useRouter();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
  });

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema)
  });
  const login = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    await login.mutateAsync(data, {
      onError(error) {
        validateError<LoginFormValues>(error, form.setError);
      },
      onSuccess(data) {
        alertDispatch(data);
        router.push(routes.cofrinho.home);
      }
    })
  };

  return (
    <>
      <div className='flex flex-col items-center w-full h-full'>
        <div className='flex flex-col p-3 sm:p-10 w-full gap-1'>
          <Heading size='4xl' weight='semibold'>
            Bem vindo de volta!
          </Heading>
          <Heading size='4xl' as='h1' className='text-brand-500'>
            Login
          </Heading>
          <Text className='mt-5'>
            Caso não tenha uma conta
          </Text>
          <Link href={routes.auth.register} className='w-fit'>
            <Text className='text-brand-500 flex gap-1 items-center'>
              Você pode crie uma conta 
              <MoveRight />
            </Text>
          </Link>
        </div>
        <div className="aspect-square hidden h-2/3 self-end mt-auto lg:flex">
          <img
            src="/images/mascote/Login.png"
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
            <GlobalError error={form.formState.errors?.root?.message} />
            <Link href={routes.auth.forgot}>
              <Button variant='link' type='button' className='mr-auto'>
                Esqueci minha senha
              </Button>
            </Link>
            <Button className='mt-3 ml-auto' type='submit' disabled={form.formState.isSubmitting}>
              Entrar
            </Button>              
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default LoginPage;