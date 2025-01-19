'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button"
import Link from 'next/link'

type Choice = '✊' | '✋' | '✌️';
const choices: Choice[] = ['✊', '✋', '✌️'];

function getRandomChoice(): Choice {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice: Choice, computerChoice: Choice): string {
  if (playerChoice === computerChoice) return 'Berabere!';
  if (
    (playerChoice === '✊' && computerChoice === '✌️') ||
    (playerChoice === '✋' && computerChoice === '✊') ||
    (playerChoice === '✌️' && computerChoice === '✋')
  ) {
    return 'Kazandınız!';
  }
  return 'Kaybettiniz!';
}

export default function Game() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isSelecting) {
      let count = 0;
      const maxCount = 20; // Toplam animasyon sayısı
      const interval = setInterval(() => {
        setComputerChoice(choices[count % 3]);
        count++;
        
        if (count >= maxCount) {
          clearInterval(interval);
          const finalChoice = getRandomChoice();
          setComputerChoice(finalChoice);
          setIsSelecting(false);
          if (playerChoice) {
            const gameResult = determineWinner(playerChoice, finalChoice);
            setResult(gameResult);
            if (gameResult === 'Kazandınız!') {
              setScore(prev => prev + 1);
            }
          }
        }
      }, 100); // Her 100ms'de bir değişim

      return () => clearInterval(interval);
    }
  }, [isSelecting, playerChoice]);

  const handlePlayerChoice = (choice: Choice) => {
    setPlayerChoice(choice);
    setIsSelecting(true);
    setResult(null);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setIsSelecting(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">Taş Kağıt Makas</h1>
      
      <div className="text-2xl text-white mb-8">Skor: {score}</div>

      {!playerChoice ? (
        <div className="mb-8">
          <p className="text-xl text-white mb-4">Seçiminizi yapın:</p>
          <div className="flex justify-center space-x-4">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handlePlayerChoice(choice)}
                className="text-6xl p-6 rounded-full bg-white hover:bg-gray-200 active:bg-gray-300 transition-colors"
                aria-label={`Seç ${choice === '✊' ? 'Taş' : choice === '✋' ? 'Kağıt' : 'Makas'}`}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center space-x-16 mb-8">
            <div className="text-center">
              <p className="text-xl text-white mb-4">Sizin seçiminiz</p>
              <span className="text-8xl">{playerChoice}</span>
            </div>
            <div className="text-center">
              <p className="text-xl text-white mb-4">Bilgisayarın seçimi</p>
              <span className={`text-8xl ${isSelecting ? 'animate-bounce' : ''}`}>
                {computerChoice}
              </span>
            </div>
          </div>
          
          {result && (
            <div className="text-3xl font-bold text-white mb-8 animate-pulse">
              {result}
            </div>
          )}
          
          <Button 
            onClick={resetGame} 
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Tekrar Oyna
          </Button>
        </>
      )}

      <Link href="/" className="mt-8">
        <Button className="border border-gray-600 hover:bg-gray-700 text-white">
          Ana Sayfaya Dön
        </Button>
      </Link>
    </div>
  );
}