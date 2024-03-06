import { NextFunction, Request, Response } from "express";
import { get } from "http";
import getModel from "../../models/user-symbol/factory";
import { DTO } from "../../models/user-symbol/dto";

export function dashboard (req:Request,res:Response,next:NextFunction){
    res.render('users/dashboard');
}

export async function addSymbol(req:Request,res:Response,next:NextFunction) {
    try{
        const userSymbolModel = getModel();
        const inputUserSymbol:DTO = {
            ...req.body,
            userId:1
        }
        const newUserSymbol = await userSymbolModel.add(req.body);
    }catch(err){
        next(err);
    }
    
}