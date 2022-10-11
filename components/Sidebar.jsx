import { useContext, useState } from "react"
import { cardContext } from "../pages"
import { SidebarCard } from "./SidebarCard"

const CreateLecture =({isCreate, setIsCreate})=>{
    const [title,setTitle] = useState('')
    const refresh = useContext(cardContext)
    const handleAddLecture = async ()=>{
        if(title.length !== 0) {
            const response = await fetch(`http://localhost:3000/api/lecture/insertData`,{
                method:'POST',
                body:JSON.stringify({title}),
                headers:{
                    'Content-type':'application/json'
                }
            })
            const data = await response.json().then(()=>{
                refresh.setLectureRefresh(!refresh.lectureRefresh)
                setIsCreate(!isCreate)
            })
        }
    }

    return  <div className="bg-popUpBackgroundColor fixed top-0 left-0 w-screen h-screen z-10 bg-opacity-60 flex justify-center items-center text-2xl font-bold">
                <div className="bg-sidebarBackgroundColor rounded-xl relative p-5 text-cardColor border-solid border-2 border-cardColor">
                    <button className="absolute top-5 right-5 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{setIsCreate(!isCreate)}}>x</button>
                    <button className="absolute bottom-5 left-5 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{handleAddLecture()}}>add</button>
                    <div className="my-16 font-light text-xl">
                        <input type="text" placeholder="lecture title" className="pl-2 py-1 rounded-lg border-solid border-2 border-cardColor" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                </div>
            </div>
}

export const Sidebar =({lectureData})=>{
    const [isCreate, setIsCreate] = useState(false)
    return  <div className="bg-sidebarBackgroundColor w-1/6 h-screen border-solid border-2 border-cardColor overflow-y-auto">
                {
                    isCreate == true ? <CreateLecture isCreate={isCreate} setIsCreate={setIsCreate}/> : null
                }
                <div className="p-5 flex flex-col text-center gap-5 text-2xl font-bold items-center ">
                    <div className="">JooCards</div>
                    
                    {
                        lectureData.map((item,i) => (
                            <SidebarCard key={i} lecture={item}/>
                        ))
                    }

                    <button className="bg-navbarBackgroundColor p-5 max-w-fit text-base rounded-2xl border-solid border-2 border-cardColor" onClick={()=>{setIsCreate(!isCreate)}}>
                        +
                    </button>
                </div>
            </div>
}