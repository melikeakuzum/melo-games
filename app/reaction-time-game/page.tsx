"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import Link from 'next/link'

export default function ReactionTime() {
  const [state, setState] = useState('waiting')
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [bestTime, setBestTime] = useState(Infinity)

  useEffect(() => {
    if (state === 'ready') {
      const timeout = setTimeout(() => {
        setState('go')
        setStartTime(Date.now())
      }, Math.random() * 2000 + 1000) // Random delay between 1-3 seconds
      return () => clearTimeout(timeout)
    }
  }, [state])

  const handleClick = () => {
    if (state === 'waiting') {
      setState('ready')
    } else if (state === 'ready') {
      setState('early')
    } else if (state === 'go') {
      setEndTime(Date.now())
      setState('result')
    }
  }

  const reactionTime = endTime - startTime

  const reset = () => {
    if (reactionTime < bestTime && reactionTime > 0) {
      setBestTime(reactionTime)
    }
    setState('waiting')
    setStartTime(0)
    setEndTime(0)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-white">Tepki Süresi Oyunu</h1>
      <div 
        className={`w-64 h-64 rounded-lg flex items-center justify-center text-white text-2xl font-bold cursor-pointer mb-8 ${
          state === 'waiting' ? 'bg-blue-500' :
          state === 'ready' ? 'bg-red-500' :
          state === 'go' ? 'bg-green-500' :
          state === 'early' ? 'bg-yellow-500' :
          'bg-purple-500'
        }`}
        onClick={handleClick}
      >
        {state === 'waiting' && 'Başlamak için tıkla'}
        {state === 'ready' && 'Bekle...'}
        {state === 'go' && 'Şimdi!'}
        {state === 'early' && 'Çok erken!'}
        {state === 'result' && `${reactionTime} ms`}
      </div>
      {state === 'early' || state === 'result' ? (
        <Button onClick={reset} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Tekrar Dene
        </Button>
      ) : null}
      <div className="text-2xl mt-4">
        En İyi Süre: {bestTime === Infinity ? '-' : `${bestTime} ms`}
      </div>
      <Link href="/" className="mt-8">
        <Button className="border border-gray-300 hover:bg-gray-100">Ana Sayfaya Dön</Button>
      </Link>
    </div>
  )
}
