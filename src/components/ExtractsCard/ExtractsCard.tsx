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
} from "@pellegrinidev/piggy-ui";
import { LoaderIcon, Plus } from "lucide-react";
import CreateTransaction from "../CreateTransaction/CreateTransaction";
import { useTransactions } from "@/hooks/useTransaction";
import ExtractCard from "../ExtractCard/ExtractCard";
import { Transaction } from "@/api/services/transactionService";
import { useEffect, useRef, useState } from "react";

export default function ExtractsCard() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTransactions();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const all = data?.pages.flatMap((page) => page.data?.data ?? []);
    setTransactions(all ?? []);
  }, [data]);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef.current, hasNextPage, fetchNextPage]);

  const showSkeleton = isLoading;
  const hasTransactions = !isLoading && transactions.length > 0;

  return (
    <Card className="border border-brand-100 flex h-full flex-col">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Extrato</CardTitle>
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
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        {showSkeleton && (
          <div className="flex items-center justify-center h-full">
            <LoaderIcon className="animate-spin text-brand-500" />
          </div>
        )}

        {hasTransactions &&
          transactions.map((item, index) => {
            const isLast = index === transactions.length - 1;

            return (
              <div
                key={item.id}
                ref={isLast ? observerRef : undefined}
              >
                <ExtractCard
                  transaction={item}
                  showLine={index !== transactions.length - 1}
                />
              </div>
            );
          })}

        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-4">
            <LoaderIcon className="animate-spin text-brand-500" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
