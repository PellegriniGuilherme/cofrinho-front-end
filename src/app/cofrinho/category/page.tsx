'use client';

import { Category } from "@/api/services/categoryService";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import CreateCategory from "@/components/CreateCategory/CreateCategory";
import { useCategories } from "@/hooks/useCategory";
import { Button, Heading, Skeleton, Tooltip, TooltipContent, TooltipTrigger } from "@pellegrinidev/piggy-ui";
import { Plus } from "lucide-react";

export default function CategoryPage() {

  const { data, isLoading } = useCategories();

  return (
    <div className='flex flex-col gap-4'>
      <div className='mb-4 flex flex-row items-center justify-between'>
        <Heading size='3xl' className='mb-4 text-brand-500'>
          Minhas Categorias
        </Heading>
        <Tooltip>
          <CreateCategory>
            <TooltipTrigger asChild>
                <Button
                  className='rounded-full'
                  size='icon'
                >
                  <Plus />
                </Button>
            </TooltipTrigger>
          </CreateCategory>
          <TooltipContent>
            <div className="flex flex-col gap-2">
              <Heading size='sm' className="text-brand-500">
                Adicionar Categoria
              </Heading>
              <p className="text-sm">
                Clique para adicionar uma nova categoria
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-row gap-5 md:flex-row items-stretch">
        {
          isLoading && (
            <>
              <Skeleton className="w-1/6 h-18" />
              <Skeleton className="w-1/6 h-18" />
              <Skeleton className="w-1/6 h-18" />
              <Skeleton className="w-1/6 h-18" />
              <Skeleton className="w-1/6 h-18" />
              <Skeleton className="w-1/6 h-18" />
              <Skeleton className="w-1/6 h-18" />
            </>
          )
        }
        {
          (data?.data?.length > 0) ? (
            data.data.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          ) : (
            !isLoading && (
              <div className="flex flex-col mt-10 items-center justify-center w-full">
                <Heading className="text-brand-500 text-center mb-4" size='2xl'>
                  Nenhuma categoria encontrada
                </Heading>
                <img 
                  src="/images/mascote/NotFound.png"
                  alt="Cofrinho Mascot"
                  className="w-1/4"
                />
              </div>
            )
          )
        }
      </div>
    </div>
  );
}