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
import { useCallback, useEffect, useRef, useState } from "react";
import NotFoundItems from "../NotFoundItems/NotFoundItems";

interface ExtractsCardProps {
  onSelect?: (transaction: Transaction) => void;
  selected?: Transaction | null;
  showHeader?: boolean;
}

export default function ExtractsCard({ onSelect, selected, showHeader = true }: ExtractsCardProps) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTransactions();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const all = data?.pages.flatMap((page) => page.data?.data ?? []);
    setTransactions(all ?? []);
  }, [data]);

  useEffect(() => {
    if (!selected || !transactions.length) return;

    const found = transactions.find((t) => t.id === selected.id);

    if (!found) return;

    onSelect?.(found);
  }, [transactions]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !hasNextPage || isFetchingNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollHeight - scrollTop <= clientHeight + 150) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const showSkeleton = isLoading;
  const hasTransactions = !isLoading && transactions.length > 0;

  return (
    <Card className="border border-brand-100 flex h-full flex-col">
      {
        showHeader && (
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
        )
      }
      <CardContent className="flex-1 overflow-y-auto" ref={containerRef}>
        {showSkeleton && (
          <div className="flex items-center justify-center h-full">
            <LoaderIcon className="animate-spin text-brand-500" />
          </div>
        )}

        {hasTransactions &&
          transactions.map((item, index) => (
            <ExtractCard
              key={item.id}
              transaction={item}
              showLine={index !== transactions.length - 1}
              onSelect={onSelect}
              isSelect={item.id == selected?.id}
            />
          ))}

        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-4">
            <LoaderIcon className="animate-spin text-brand-500" />
          </div>
        )}

        {!showSkeleton && !hasTransactions && (
          <NotFoundItems />
        )}
      </CardContent>
    </Card>
  );
}
