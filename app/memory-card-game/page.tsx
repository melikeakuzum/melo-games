"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import Link from 'next/link'

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryCard() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setGameOver(false)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      if (cards[newFlippedCards[0]].emoji === cards[newFlippedCards[1]].emoji) {
        setCards(cards.map((card, index) => 
          newFlippedCards.includes(index) ? { ...card, matched: true } : card
        ))
        setFlippedCards([])
      } else {
        setTimeout(() => {
          setCards(cards.map((card, index) => 
            newFlippedCards.includes(index) ? { ...card, flipped: false } : card
          ))
          setFlippedCards([])
        }, 1000)
      }
    }

    if (cards.filter(card => !card.matched).length === 2) {
      setGameOver(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-white">Hafıza Kartları</h1>
      {!gameOver ? (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {cards.map((card) => (
              <Button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`w-20 h-20 text-3xl ${
                  card.flipped || card.matched ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                disabled={card.flipped || card.matched}
              >
                {card.flipped || card.matched ? card.emoji : ''}
              </Button>
            ))}
          </div>
          <div className="text-2xl mb-4">Hamleler: {moves}</div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Tebrikler!</h2>
          <p className="text-xl mb-4">Oyunu {moves} hamlede tamamladınız.</p>
          <Button onClick={initializeGame} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Yeniden Başla
          </Button>
        </div>
      )}
      <Link href="/" className="mt-8">
        <Button className="border border-gray-300 hover:bg-gray-100">Ana Sayfaya Dön</Button>
      </Link>
    </div>
  )
}
