import mysql from 'mysql2/promise'

export default async function handler(req,res) {
    const db = await mysql.createConnection({
        host:'localhost',
        database:'joocards',
        user:'root',
        password:''
    })

    if(req.method === 'PATCH'){
        if(req.body.title !== undefined){
            const query = `UPDATE card SET card_title = '${req.body.title}' WHERE card_id LIKE ${req.body.card_id}`
            const value = []
            const [data] = await db.execute(query,value)
            db.end()
            res.status(200).json({results:data})
        }else if(req.body.question !== undefined){
            const query = `UPDATE card SET card_question = '${req.body.question}' WHERE card_id LIKE ${req.body.card_id}`
            const value = []
            const [data] = await db.execute(query,value)
            db.end()
            res.status(200).json({results:data})
        }else if(req.body.answer !== undefined){
            const query = `UPDATE card SET card_answer = '${req.body.answer}' WHERE card_id LIKE ${req.body.card_id}`
            const value = []
            const [data] = await db.execute(query,value)
            db.end()
            res.status(200).json({results:data})
        }
    } else if(req.method === 'DELETE'){
        const query = `DELETE FROM card WHERE card_id LIKE ${req.body.card_id}`
        const value = []
        const [data] = await db.execute(query,value)
        db.end()
        res.status(200).json({results:data})
    }
}