import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@pellegrinidev/piggy-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../FormField/FormField";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategory";
import { Category } from "@/api/services/categoryService";
import { validateError } from "@/utils/validateError";
import alertDispatch from "@/utils/alertDispatch";


interface FormCategory {
  name: string;
  color: string;
}

export default function CreateCategory({ children, initialValue }: { children: React.ReactNode, initialValue?: Category }) {

  const [open, setOpen] = useState(false);
  const form = useForm<FormCategory>({
    defaultValues: {
      name: initialValue?.name || '',
      color: initialValue?.color || '#000000'
    }
  });
  const CreateCategory = useCreateCategory();
  const UpdateCategory = useUpdateCategory();

  const onSubmit = async (data: FormCategory) => {
    if (initialValue) {
      await UpdateCategory.mutateAsync({
        id: initialValue.id,
        name: data.name,
        color: data.color
      }, {
        onSuccess(data) {
          alertDispatch(data);
          setOpen(false);
        },
        onError(error) {
          validateError<FormCategory>(error, form.setError);
        }
      });
    }else {   
      await CreateCategory.mutateAsync(data, {
        onSuccess(data) {
          alertDispatch(data);
          handleClose();
        },
        onError(error) {
          validateError<FormCategory>(error, form.setError);
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
            {`${initialValue ? 'Editar' : 'Adicionar'} Categoria`} 
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id='create-category' className="flex flex-row gap-4 py-5">
          <TextInput
            name='name'
            label='Nome'
            type='text'
            placeholder='Digite o nome da categoria'
            required
          />
          <TextInput
            name='color'
            label='Cor'
            type='color'
            className='w-14'
            required
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
            form="create-category" 
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}