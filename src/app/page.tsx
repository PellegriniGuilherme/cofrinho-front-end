"use client"

import { Button, Card, CardContent, Heading, Text } from "@pellegrinidev/piggy-ui"
import Link from "next/link"
import { ArrowRight, BarChart3, PiggyBank, Shield, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import { useAuthStore } from "@/stores/auth"
import LogoCofrinho from "@/components/LogoCofrinho/LogoCofrinho"

export default function Home() {

  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-brand-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
         <LogoCofrinho />
          <div className="flex gap-4">
            {user ? (
              <Link href="/cofrinho">
                <Button variant="outline">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Entrar</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Criar Conta</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading size="4xl" className="mb-2">
              Organize suas finanças de forma
            </Heading>
            <Heading size="4xl" className="text-brand-500 mb-6">
              simples e prática
            </Heading>
            <Text className="text-lg mb-8 text-neutral-600">
              O Cofrinho é um aplicativo de finanças pessoais que ajuda você a controlar seus gastos, economizar
              dinheiro e alcançar seus objetivos financeiros.
            </Text>
            <div className="flex gap-4 mt-4">
              <Link href="/auth/register">
                <Button size="lg" className="gap-2">
                  Começar agora
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline">
                  Já tenho uma conta
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="/images/mascote/Default.png" alt="Cofrinho Mascot" className="w-3/4 max-w-md" />
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 w-full">
          <Heading size="3xl" className="text-center mb-4">
            Recursos do <span className="text-brand-500">Cofrinho</span>
          </Heading>
          <Text as='p' align="center" className="text-neutral-600 mb-12 max-w-2xl mx-auto">
            Descubra como o Cofrinho pode ajudar você a ter mais controle sobre suas finanças pessoais com ferramentas
            simples e eficientes.
          </Text>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            <Card className="border-brand-100">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="text-brand-500" />
                </div>
                <Heading size="lg" className="mb-2">
                  Controle de Gastos
                </Heading>
                <Text className="text-neutral-600">
                  Registre e categorize suas despesas e receitas para saber exatamente para onde seu dinheiro está indo.
                </Text>
              </CardContent>
            </Card>

            <Card className="border-brand-100">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="text-brand-500" />
                </div>
                <Heading size="lg" className="mb-2">
                  Relatórios Detalhados
                </Heading>
                <Text className="text-neutral-600">
                  Visualize gráficos e relatórios que mostram seus padrões de gastos e ajudam a identificar
                  oportunidades de economia.
                </Text>
              </CardContent>
            </Card>

            <Card className="border-brand-100">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                  <PiggyBank className="text-brand-500" />
                </div>
                <Heading size="lg" className="mb-2">
                  Metas de Economia
                </Heading>
                <Text className="text-neutral-600">
                  Defina metas de economia e acompanhe seu progresso para alcançar seus objetivos financeiros.
                </Text>
              </CardContent>
            </Card>

            <Card className="border-brand-100">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="text-brand-500" />
                </div>
                <Heading size="lg" className="mb-2">
                  Segurança Total
                </Heading>
                <Text className="text-neutral-600">
                  Seus dados financeiros são protegidos com as mais avançadas tecnologias de segurança.
                </Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Heading size="3xl" className="mb-4">
                Dashboard <span className="text-brand-500">intuitivo</span>
              </Heading>
              <Text className="text-neutral-600 mb-6">
                Visualize todas as suas informações financeiras em um único lugar. O dashboard do Cofrinho foi projetado
                para ser simples e fácil de usar, mostrando apenas o que você precisa saber.
              </Text>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-brand-500" />
                  </div>
                  <Text>Visão geral do seu saldo atual</Text>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-brand-500" />
                  </div>
                  <Text>Gráficos de despesas por categoria</Text>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-brand-500" />
                  </div>
                  <Text>Histórico de transações recentes</Text>
                </li>
              </ul>
              <Link href="/auth/register">
                <Button>Experimente agora</Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/images/mascote/Register.png"
                alt="Dashboard Preview"
                className="w-2/3 h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-brand-100">
        <div className="container mx-auto px-4 text-center">
          <Heading size="3xl" align="center" className="mb-4">
            Pronto para começar a <span className="text-brand-500">economizar</span>?
          </Heading>
          <Text className="text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão controlando melhor suas finanças com o Cofrinho. É grátis,
            simples e eficiente! 🩷
          </Text>
        </div>
      </section>
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <LogoCofrinho />
            <Text className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Cofrinho. Todos os direitos reservados.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  )
}
