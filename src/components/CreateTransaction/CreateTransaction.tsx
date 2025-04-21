import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@pellegrinidev/piggy-ui";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CurrencyTextInput, DateInput, SelectInput, SwitchInput, TextInput } from "../FormField/FormField";
import { validateError } from "@/utils/validateError";
import alertDispatch from "@/utils/alertDispatch";
import { Transaction } from "@/api/services/transactionService";
import moment from 'moment-timezone';
import { useCreateTransaction, useUpdateTransaction } from "@/hooks/useTransaction";
import { useCategories } from "@/hooks/useCategory";
import { Category } from "@/api/services/categoryService";

export interface FormTransaction {
  category_id?: string;
  amount: number;
  description?: string;
  happened_at?: string;
  type?: 'income' | 'expense';
}

moment.tz.setDefault('America/Sao_Paulo');
moment.locale('pt-br');

export default function CreateTransaction({ children, initialValue }: { children: React.ReactNode, initialValue?: Transaction }) {

  const [open, setOpen] = useState(false);
  const { data, isLoading } = useCategories();

  const form = useForm<FormTransaction>({
    defaultValues: {
      category_id: initialValue?.category?.id ? `${initialValue.category.id}` : undefined,
      amount: initialValue?.amount || undefined,
      description: initialValue?.description || '',
      happened_at: initialValue?.happened_at || moment().format('YYYY-MM-DD'),
      type: initialValue?.type || 'expense',
    }
  });

  useEffect(() => {
    form.reset({
      category_id: initialValue?.category?.id ? `${initialValue.category.id}` : undefined,
      amount: initialValue?.amount || undefined,
      description: initialValue?.description || '',
      happened_at: initialValue?.happened_at || moment().format('YYYY-MM-DD'),
      type: initialValue?.type || 'expense',
    });
  }, [initialValue]);

  const CreateTransaction = useCreateTransaction();
  const UpdateTransaction = useUpdateTransaction();

  const categoriesOptions = useMemo(() => {
    if (isLoading) return [];

    return data?.data.map((category: Category) => ({
      value: `${category.id}`,
      label: category.name,
    })) || [];

  }, [data, isLoading]);

  const onSubmit = async (data: FormTransaction) => {
    if (initialValue) {
      await UpdateTransaction.mutateAsync({
        id: initialValue.id,
        ...data,
      }, {
        onSuccess(data) {
          alertDispatch(data);
          setOpen(false);
        },
        onError(error) {
          validateError<FormTransaction>(error, form.setError);
        }
      });
    }else {   
      await CreateTransaction.mutateAsync(data, {
        onSuccess(data) {
          alertDispatch(data);
          handleClose();
          form.reset();
        },
        onError(error) {
          validateError<FormTransaction>(error, form.setError);
        }
      });
    }
  }

  const handleClose = () => {
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {`${initialValue ? 'Editar' : 'Adicionar'} Transação`} 
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id='create-transaction' className="flex flex-col gap-4 py-5">
          <div className="flex flex-row justify-between gap-8">
            <CurrencyTextInput
              name="amount"
              label="Valor"
              required
            />
            <div className="ml-auto my-auto">
              <SwitchInput
                name="type"
                label="Receita"
                checkedValue="income"
                uncheckedValue="expense"
              />
            </div>
          </div>
          <SelectInput
            name="category_id"
            label="Categoria"
            placeholder="Selecione uma categoria"
            options={categoriesOptions}
            required
          />
          <TextInput
            name="description"
            label="Descrição"
            placeholder="Descrição da transação"
            type="text"
          />
          <DateInput
            name="happened_at"
            label="Data"
            placeholder="Data da transação"
          />
        </form>
        </FormProvider>
        <DialogFooter>
          <Button
            variant="outline"
            type='button' 
            onClick={handleClose}
            disabled={form.formState.isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            form="create-transaction" 
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}