import mysql from 'mysql2/promise'

export default async function handler(req,res) {
    const {card_id} = req.query

    const db = await mysql.createConnection({
        host:'localhost',
        database:'joocards',
        user:'root',
        password:''
    })

    try {
        const query = `select * from card where card_id like ${card_id}`
        const value = []
        const [data] = await db.execute(query,value)
        db.end()
        res.status(200).json({results:data})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}