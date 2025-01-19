"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import Link from 'next/link'

export default function WhackAMole() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [activeMole, setActiveMole] = useState(-1)

  useEffect(() => {
    if (gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setGameOver(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameOver])

  useEffect(() => {
    if (gameOver) return

    const moleTimer = setInterval(() => {
      setActiveMole(Math.floor(Math.random() * 9))
    }, 1000)

    return () => clearInterval(moleTimer)
  }, [gameOver])

  const whackMole = (index: number) => {
    if (index === activeMole) {
      setScore(score + 1)
      setActiveMole(-1)
    }
  }

  const restartGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    setActiveMole(-1)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-white">Köstebek Vurma</h1>
      {!gameOver ? (
        <>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Array(9).fill(null).map((_, index) => (
              <Button
                key={index}
                onClick={() => whackMole(index)}
                className={`w-20 h-20 ${
                  index === activeMole ? 'bg-brown-500' : 'bg-green-500'
                }`}
              >
                {index === activeMole ? '🐹' : ''}
              </Button>
            ))}
          </div>
          <div className="text-2xl mb-4">Skor: {score}</div>
          <div className="text-2xl">Süre: {timeLeft} saniye</div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Oyun Bitti!</h2>
          <p className="text-xl mb-4">Toplam Skorunuz: {score}</p>
          <Button onClick={restartGame} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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