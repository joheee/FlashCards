import { useContext, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import ReactTextareaAutosize from "react-textarea-autosize";
import { cardContext } from "../pages";

export const CardEdit =({edit,setEdit,cardData})=>{
    const [lectureTitle, setLectureTitle] = useState('')
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const refresh = useContext(cardContext)

    useEffect(()=>{
        const getLectureData = async ()=>{
            const response = await fetch(`http://localhost:3000/api/lecture/${cardData.lecture_id}`,{
                method:'GET',
            })
            const data = await response.json().then(item=>{
                setLectureTitle(item.results[0].lecture_title)
                setTitle(cardData.card_title)
                setQuestion(cardData.card_question)
                setAnswer(cardData.card_answer)
            })
        }
        getLectureData()
    },[])

    const card_id = cardData.card_id
    const handleEditTitle= async()=>{
        if(title !== '') {
            const response = await fetch(`http://localhost:3000/api/card/updateData`,{
                method:'PATCH',
                body:JSON.stringify({title,card_id}),
                headers:{
                    'Content-type':'application/json'
                }
            })
            const data = await response.json().then(()=>{
                refresh.setLectureRefresh(!refresh.lectureRefresh)
            })
        }
    }
    const handleEditQuestion= async()=>{
        if(question !== '') {
            const response = await fetch(`http://localhost:3000/api/card/updateData`,{
                method:'PATCH',
                body:JSON.stringify({question,card_id}),
                headers:{
                    'Content-type':'application/json'
                }
            })
            const data = await response.json().then(()=>{
                refresh.setLectureRefresh(!refresh.lectureRefresh)
            })
        }
    }
    const handleEditAnswer= async()=>{
        if(answer !== '') {
            const response = await fetch(`http://localhost:3000/api/card/updateData`,{
                method:'PATCH',
                body:JSON.stringify({answer,card_id}),
                headers:{
                    'Content-type':'application/json'
                }
            })
            const data = await response.json().then(()=>{
                refresh.setLectureRefresh(!refresh.lectureRefresh)
            })
        }
    }
    const handleDeleteCard= async()=>{
        const response = await fetch(`http://localhost:3000/api/card/updateData`, {
            method:'DELETE',
            body:JSON.stringify({card_id}),
            headers:{
                'Content-type':'application/json'
            }
        })
        const data = await response.json().then(()=>{
            refresh.setLectureRefresh(!refresh.lectureRefresh)
        })
    }
    const lecture_id = cardData.lecture_id
    const handleDeleteLecture= async()=>{
        const response = await fetch(`http://localhost:3000/api/lecture/updateData`, {
            method:'DELETE',
            body:JSON.stringify({lecture_id}),
            headers:{
                'Content-type':'application/json'
            }
        })
        const data = await response.json().then(()=>{
            refresh.setLectureRefresh(!refresh.lectureRefresh)
        })
    }

    const handleUpdateLectureTitle = async ()=>{
        const response = await fetch(`http://localhost:3000/api/lecture/updateData`, {
            method:'PATCH',
            body:JSON.stringify({lecture_id,lectureTitle}),
            headers:{
                'Content-type':'application/json'
            }
        })
        const data = await response.json().then(()=>{
            refresh.setLectureRefresh(!refresh.lectureRefresh)
        })
    }

    return  <div className="bg-popUpBackgroundColor fixed top-0 left-0 w-screen h-screen z-10 bg-opacity-60 flex justify-center items-center text-2xl font-bold overflow-auto">
                <div className="bg-sidebarBackgroundColor rounded-xl relative p-5 text-cardColor border-solid border-2 border-cardColor">
                    <button className="absolute top-5 right-5 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{setEdit(!edit)}}>x</button>
                    <button className="absolute bottom-5 left-5 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{handleDeleteCard()}}>delete card</button>
                    <button className="absolute bottom-5 right-5 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{handleDeleteLecture()}}>delete lecture</button>
                    <div className="my-16 font-light text-xl grid gap-4 w-96">
                        <div className="flex justify-between items-center  gap-3">
                            <ReactTextareaAutosize className="pl-2 py-2 rounded-lg border-solid border-2 border-cardColor w-5/6" value={lectureTitle} onChange={(e)=>setLectureTitle(e.target.value)} />
                            <button className="bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{handleUpdateLectureTitle()}}>edit</button>
                        </div>
                        <div className="flex justify-between items-center  gap-3">
                            <ReactTextareaAutosize className="pl-2 py-2 rounded-lg border-solid border-2 border-cardColor w-5/6" value={title} onChange={(e)=>setTitle(e.target.value)} />
                            <button className="bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{handleEditTitle()}}>edit</button>
                        </div>
                        <div className="flex justify-between items-center  gap-3">
                            <ReactTextareaAutosize className="pl-2 py-2 rounded-lg border-solid border-2 border-cardColor w-5/6" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
                            <button className="bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{handleEditQuestion()}}>edit</button>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <ReactTextareaAutosize className="pl-2 py-2 rounded-lg border-solid border-2 border-cardColor w-5/6" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                            <button className="bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10 select-none" onClick={()=>{handleEditAnswer()}}>edit</button>
                        </div>
                    </div>
                </div>
            </div>
}

export const CardTemplate =({cardData})=>{
    const link = 'https://ichef.bbci.co.uk/news/976/cpsprodpb/15AFA/production/_124762888_6fdadfdd-c4a5-4fec-bb71-1d214f90de8b.jpg'
    const video = 'https://dms.licdn.com/playlist/C5605AQG2S6MK8aVkaA/mp4-720p-30fp-crf28/0/1665043960560?e=1665828000&v=beta&t=qhaIpUpEjNmNbogHq9JuZejHbKeFcqHQ3ygrEa3cu10'
    const [flip, setFlip] = useState(false)
    const [edit,setEdit] = useState(false)
    
    if(cardData === undefined) return <div className=""></div>
    return (
        <>
            {
                edit === true ? <CardEdit edit={edit} setEdit={setEdit} cardData={cardData}/> : null
            }
            <ReactCardFlip isFlipped={flip} flipDirection="vertical">

                <div className="w-96 relative">
                    <button className="absolute top-2 right-2 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10" onClick={()=>{setEdit(!edit)}}>edit</button>
                    <div className="h-full rounded-2xl">
                        <div className="h-full grid justify-center rounded-xl">

                            <div className="p-4 flex flex-col justify-center items-center gap-2 w-96 bg-cardBackgroundColor border-solid border-2 border-cardColor rounded-xl" onClick={()=>setFlip(!flip)}>
                                <div className="text-center text-base font-bold mt-10">{cardData.card_question}</div>
                                    {
                                        cardData.card_photo === null ? null :
                                        <a href={link} target='_blank'>
                                            <div className="w-full overflow-hidden select-none rounded-2xl">
                                                <img className="" src={link} alt="this is card image"/>
                                            </div>
                                        </a>
                                    }
                                    {
                                        cardData.card_video === null ? null :
                                        <div className="w-full overflow-hidden select-none rounded-2xl">
                                            <video src={video} controls></video>
                                        </div>
                                    }

                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-96 relative">
                    <button className="absolute top-2 right-2 bg-barColor px-4 py-2 font-bold rounded-lg border-solid border-2 border-cardColor z-10" onClick={()=>{setEdit(!edit)}}>edit</button>
                    <div className="h-full rounded-2xl">
                        <div className="h-full grid justify-center rounded-xl">

                            <div className="p-4 flex flex-col justify-center items-center gap-2 w-96 bg-cardBackgroundColor border-solid border-2 border-cardColor rounded-xl" onClick={()=>setFlip(!flip)}>
                                <div className="text-center text-base font-bold mt-10">{cardData.card_answer}</div>
                                

                            </div>
                        </div>
                    </div>
                </div>

            </ReactCardFlip>
        </>
    );
}