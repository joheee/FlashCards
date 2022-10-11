import { useContext } from "react"
import { cardContext } from "../pages"

export const SidebarCard =({lecture})=>{
    const id = useContext(cardContext)

    return  <button className="bg-navbarBackgroundColor p-5 text-base rounded-2xl border-solid border-2 border-cardColor min-w-full" onClick={()=>{id.setLectureId(lecture.lecture_id)}}>
                <div className="">{lecture.lecture_title}</div>                
            </button>
}