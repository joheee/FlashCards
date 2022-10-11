import { useContext, useEffect, useState } from "react"
import { cardContext, cardItemContext } from "../pages"
import { CardTemplate } from "./CardTemplate"

export const Card =()=>{
    const [cardData, setCardData] = useState(null)
    const card = useContext(cardItemContext)
    const refresh = useContext(cardContext)

    useEffect(()=>{
        const getCardData = async ()=>{
            const cardEndpoint = `http://localhost:3000/api/eachCard/${card.cardId}`
            const response = await fetch(cardEndpoint)
            const res = await response.json() 
            setCardData(res.results) 
        }
        getCardData()
    },[card.cardId, refresh.lectureRefresh])

    return  <div className="h-5/6 flex justify-center items-center text-cardColor bg-cardOuterBackgroundColor">
                {
                    cardData === null ? null :
                    <CardTemplate cardData={cardData[0]}/>
                }
            </div>
}