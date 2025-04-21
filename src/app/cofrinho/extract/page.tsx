'use client';
import { Transaction } from "@/api/services/transactionService";
import CreateTransaction from "@/components/CreateTransaction/CreateTransaction";
import ExtractsCard from "@/components/ExtractsCard/ExtractsCard";
import { useDeleteTransaction } from "@/hooks/useTransaction";
import { useAccount } from "@/stores/account";
import alertDispatch from "@/utils/alertDispatch";
import { sensibleValue } from "@/utils/sensitiveValue";
import { validateError } from "@/utils/validateError";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Badge, Button, Card, CardContent, CardHeader, Heading, Text, Tooltip, TooltipContent, TooltipTrigger } from "@pellegrinidev/piggy-ui";
import { Eye, EyeClosed, Pen, Plus, Trash } from "lucide-react";
import moment from "moment";
import { useState } from "react";

const ExtractPage = () => {

  const [transaction, setTransaction] = useState<Transaction|null>(null);
  const showValues = useAccount((s) => s.showValues);
  const toggleShowValues = useAccount((s) => s.toggleShowValues);

  const onSelect = (transactionSelected: Transaction) => {
    setTransaction(transactionSelected);
  }

  const deleteTransaction = useDeleteTransaction();
  
  const handleDelete = async (transaction: Transaction) => {
    await deleteTransaction.mutateAsync(transaction.id, {
      onSuccess(data) {
        setTransaction(null);
        alertDispatch(data);
      },
      onError(error) {
        validateError(error)
      }
    });
  }

  return (
    <div className="flex flex-col h-full">
      <div className='mb-4 flex flex-row items-center justify-between'>
        <Heading size='3xl' className='mb-4 text-brand-500'>
          Extrato detalhado
        </Heading>
        <div className="flex flex-row items-center gap-2">
          <Tooltip>
            <CreateTransaction>
              <TooltipTrigger asChild>
                <Button className="rounded-full" size="icon">
                  <Plus />
                </Button>
              </TooltipTrigger>
            </CreateTransaction>
            <TooltipContent>
              <div className="flex flex-col gap-2">
                <Heading size="sm" className="text-brand-500">
                  Adicionar Transação
                </Heading>
                <p className="text-sm">
                  Clique para adicionar uma nova transação
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
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
      </div>
      <div className="flex-1 flex flex-col gap-4 md:flex-row overflow-hidden pb-1">
        <div className="w-1/3">
          <ExtractsCard onSelect={onSelect} selected={transaction} showHeader={false} />
        </div>
        <div className="w-2/3">
          {transaction && (
            <Card className="border border-brand-100">
              <CardHeader className="mb-0">
                <div className="flex flex-row items-center justify-start">
                  <Heading size='lg' className='text-brand-500'>
                    Detalhes da transação
                  </Heading>
                  <div className="flex flex-row items-center gap-2 ml-auto">
                    <CreateTransaction initialValue={transaction}>
                      <Button className="rounded-full" size="icon">
                        <Pen />
                      </Button>
                    </CreateTransaction>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="rounded-full" size="icon">
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(transaction)}>
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Heading size='md'>Categoria:</Heading>
                  <Text>
                    <Badge className={`text-white`} style={{backgroundColor: transaction?.category?.color ?? '#000000'}}>
                      {transaction?.category?.name ?? 'Sem categoria'}
                    </Badge>
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Heading size='md'>Tipo de transação:</Heading>
                  <Text className={transaction.type === 'income' ? 'text-success-500' : 'text-danger-500'}>
                    {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Heading size='md'>Descrição:</Heading>
                  <Text>
                    {transaction.description ?? 'Sem descrição'}
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Heading size='md'>Valor:</Heading>
                  <Text className={transaction.type === 'income' ? 'text-success-500' : 'text-danger-500'}>
                    {sensibleValue(transaction.amount, showValues)}
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Heading size='md'>Data da transação:</Heading>
                  <Text>
                    {moment(transaction.happened_at).format('DD/MM/YYYY')}
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Heading size='md'>Data da criação:</Heading>
                  <Text>
                    {moment(transaction.created_at).format('DD/MM/YYYY')}
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Heading size='md'>Data da ultima atualização:</Heading>
                  <Text>
                    {moment(transaction.updated_at).format('DD/MM/YYYY')}
                  </Text>
                </div>
              </CardContent>
            </Card>
          )}
          {
            !transaction && (
              <div className="flex flex-col items-center justify-center h-full">
                <Heading size="2xl" className="text-brand-500 mb-5">
                  Selecione uma transação para ver os detalhes
                </Heading>
                <img src="/images/mascote/Dashboard.png" alt="Empty" className="w-1/4" />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};
export default ExtractPage;