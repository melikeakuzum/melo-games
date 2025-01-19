"use client"

import React, { useMemo } from 'react'
import { Button } from "../components/ui/button"
import Link from 'next/link'
import { Card } from "../components/ui/card"
import dynamic from 'next/dynamic'

interface Game {
  title: string
  description: string
  path: string
  icon: string
}

// Oyun kartı komponenti
const GameCard = React.memo(function GameCard({ game }: { game: Game }) {
  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white/50 backdrop-blur-sm border-2 border-white/20">
      <div className="p-6 flex flex-col h-full">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {game.icon}
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {game.title}
        </h2>
        <p className="text-gray-600 flex-grow">
          {game.description}
        </p>
        <Button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none">
          Oyna
        </Button>
      </div>
    </Card>
  )
})

export default function Home() {
  // Games array'ini memoize edelim
  const games = useMemo(() => [
    {
      title: "XOX Oyunu",
      description: "Klasik XOX oyunu. Arkadaşınızla karşılıklı oynayın!",
      path: "/tic-tac-toe",
      icon: "⭕"
    },
    {
      title: "Hafıza Kartları",
      description: "Eşleşen kartları bul ve hafızanı test et!",
      path: "/memory-card-game",
      icon: "🎴"
    },
    {
      title: "Renk Oyunu",
      description: "Doğru rengi seç ve reflekslerini test et!",
      path: "/color-game",
      icon: "🎨"
    },
    {
      title: "Şehir Bulmaca",
      description: "Karışık harflerden ülke ve başkent isimlerini bul!",
      path: "/word-scramble",
      icon: "🌍"
    },
    {
      title: "Reaksiyon Testi",
      description: "Ne kadar hızlı tepki verebilirsin?",
      path: "/reaction-time-game",
      icon: "⚡"
    },
    {
      title: "Matematik Oyunu",
      description: "Hızlı matematik çözme yeteneklerini test et!",
      path: "/math-game",
      icon: "🔢"
    },
    {
      title: "Köstebek Yakala",
      description: "Köstebekleri yakala ve yüksek skor yap!",
      path: "/whack-a-mole",
      icon: "🦫"
    },
    {
      title: "Taş Kağıt Makas",
      description: "Bilgisayara karşı taş-kağıt-makas oyna!",
      path: "/rock-paper-scissor",
      icon: "✌️"
    },
    {
      title: "Yazma Hızı Testi",
      description: "Dakikada kaç kelime yazabildiğini test et!",
      path: "/typing-speed",
      icon: "⌨️"
    }
  ], [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            MeloGames
          </h1>
          <p className="text-xl text-gray-600">
            Eğlenceli mini oyunlarla yeteneklerini test et!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link href={game.path} key={game.path} prefetch={false}>
              <GameCard game={game} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

