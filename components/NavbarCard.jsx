import { useContext } from "react"
import { cardItemContext } from "../pages"

export const NavbarCard =({card})=>{
    const cardSet = useContext(cardItemContext)
    return  <button className="bg-sidebarBackgroundColor p-5 text-center font-bold rounded-2xl border-solid border-2 border-cardColor min-w-fit" onClick={()=>{cardSet.setCardId(card.card_id)}}>
                <div className="break-normal">{card.card_title}</div>
            </button>
}