import { NextFunction, Request, Response } from "express";
import { get } from "http";
import getModel from "../../models/user-symbol/factory";
import { DTO } from "../../models/user-symbol/dto";
import getSymbolValueModel from "../../models/Symbol-Value/factory";

// export function dashboard (req:Request,res:Response,next:NextFunction){
//     res.render('users/dashboard');
// }

export async function dashboard(req:Request,res:Response,next:NextFunction){
    try{
        const userSymbols = await getModel().getForUser(1);
        const symbolValues = await Promise.all(userSymbols.map(symbol=>getSymbolValueModel().getLatest(symbol.symbol)));   
        console.log(symbolValues);
             
        res.render('users/dashboard',{
            symbolValues
        });

    }catch(err){next(err)}

}


export async function addSymbol(req:Request,res:Response,next:NextFunction) {
    try{
        const userSymbolModel = getModel();
        const inputUserSymbol:DTO = {
            ...req.body,
            userId:1
        }
        const newUserSymbol = await userSymbolModel.add(inputUserSymbol);
        // console.log(`new user symbol ${inputUserSymbol.userId}`);
        
        res.redirect('/users/dashboard')
    }catch(err){
        next(err);
    }
    
}