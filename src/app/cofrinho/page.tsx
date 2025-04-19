'use client'
import ValueCard from '@/components/ValueCard/ValueCard';
import { useAccount } from '@/stores/account';
import { useAuthStore } from '@/stores/auth';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@pellegrinidev/piggy-ui';
import { Eye, EyeClosed } from 'lucide-react';
import React from 'react';

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const showValues = useAccount((s) => s.showValues);
  const toggleShowValues = useAccount((s) => s.toggleShowValues);

  return (
    <div>
      {user && (
        <div className='mb-4 flex flex-row items-center justify-between'>
          <Heading size='3xl' className='mb-4 text-brand-500'>
            {`Olá, ${user.name.split(' ')[0]}!`}
          </Heading>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className='rounded-full'
                size='icon'
                onClick={toggleShowValues}
              >
                {showValues ? <Eye /> : <EyeClosed />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-2">
                <Heading size='sm' className="text-brand-500">
                  {showValues ? 'Esconder Valores' : 'Mostrar Valores'}
                </Heading>
                <p className="text-sm">
                  {showValues
                    ? 'Clique para esconder os valores'
                    : 'Clique para mostrar os valores'}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      <div className='flex flex-col gap-4 md:flex-row items-stretch'>
        <div className='flex w-full flex-col gap-5 md:w-1/2 lg:w-3/5'>
          <div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-3'>
            <ValueCard title='Saldo Total' value={14000} description='Este mês' />
            <ValueCard
              title='Receitas'
              classColor='text-success-500'
              value={14000}
              description='Este mês'
            />
            <ValueCard
              title='Despesas'
              classColor='text-danger-500'
              value={14000}
              description='Este mês'
            />
          </div>
          <Card className='border border-brand-100'>
            <CardHeader>
              <CardTitle>Gastos por Categoria</CardTitle>
            </CardHeader>
            <CardContent>teste</CardContent>
          </Card>
        </div>
        <Card className="border border-brand-100 flex w-full flex-col max-h-[75vh] md:w-1/2 lg:w-2/5">
          <CardHeader>
            <CardTitle>Extrato</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto max-h-full">
            <p>Card Extrato</p>
          </CardContent>
        </Card>
      </div>  
    </div>
  );
}
