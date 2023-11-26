
import { Time } from "./time"

export const RandomDay = (n: number)=>
  {
    const date = new Time().format('YYYY-MM-')
	const uniqueNumbers:number[] = []
	while (uniqueNumbers.length < n) 
	{
    const randomNumber = Math.floor(Math.random() * 29) + 1
    if(!uniqueNumbers.includes(randomNumber))
	{uniqueNumbers.push(randomNumber)}
    }
    uniqueNumbers.sort((a, b)=> b - a )
  return function* (){
	while(n--){
	yield `${date}${String(uniqueNumbers[n]).padStart(2, '0')}`
  }
  }()
}