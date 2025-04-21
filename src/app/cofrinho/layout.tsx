'use client'
import useLogoutDispatch from "@/utils/logoutDispatch";
import { useSession } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/auth";
import { routes } from "@/utils/routes";
import { 
  Button,
    Card, 
    CardContent, 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger, 
    Heading, 
    Separator, 
    Sidebar, 
    SidebarContent, 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarHeader, 
    SidebarInset, 
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem, 
    SidebarProvider, 
    SidebarRail, 
    SidebarTrigger,
    Text
} from "@pellegrinidev/piggy-ui";
import { LoaderIcon, PiggyBank, ReceiptText, Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import Link from "next/link";

const CofrinhoLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname()

  const { data, error } = useSession();
  const logout = useLogoutDispatch();

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (error) {
      clearUser();
      window.location.reload();
    }
  }, [error, clearUser]);

  const initials = useMemo(() => {
    if (!user) return '';
    const names = user.name.split(' ');
    return names.map((name) => name[0]).slice(0, 2).join('');
  }, [user]);

  const navigation = useMemo(() => [
    {
      name: 'Dashboard',
      icon: PiggyBank,
      href: routes.cofrinho.home, 
    },
    {
      name: 'Categorias',
      icon: Tag,
      href: routes.cofrinho.category.list,
    },
    {
      name: 'Extrato',
      icon: ReceiptText,
      href: routes.cofrinho.extract,
    }
  ], []);

  return (
    <Suspense
      fallback={
        <div className='bg-brand-50 h-screen w-screen flex items-center justify-center'>
          <LoaderIcon className='animate-spin text-brand-500' />
        </div>
      }
    >
      <SidebarProvider defaultOpen={true}>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-transparent cursor-default"
                  size='lg'
                >
                  <Link href='/' className="flex items-center gap-2 select-none cursor-pointer">
                    <div className="flex aspect-square size-8 items-center justify-center">
                      <img 
                        src='/images/mascote/Logo.png' 
                        alt="Cofrinho Mascot" 
                      />
                    </div>
                    <Heading size='lg' className="text-brand-400">
                      Cofrinho
                    </Heading>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {
                    navigation.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.href === pathname}
                          size='lg'
                        >
                          <a href={item.href} className="flex items-center gap-2">
                            <div className="flex aspect-square size-8 items-center justify-center">
                              <item.icon />
                            </div>
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  }
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-neutral-300 px-4">
          <SidebarTrigger className="-ml-1 w-9 h-9"/>
          <Separator orientation="vertical" className="h-8" />
          <h1 className="text-lg font-semibold">
            {navigation.find((item) => item.href === pathname)?.name ?? 'Cofrinho'}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' className="ml-auto rounded-full">	
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <span className="font-bold">{initials}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" alignOffset={-90}>
              <DropdownMenuItem onClick={logout}>
                <Text size="sm" weight="bold">
                  Logout
                </Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="p-4 bg-brand-50 md:h-[calc(100vh-64px)] flex">
          <Card className="bg-white w-full h-full">
            <CardContent className="h-full">
              {children}
            </CardContent>
          </Card>
        </div>
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  )
}

export default CofrinhoLayout;