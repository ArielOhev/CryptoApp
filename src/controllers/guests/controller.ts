import { NextFunction, Request,Response } from "express";

export function welcome(req:Request,res:Response,next:NextFunction){
    res.render('guests/welcome');
}

export function logout(req:Request,res:Response,next:NextFunction){
    req.logout(()=>{
        res.render('guests/welcome')

    })
}