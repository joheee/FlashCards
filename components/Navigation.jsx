import { useContext, useEffect, useState } from "react"
import { cardContext } from "../pages"
import { NavbarCard } from "./NavbarCard"

const CreateCard =({isCreate, setIsCreate, lectureId, cardRefresh, setCardRefresh})=>{
    const [title,setTitle] = useState('')
    const [question,setQuestion] = useState('')
    const [answer,setAnswer] = useState('')

    const handleCreateCard = async ()=>{
        if(title !== '' && question !== '' && answer !== ''){
            const promise = await fetch(`http://localhost:3000/api/card/insertData`,{
                method:'POST',
                body:JSON.stringify({lectureId,title,question,answer}),
                headers:{
                    'Content-type':'application/json'
                }
            })
            const data = await promise.json().then(()=>{
                setCardRefresh(!cardRefresh)
                setIsCreate(!isCreate)
            })
        }
    }

    var input = document.querySelectorAll('input')
    useEffect(()=>{
        if(input !== null) {
            input.forEach(item =>{
                item.addEventListener('input', resizeInput)
                resizeInput.call(item)
            })
        }
        function resizeInput() {
            this.style.width = this.value.length + "ch";
        }
    },[isCreate, input])

    return  <div className="bg-popUpBackgroundColor fixed top-0 left-0 w-screen h-screen z-10 bg-opacity-60 flex justify-center items-center text-2xl font-bold">
                <div className="bg-sidebarBackgroundColor rounded-xl relative p-5 text-cardColor border-solid border-2 border-cardColor">
                    <button className="absolute top-5 right-5 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{setIsCreate(!isCreate)}}>x</button>
                    <button className="absolute bottom-5 left-5 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{handleCreateCard()}}>add</button>
                    <div className="my-16 font-light text-xl grid gap-3">
                        <input type="text" placeholder="card title" className="pl-2 py-1 rounded-lg border-solid border-2 border-cardColor min-w-fit" onChange={(e)=>setTitle(e.target.value)}/>
                        <input type="text" placeholder="card question" className="pl-2 py-1 rounded-lg border-solid border-2 border-cardColor min-w-fit" onChange={(e)=>setQuestion(e.target.value)}/>
                        <input type="text" placeholder="card answer" className="pl-2 py-1 rounded-lg border-solid border-2 border-cardColor min-w-fit" onChange={(e)=>setAnswer(e.target.value)}/>
                    </div>
                </div>
            </div>
}

export const NagivationBar =()=>{
    const [isCreate, setIsCreate] = useState(false)
    const [cardData, setCardData] = useState([]) 
    const [cardRefresh, setCardRefresh] = useState(false)
    const id = useContext(cardContext)

    useEffect(()=>{
        const getCardData = async ()=>{
        const lectureEndpoint = `http://localhost:3000/api/card/${id.lectureId}`
        const response = await fetch(lectureEndpoint)
        const res = await response.json()
        setCardData(res.results)
        }
        getCardData()
    },[cardRefresh, id.lectureId, id.lectureRefresh])

    return  <div className="bg-navbarBackgroundColor flex items-center h-1/6 border-solid border-y-2 border-r-2 border-cardColor overflow-x-auto">
                {
                    isCreate == true ? <CreateCard isCreate={isCreate} setIsCreate={setIsCreate} lectureId={id.lectureId} cardRefresh={cardRefresh} setCardRefresh={setCardRefresh}/> : null
                }
                <div className="flex gap-5 p-5">
                    {
                        cardData === undefined ? null :
                        cardData.map((item,i) => (
                            <NavbarCard card={item} key={i}/>
                        ))
                    }
                    {
                        id.lectureId === -24 ? null : 
                        <button className="bg-sidebarBackgroundColor p-4 max-h-fit text-center font-bold rounded-2xl border-solid border-2 border-cardColor" onClick={()=>{setIsCreate(!isCreate)}}>
                            +
                        </button>
                    }
                </div>

            </div>
}