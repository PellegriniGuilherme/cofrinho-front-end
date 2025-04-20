'use client'
import { DashboardCategorySummary } from '@/api/services/transactionService';
import ChartByCategory from '@/components/ExpenseChart/ExpenseChart';
import ExtractsCard from '@/components/ExtractsCard/ExtractsCard';
import ValueCard from '@/components/ValueCard/ValueCard';
import { useBalance } from '@/hooks/useDashboard';
import { useAccount } from '@/stores/account';
import { useAuthStore } from '@/stores/auth';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@pellegrinidev/piggy-ui';
import { BanknoteArrowDown, BanknoteArrowUp, Eye, EyeClosed } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const showValues = useAccount((s) => s.showValues);
  const toggleShowValues = useAccount((s) => s.toggleShowValues);
  const [chartType, setChartType] = useState<'expense' | 'income'>('expense');
  const { data, isLoading } = useBalance();

  const toggleChartType = () => {
    setChartType((prev) => (prev === 'expense' ? 'income' : 'expense'));
  }

  const { incomeChartData, expenseChartData } = useMemo(() => {
    const incomeRaw: DashboardCategorySummary[] = data?.data?.dashboard?.income ?? []
    const expenseRaw: DashboardCategorySummary[] = data?.data?.dashboard?.expense ?? []

    const incomeChartData = incomeRaw.map((item) => ({
      name: item.category,
      total: parseFloat(item.total),
      fill: item.category_color,
    }))

    const expenseChartData = expenseRaw.map((item) => ({
      name: item.category,
      total: parseFloat(item.total),
      fill: item.category_color,
    }))

    return { incomeChartData, expenseChartData }
  }, [data]);


  const expenseChartConfig = useMemo(() => {
    return expenseChartData.reduce((acc, item) => {
      acc[item.name] = {
        label: item.name,
        theme: {
          light: item.fill,
          dark: item.fill,
        },
      };
      return acc;
    }, {} as Record<string, { label: string; theme: { light: string; dark: string } }>);
  }, [expenseChartData]);

  const incomeChartConfig = useMemo(() => {
    return incomeChartData.reduce((acc, item) => {
      acc[item.name] = {
        label: item.name,
        theme: {
          light: item.fill,
          dark: item.fill,
        },
      };
      return acc;
    }, {} as Record<string, { label: string; theme: { light: string; dark: string } }>);
  }, [incomeChartData]);

  return (
    <div className="flex flex-col h-full">
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
      <div className="flex-1 flex flex-col gap-4 md:flex-row overflow-hidden pb-1">
        <div className="flex flex-col h-full w-full gap-5 md:w-1/2 lg:w-3/5">
          <div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-3'>
            {
              isLoading && (
                <>
                  <Skeleton className='h-40 w-full rounded-lg' />
                  <Skeleton className='h-40 w-full rounded-lg' />
                  <Skeleton className='h-40 w-full rounded-lg' />
                </>
              )
            }
            {
              !isLoading && data?.data && (
                <>
                  <ValueCard
                    title='Saldo Total'
                    value={data.data.amount}
                    description='Total'
                    classColor={
                      data.data.amount >= 0 ? 'text-success-500' : 'text-danger-500'
                    }
                  />
                  <ValueCard
                    title='Receitas'
                    classColor='text-success-500'
                    value={data.data.income}
                    description='Total'
                  />
                  <ValueCard
                    title='Despesas'
                    classColor='text-danger-500'
                    value={data.data.expense}
                    description='Total'
                  />
                </>
              )
            }
          </div>
          <div className="flex flex-col flex-1">
            <Card className='flex flex-col flex-1 border border-brand-100'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle>{ chartType === 'expense' ? 'Despesas' : 'Receitas' } por Categorias</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className='rounded-full'
                        size='icon'
                        onClick={toggleChartType}
                      >
                        {chartType == 'expense' ? <BanknoteArrowDown /> : <BanknoteArrowUp />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex flex-col gap-2">
                        <Heading size='sm' className="text-brand-500">
                          {chartType == 'expense' ? 'Despesas' : 'Receitas'}
                        </Heading>
                        <p className="text-sm">
                          {chartType == 'expense'
                            ? 'Clique para ver as receitas'
                            : 'Clique para ver as despesas'
                          }
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent className="overflow-hidden h-full relative">
                  <AnimatePresence>
                    {!showValues && (
                      <motion.div
                        className="absolute inset-0 z-50 backdrop-blur-sm bg-white/70 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <EyeClosed className="text-brand-500 size-20" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <ChartByCategory
                    data={chartType === 'expense' ? expenseChartData : incomeChartData}
                    config={chartType === 'expense' ? expenseChartConfig : incomeChartConfig}
                    chartType={chartType}
                    isLoading={isLoading}
                  />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="md:w-1/2 lg:w-2/5 h-full">
          <ExtractsCard />
        </div>
      </div>  
    </div>
  );
}
