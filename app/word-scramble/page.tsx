"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import Link from 'next/link'

const words = [
  'Afganistan', 'Kabil', 'Arnavutluk', 'Cezayir','Angola', 'Arjantin', 'Ermenistan', 'Avustralya', 'Avusturya', 'Viyana', 'Azerbaycan', 
  'Bakü', 'Bahamalar','Bahreyn', 'Bangladeş','Barbados','Belarus','Belçika', 'Brüksel',  'Saraybosna','Brezilya', 'Bulgaristan', 
  'Sofya', 'Kamboçya', 'Kanada', 'Şili', 'Çin', 'Pekin', 'Kolombiya', 'Hırvatistan', 'Küba', 'Kıbrıs', 'Lefkoşa', 'Çekya', 
  'Prag', 'Danimarka', 'Kopenhag', 'Mısır', 'Kahire', 'Estonya','Etiyopya', 'Fiji', 'Finlandiya', 'Helsinki', 'Fransa', 'Paris', 
  'Gürcistan', 'Tiflis', 'Almanya', 'Berlin', 'Gana', 'Yunanistan', 'Atina', 'Guatemala', 'Gine', 'Haiti', 'Honduras', 'Macaristan', 
  'Budapeşte', 'İzlanda',  'Hindistan', 'Yeni Delhi', 'Endonezya',  'İran', 'Tahran', 'Irak', 'Bağdat', 'İrlanda', 
  'Dublin', 'İsrail', 'Kudüs', 'İtalya', 'Roma', 'Jamaika', 'Japonya', 'Tokyo', 'Ürdün', 'Kazakistan', 'Kenya', 'Nairobi', 'Kuveyt', 
  'Kırgızistan', 'Letonya', 'Lübnan', 'Beyrut', 'Libya', 'Trablus', 'Litvanya','Lüksemburg', 'Lüksemburg', 'Madagaskar', 'Malezya', 'Maldivler',
  'Malta', 'Moritanya', 'Meksika','Mikronezya','Moldova',  'Monako','Moğolistan','Karadağ','Fas','Mozambik', 'Namibya',  'Nepal', 
  'Katmandu', 'Hollanda',  'Amsterdam', 'Yeni Zelanda','Nijerya', 'Norveç', 'Oslo', 'Pakistan', 'Paraguay',  'Peru', 'Filipinler', 
  'Polonya', 'Varşova', 'Portekiz', 'Lizbon', 'Katar',  'Romanya', 'Bükreş', 'Rusya', 'Moskova', 'Riyad', 'Senegal', 'Dakar', 
  'Sırbistan', 'Belgrad', 'Seyşeller', 'Victoria', 'Sierra Leone', 'Freetown',
  'Singapur', 'Singapur', 'Slovakya','Türkiye'
]

function scrambleWord(word: string): string {
  return word.split('').sort(() => Math.random() - 0.5).join('')
}

export default function WordScramble() {
  const [currentWord, setCurrentWord] = useState('')
  const [scrambledWord, setScrambledWord] = useState('')
  const [revealedWord, setRevealedWord] = useState('')
  const [userGuess, setUserGuess] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [hintCount, setHintCount] = useState(3)
  const [showAnswer, setShowAnswer] = useState(false)

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
    newWord()
  }, [])

  const newWord = () => {
    const word = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(word)
    setScrambledWord(scrambleWord(word))
    setRevealedWord('_'.repeat(word.length))
    setUserGuess('')
    setHintCount(3)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 1)
      newWord()
    }
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
    setTimeout(() => {
      setShowAnswer(false)
      newWord()
    }, 3000)
  }

  const restartGame = () => {
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    newWord()
  }

  const getHint = () => {
    if (hintCount > 0) {
      let newRevealedWord = revealedWord.split('')
      for (let i = 0; i < currentWord.length; i++) {
        if (newRevealedWord[i] === '_') {
          newRevealedWord[i] = currentWord[i]
          break
        }
      }
      setRevealedWord(newRevealedWord.join(''))
      setHintCount(hintCount - 1)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-white">Şehir Bulmaca</h1>
      {!gameOver ? (
        <>
          <div className="text-3xl mb-4 text-white">{scrambledWord}</div>
          {showAnswer && (
            <div className="text-2xl mb-4 text-green-600 font-bold">
              Doğru Cevap: {currentWord}
            </div>
          )}
          <div className="text-2xl mb-4 text-white">{revealedWord}</div>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded mr-2 bg-gray-700 text-white"
              placeholder="Cevabınızı yazın..."
              aria-label="Tahmin giriş alanı"
            />
            <Button type="submit">Tahmin Et</Button>
          </form>
          <div className="flex space-x-4 mb-4">
            <Button onClick={getHint} disabled={hintCount === 0}>
              İpucu Al ({hintCount})
            </Button>
            <Button onClick={handleShowAnswer} disabled={showAnswer}>
              Göster
            </Button>
          </div>
          <div className="text-2xl mb-4 text-white">Skor: {score}</div>
          <div className="text-2xl text-white">Süre: {timeLeft} saniye</div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Oyun Bitti!</h2>
          <p className="text-xl mb-4 text-white">Toplam Skorunuz: {score}</p>
          <Button onClick={restartGame} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Yeniden Başla
          </Button>
        </div>
      )}
      <Link href="/" className="mt-8">
        <Button className="border border-gray-600 hover:bg-gray-700 text-white">
          Ana Sayfaya Dön
        </Button>
      </Link>
    </div>
  )
}