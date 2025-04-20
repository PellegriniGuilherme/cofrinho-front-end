'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Badge, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Heading, Separator, Text } from "@pellegrinidev/piggy-ui";
import { BanknoteArrowDown, BanknoteArrowUp, CalendarCheck2, CalendarSearch, EllipsisVertical } from "lucide-react";
import { useRef } from "react";
import alertDispatch from "@/utils/alertDispatch";
import { validateError } from "@/utils/validateError";
import { useDeleteTransaction } from "@/hooks/useTransaction";
import { Transaction } from "@/api/services/transactionService";
import { useAccount } from "@/stores/account";
import { sensibleValue } from "@/utils/sensitiveValue";
import CreateTransaction from "../CreateTransaction/CreateTransaction";
import moment from "moment";
import 'moment/locale/pt-br';

moment.locale('pt-br');

const ExtractCard = ({ transaction, showLine }: { transaction: Transaction, showLine: boolean }) => {

  const createRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);
  const deleteTransaction = useDeleteTransaction();
  const showValues = useAccount((s) => s.showValues);

  const handleDelete = async () => {
    await deleteTransaction.mutateAsync(transaction.id, {
      onSuccess(data) {
        alertDispatch(data);
      },
      onError(error) {
        validateError(error)
      }
    });
  }

  const isFuture = moment(transaction.happened_at).isBefore(moment());

  return (
    <>
      <CreateTransaction initialValue={transaction}>
        <button ref={createRef} className="hidden"/>
      </CreateTransaction>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button ref={deleteRef} className="hidden"/>
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
            <AlertDialogAction onClick={handleDelete}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="w-full relative my-4">
        <div className="flex gap-4 justify-start items-center">
          <div className="flex justify-center items-center">
            <span className={`w-12 h-12 flex justify-center items-center bg-neutral-100 rounded-full ${transaction.type === 'income' ? 'text-success-400' : 'text-danger-400'}`}>
              {transaction.type === 'income' ? <BanknoteArrowUp /> : <BanknoteArrowDown />}
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 w-full">
              {
                transaction.category && (
                  <Badge className={`text-white`} style={{backgroundColor: transaction.category.color}}>
                    {transaction.category.name}
                  </Badge>
                )
              }
              <Heading size="sm">
                {transaction.description}
              </Heading>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical className="size-5 text-brand-500 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" alignOffset={-10}>
                    <DropdownMenuItem onClick={() => createRef.current?.click()}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteRef.current?.click()}>
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <Heading className={`${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'} text-lg font-semibold`}>
                {sensibleValue(transaction.amount, showValues)}
              </Heading>
              <div className="flex justify-end items-center gap-2 ml-auto">
                <Text>
                  {isFuture ? 
                      <CalendarCheck2  className="text-success-500 size-5" />
                    : 
                      <CalendarSearch  className="text-secondary-500 size-5" />
                  }
                </Text>
                <Text className={isFuture ? 'text-success-500' : 'text-secondary-500'}>
                  {moment(transaction.happened_at).format('DD MMM YY')}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        showLine && (
          <Separator orientation="horizontal" className="bg-brand-100" />
        )
      }
    </>
  );
}

export default ExtractCard;