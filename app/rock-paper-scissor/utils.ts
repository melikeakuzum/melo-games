export type Choice = '✊' | '✋' | '✌️'

export const choices: Choice[] = ['✊', '✋', '✌️']

export const getRandomChoice = (): Choice => {
  return choices[Math.floor(Math.random() * choices.length)]
} 