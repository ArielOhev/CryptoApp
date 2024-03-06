
import mysql from 'mysql2';
import util from 'util';
import config from 'config';
import mongoose from 'mongoose';
import getModel from './models/user-symbol/factory';
import getSymbolValueModel from './models/Symbol-Value/factory';
import axios from 'axios';
import  cheerio  from 'cheerio';

//mysql init
//connect to mysql
const connection = mysql.createConnection(config.get('mysql'));

const connect = util.promisify(connection.connect).bind(connection);
const query = util.promisify(connection.query).bind(connection);

//mongo init
//connect to mongo
const host = config.get<string>('mongo.host');
const port = config.get<number>('mongo.port');
const database = config.get<string>('mongo.database');

//scrape
async function scrape(symbol:string){
    console.log(`scraping ${symbol}`);

    //fetch data from google
    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`)
    const html  = response.data;
    const $ = cheerio.load(html);
    const value = Number($(`.YMlKec.fxKbKc`).text().replace(',',''));

    const result = await getSymbolValueModel().add({
        symbol,
        value,
        when:new Date()
    })

    
    

    return;
    

}



async function work() {
    try{
        const symbols = await getModel().getUniqueSymbols();
        const result = await Promise.allSettled(symbols.map(scrape))

    }catch(err){
        console.log(err);
        

    }
    finally{
        setTimeout(work,1000*config.get<Number>('mongo.interval'))
    }
}

(async()=>{
    await Promise.all([
        connect(),
    ])
    
    console.log(`connected to mongo: ${database} and to sql database: ${config.get<String>('mysql.database')}`);
    work();
})();
