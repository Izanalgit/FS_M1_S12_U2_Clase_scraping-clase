const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

const url = "https://izanalgit.github.io/project-break-01-dashboard/";

app.get("/",(req,res)=>{
    axios.get(url).then((resp)=>{
        if(resp.status===200){
            const htmlDom = resp.data;
            const $ = cheerio.load(htmlDom);

            const pageTitle = $('title').text();
            
            const links = [];
            const imgs = [];

            $('link').each((ind,elm)=>{
                const link = $(elm).attr('href');
                links.push(link);
            })
            

            $('img').each((ind,elm)=>{
                const img = $(elm).attr('src');
                imgs.push(img);
            })
            //no carga imagenes porque el html no las contiene, sino que se renderizan con los scripts

            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Links</h2>
                <ul>
                    ${links.map((link)=>`<li>${link}</li>`).join('')}
                </ul>
                <h2>Images</h2>
                <ul>
                    ${imgs.map((img)=>`<li>${img}</li>`).join('')}
                </ul> 
                </br>       
            `);
            console.log(htmlDom)
        }
    })
})



app.listen(3000,()=>{
    console.log("Server on http://localhost:3000");
})