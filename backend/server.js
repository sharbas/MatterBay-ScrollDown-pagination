const express=require('express')
const cors=require('cors')
const axios=require('axios')

const app=express()

const PORT=3001

app.use(cors())

app.get('/api/photo-gallery-feed-page/page/:page',async (req,res)=>{
    // console.log('hai get api ile ndd');
    const {page}=req.params
    console.log(page);
    try{
        // console.log('try lot kadannu');
        const response=await axios.get(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`)
        res.json(response.data)
        console.log('res.data'+response.data,'pagessss'+page);
    }catch(error){
        console.error('Error fetching data:',error)
        res.status(500).json({error:`An error occurred while fetching data`})
    }
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})