import { Category } from "@/api/services/categoryService";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Card, CardContent, CardTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@pellegrinidev/piggy-ui";
import { EllipsisVertical } from "lucide-react";
import CreateCategory from "../CreateCategory/CreateCategory";
import { useRef } from "react";
import { useDeleteCategory } from "@/hooks/useCategory";
import alertDispatch from "@/utils/alertDispatch";
import { validateError } from "@/utils/validateError";

const CategoryCard = ({ category }: { category: Category }) => {

  const createRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);
  const deleteCategory = useDeleteCategory();

  const handleDelete = async () => {
    await deleteCategory.mutateAsync(category.id, {
      onSuccess(data) {
        alertDispatch(data);
      },
      onError(error) {
        validateError(error)
      }
    });
  }

  return (
    <>
      <CreateCategory initialValue={category}>
        <button ref={createRef} className="hidden"/>
      </CreateCategory>
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

      <Card className="w-1/5 border border-brand-100 relative">
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full" style={{ backgroundColor: category.color }} />
            <CardTitle className="text-neutral-800">
              {category.name}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="absolute right-1" size="icon">
                  <EllipsisVertical />
                </Button>
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
        </CardContent>
      </Card>
    </>
  );
}

export default CategoryCard;