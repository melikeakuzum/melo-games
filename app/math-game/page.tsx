"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import Link from 'next/link'

export default function MathGame() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operator, setOperator] = useState('+')
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)

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
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1
    const newNum2 = Math.floor(Math.random() * 10) + 1
    const operators = ['+', '-', '*']
    const newOperator = operators[Math.floor(Math.random() * operators.length)]
    setNum1(newNum1)
    setNum2(newNum2)
    setOperator(newOperator)
    setAnswer('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let correctAnswer
    switch (operator) {
      case '+':
        correctAnswer = num1 + num2
        break
      case '-':
        correctAnswer = num1 - num2
        break
      case '*':
        correctAnswer = num1 * num2
        break
      default:
        correctAnswer = 0
    }
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1)
    }
    generateQuestion()
  }

  const restartGame = () => {
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    generateQuestion()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-white">Matematik Oyunu</h1>
      {!gameOver ? (
        <>
          <div className="text-3xl mb-4">
            {num1} {operator} {num2} = ?
          </div>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded mr-2"
            />
            <Button type="submit">Gönder</Button>
          </form>
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