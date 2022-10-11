import mysql from 'mysql2/promise'

export default async function handler (req,res) {
    const db = await mysql.createConnection({
        host:'localhost',
        database:'joocards',
        user:'root',
        password:''
    })
    if(req.method === 'DELETE'){
        const query = `DELETE FROM lecture WHERE lecture_id LIKE ${req.body.lecture_id}`
        const value = []
        const [data] = await db.execute(query,value)
        db.end()
        res.status(200).json({results:data})
    } else if(req.method === 'PATCH'){
        const query = `UPDATE lecture SET lecture_title = '${req.body.lectureTitle}' WHERE lecture_id LIKE ${req.body.lecture_id}`
        const value = []
        const [data] = await db.execute(query,value)
        db.end()
        res.status(200).json({results:data})
    }
}