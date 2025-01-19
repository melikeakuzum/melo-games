"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "../../components/ui/button"
import Link from 'next/link'

const colors = ['blue', 'red', 'yellow']

export default function ColorGame() {
  const [currentColor, setCurrentColor] = useState('')
  const [isChanging, setIsChanging] = useState(true)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [lives, setLives] = useState(3)

  const changeColor = useCallback(() => {
    if (isChanging) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setCurrentColor(randomColor)
    }
  }, [isChanging])

  useEffect(() => {
    if (gameOver) return
    if (lives <= 0) {
      setGameOver(true)
      return
    }

    const colorInterval = setInterval(changeColor, 100)
    const gameInterval = setInterval(() => {
      setIsChanging(false)
    }, 3000)

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

    return () => {
      clearInterval(colorInterval)
      clearInterval(gameInterval)
      clearInterval(timer)
    }
  }, [changeColor, gameOver, lives])

  const handleButtonClick = (color: string) => {
    if (!isChanging && color === currentColor) {
      setScore((prevScore) => prevScore + 1)
    } else {
      setLives((prevLives) => prevLives - 1)
    }
    setIsChanging(true)
  }

  const restartGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    setIsChanging(true)
    setLives(3)
  }

  const colorToTailwind = {
    blue: 'bg-blue-500 hover:bg-blue-700',
    red: 'bg-red-500 hover:bg-red-700',
    yellow: 'bg-yellow-500 hover:bg-yellow-700'
  }

  const renderHearts = (lives: number) => {
    return '❤️'.repeat(lives)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-white">Renk Oyunu</h1>
      
      {!gameOver ? (
        <>
          <div 
            className="w-32 h-32 rounded-full mb-8" 
            style={{ backgroundColor: currentColor }}
          ></div>
          <div className="flex space-x-4 mb-8">
            {colors.map((color) => (
              <Button
                key={color}
                className={`${colorToTailwind[color as keyof typeof colorToTailwind]} text-white font-bold py-2 px-4 rounded`}
                onClick={() => handleButtonClick(color)}
                disabled={gameOver}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Button>
            ))}
          </div>
          <div className="text-2xl mb-4 text-white">
            <span className="mr-8">Skor: {score}</span>
            <span className="text-red-500 text-2xl font-bold">
              {renderHearts(lives)}
            </span>
          </div>
          <div className="text-2xl text-white mb-8">Süre: {timeLeft} saniye</div>
        </>
      ) : (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white">Oyun Bitti!</h2>
          <p className="text-xl mb-4 text-white">
            {lives <= 0 ? "Canlarınız bitti!" : "Süre doldu!"}
          </p>
          <p className="text-2xl mb-8 text-white">Toplam Skorunuz: {score}</p>
          <div className="flex space-x-4">
            <Button 
              onClick={restartGame} 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Tekrar Oyna
            </Button>
          </div>
        </div>
      )}

      <Button 
        onClick={() => window.location.href = '/'}
        className="mt-4 border border-gray-600 hover:bg-gray-700 text-white w-64"
      >
        Ana Sayfaya Dön
      </Button>
    </div>
  )
}