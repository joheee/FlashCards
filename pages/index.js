import { createContext, useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { NagivationBar } from '../components/Navigation'
import { Sidebar } from '../components/Sidebar'

export const cardContext = createContext()
export const cardItemContext = createContext()

export default function Home() {
  const [lectureData, setLectureData] = useState([])
  const [lectureRefresh, setLectureRefresh] = useState(false)
  const [lectureId, setLectureId] = useState(-24)
  const [cardId, setCardId] = useState(0)

  useEffect(()=>{
    const getLectureData = async ()=>{
      const lectureEndpoint = `http://localhost:3000/api/lecture/getData`
      const response = await fetch(lectureEndpoint)
      const res = await response.json()
      setLectureData(res.results)
    }
    getLectureData()
  },[lectureRefresh])

  return (
      <div className="flex text-barColor">
        <cardContext.Provider value={{lectureId,setLectureId,lectureRefresh, setLectureRefresh}}>
          <Sidebar lectureData={lectureData}/>
          <div className="w-5/6">
            <cardItemContext.Provider value={{cardId,setCardId}}>
              <NagivationBar/>
              <Card/>
            </cardItemContext.Provider>
          </div>
        </cardContext.Provider>
      </div>
  )
}
