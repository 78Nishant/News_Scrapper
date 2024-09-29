
const cors=require('cors')
const axios=require('axios')
const cheerio=require('cheerio')

const express=require('express')

const app=express()
app.use(cors())

//array to  store data

const cricketNews=[]
const topNews=[]
const trendingNews=[]
const entertainment=[]

//website url to scrap
const url='https://www.hindustantimes.com/';


axios(url)
.then(response=>{
    const html=response.data;
    const $=cheerio.load(html)
   
    $('[data-vars-cardtype="top-news"]').each(async function(){
        const newsTitle=$(this).find('.hdg3').text()
        const newsUrl=`https://www.hindustantimes.com/${$(this).find('a').attr('href')}`
        var imageUrl,newsDescription;
        await axios(newsUrl)
        .then(response=>{
            const html=response.data;
        const $=cheerio.load(html)
         imageUrl=$('.detail').find('picture').find('img').attr('src')
         newsDescription=$('.detail').find('p').text()
        })
        topNews.push({newsTitle,imageUrl,newsDescription,newsUrl})
       
    })
    $('[data-vars-cardtype="cricket"]').each(async function(){
        const newsTitle=$(this).find('.hdg3').text()
        const newsUrl=`https://www.hindustantimes.com/${$(this).find('a').attr('href')}`
        var imageUrl,newsDescription;
        await axios(newsUrl)
        .then(response=>{
            const html=response.data;
        const $=cheerio.load(html)
         imageUrl=$('.detail').find('picture').find('img').attr('src')
         newsDescription=$('.detail').find('p').text()
        })
        cricketNews.push({newsTitle,imageUrl,newsDescription,newsUrl})
        
    })
   
    
   
    $('[data-vars-cardtype="trending"]').each(async function(){
        const newsTitle=$(this).find('.hdg3').text()
        const newsUrl=`https://www.hindustantimes.com/${$(this).find('a').attr('href')}`
        var imageUrl,newsDescription;
        await axios(newsUrl)
        .then(response=>{
            const html=response.data;
        const $=cheerio.load(html)
         imageUrl=$('.detail').find('picture').find('img').attr('src')
         newsDescription=$('.detail').find('p').text()
        })
        trendingNews.push({newsTitle,imageUrl,newsDescription,newsUrl})
      
    })
    
    $('[data-vars-cardtype="entertainment"]').each(async function(){
        const newsTitle=$(this).find('.hdg3').text()
        const newsUrl=`https://www.hindustantimes.com/${$(this).find('a').attr('href')}`
        var imageUrl,newsDescription;
        await axios(newsUrl)
        .then(response=>{
            const html=response.data;
        const $=cheerio.load(html)
         imageUrl=$('.detail').find('picture').find('img').attr('src')
         newsDescription=$('.detail').find('p').text()
        })
        entertainment.push({newsTitle,imageUrl,newsDescription,newsUrl})
      
    })
   
    //Methods and Routes
    app.get('/cricket',(req,res)=>{
        res.json(cricketNews)
    })
    app.get('/top_news',(req,res)=>{
        res.json(topNews)
    })
    app.get('/trending',(req,res)=>{
        res.json(trendingNews)
    })
    app.get('/entertainment',(req,res)=>{
        res.json(entertainment)
    })
    // console.log(data)
})
 
 app.get('/',(req,res)=>{
    res.json("Welcome to news scrapper! Note: All data fetched here is from Hindustan times and is for Demo & learning purpose")
})
app.listen(5000,()=>{
    console.log("Server Running on port 5000")
})