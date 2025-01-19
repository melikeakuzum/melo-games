"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "../../components/ui/button"
import Link from 'next/link'

type Player = 'X' | 'O' | null
type WinningLine = [number, number, number] | null

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState<boolean>(true)
  const [timer, setTimer] = useState<number>(60)
  const [winningLine, setWinningLine] = useState<WinningLine>(null)
  const [gameOver, setGameOver] = useState<boolean>(false)

  const calculateWinner = useCallback((squares: Player[]): [Player, WinningLine] => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ] as const
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], [...lines[i]] as WinningLine]
      }
    }
    return [null, null]
  }, [])

  const [winner, winLine] = calculateWinner(board)
  const isBoardFull = board.every(square => square !== null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (!gameOver && !winner && !isBoardFull && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setGameOver(true)
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameOver, winner, isBoardFull, timer])

  useEffect(() => {
    if (winner || isBoardFull) {
      setGameOver(true)
    }
  }, [winner, isBoardFull])

  useEffect(() => {
    if (winLine) {
      setWinningLine(winLine)
    }
  }, [winLine])

  const handleClick = useCallback((index: number) => {
    if (board[index] || gameOver) return
    const newBoard = board.slice()
    newBoard[index] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)
    setTimer(60)
  }, [board, xIsNext, gameOver])

  const renderSquare = useCallback((index: number) => (
    <Button
      className={`w-20 h-20 text-4xl font-bold ${
        winningLine && winningLine.includes(index)
          ? 'bg-green-700 text-white'
          : board[index] === 'X'
          ? 'bg-slate-900 text-white'
          : board[index] === 'O'
          ? 'bg-yellow-400 text-white'
          : 'bg-white'
      }`}
      onClick={() => handleClick(index)}
      disabled={gameOver || board[index] !== null}
    >
      {board[index]}
    </Button>
  ), [board, winningLine, handleClick, gameOver])

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
    setTimer(60)
    setWinningLine(null)
    setGameOver(false)
  }, [])

  let status
  if (winner) {
    status = `Kazanan: ${winner}`
  } else if (isBoardFull) {
    status = 'Oyun berabere!'
  } else if (timer === 0) {
    status = `Süre bitti! Kazanan: ${xIsNext ? 'O' : 'X'}`
  } else {
    status = `Sıradaki oyuncu: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-white">XOX Oyunu</h1>
      <div className="mb-4 text-xl font-semibold text-white">{status}</div>
      <div className="mb-4 text-lg text-white">Kalan süre: {timer} saniye</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
          <div key={index}>{renderSquare(index)}</div>
        ))}
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Button 
          onClick={resetGame} 
          className="bg-green-500 hover:bg-green-700 text-white"
        >
          Oyunu Yeniden Başlat
        </Button>
        
        {gameOver && (
          <div className="mt-4 text-6xl font-bold text-green-600 animate-pulse">
            {winner ? `${winner} Kazandı!` : timer === 0 ? `${xIsNext ? 'O' : 'X'} Kazandı!` : 'Berabere!'}
          </div>
        )}
        
        <Button 
          onClick={() => window.location.href = '/'}
          className="mt-4 border border-gray-600 hover:bg-gray-700 text-white w-full"
        >
          Ana Sayfaya Dön
        </Button>
      </div>
    </div>
  )
} 