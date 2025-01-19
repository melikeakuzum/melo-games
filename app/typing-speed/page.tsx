"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "../../components/ui/button"
import Link from 'next/link'

const sentences = [
  'Kedim sabah kahvesine pati attı ve tüm masayı batırdı', 
  'Bahçedeki çiçekler bir gecede parti yapmış gibi görünüyordu', 
  'Komşunun tavuğu yine benim balkonuma kondu', 
  'Kahvemi içerken uzaya gitme planları yapıyordum',
  'Telefonumun şarjı her zamanki gibi en kritik anda bitti', 
  'Köpeğim, postacıyı görür görmez sevinçten zıplamaya başladı', 
  'Bugün parkta yürüken bir sincap bana selam verdi', 
  'Dolabın üstünde unuttuğum çikolata, bir hafta boyunca beni beklemiş', 
  'Sabah yürüyüşümde ayakkabılarım çamur savaşına katıldı', 
  'Yeni aldığım bitki bana bir hafta bile dayanmadı', 
  'Komşumun kedisi benim pencereden bana bakarak uyuyakaldı', 
  'Pizza siparişim tam da açlıktan bayılmak üzereyken geldi', 
  'Saatimi kurmayı unuttum ve en sevdiğim dizinin başını kaçırdım', 
  'Bisikletimle giderken bir serçeyle yarıştım ve kaybettim', 
  'Sokakta yürürken rüzgar şemsiyemi ters çevirdi', 
  'Bir haftadır beklediğim kargo, ben evde yokken geldi', 
  'Balık tutmaya gittik ama sadece yosun yakaladık', 
  'Sabah kahvaltısında yumurta kırarken kabuklar içine kaçtı', 
  'Metroda yanlış durağa inip şehrin diğer ucuna gittim', 
  'Tatilde çektiğim tüm fotoğraflar bulanık çıkmış', 
  'Yeni tarif denedim ve mutfak adeta savaş alanına döndü', 
  'Köpeğim bu sabah ilk kez kendi tasmasını getirdi', 
  'Kitapçıda aradığım kitabı buldum ama yanımda cüzdan yoktu', 
  'Odamda bir örümcek buldum ve panikleyerek başka odaya taşındım', 
  'Marketten aldığım poşet yolda yırtıldı ve her şey yere saçıldı', 
  'İnternetten sipariş ettiğim ürün pembe yerine mor geldi', 
  'Sabah alarmımı duymadım ve işe geç kaldım', 
  'Yolda yürürken ayakkabımın bağcığı çözüldü ve düştüm', 
  'Yeni aldığım kahve makinesi ilk denemede bozuldu', 
  'Eve geldim ve anahtarlarımı içeride unuttuğumu fark ettim', 
  'Sabah kahvaltısında çayın yerine yanlışlıkla kahve koydum', 
  'Sokakta yürürken bir kuş başıma isabet etti', 
  'Yağmurda şemsiyesiz kaldım ve tamamen ıslandım', 
  'Arkadaşlarımla buluşacağım saati yanlış hatırlamışım', 
  'Marketten dönerken arabamın lastiği patladı', 
  'Yeni ayakkabılarım ilk adımda çamura battı', 
  'Sınav için çalışırken tüm notlarımı masada devirdim', 
  'Evde elektrik kesildi ve mum bulamayınca telefon ışığını kullandım', 
  'Buzdolabını açtım ve içinden sadece yarım limon buldum'
]

export default function TypingSpeed() {
  const [currentSentence, setCurrentSentence] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [wpm, setWpm] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    newGame()
  }, [])

  const newGame = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
    setCurrentSentence(randomSentence)
    setUserInput('')
    setStartTime(0)
    setEndTime(0)
    setGameOver(false)
    setWpm(0)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setUserInput(inputValue)

    if (startTime === 0) {
      setStartTime(Date.now())
    }

    if (inputValue === currentSentence) {
      setEndTime(Date.now())
      setGameOver(true)
      const timeInMinutes = (Date.now() - startTime) / 60000
      const wordsTyped = currentSentence.split(' ').length
      setWpm(Math.round(wordsTyped / timeInMinutes))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-8">Yazma Hızı Testi</h1>
      {!gameOver ? (
        <>
          <p className="text-xl mb-4">{currentSentence}</p>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full max-w-md p-2 border-2 border-gray-300 rounded"
            placeholder="Yazmaya başlayın..."
          />
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Test Tamamlandı!</h2>
          <p className="text-xl mb-4">Yazma Hızınız: {wpm} WPM</p>
          <Button onClick={newGame} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Yeniden Başla
          </Button>
        </div>
      )}
      <Link href="/" className="mt-8">
        <Button className="border border-gray-300 hover:bg-gray-100"> Ana Sayfaya Dön</Button>
      </Link>
    </div>
  )
}

