import { NextFunction, Request, Response } from "express";
import {ObjectSchema} from 'joi'; 
import createHttpError, {InternalServerError, BadRequest} from "http-errors";

export default function validate(validator:ObjectSchema){
    return async function (req:Request,res:Response,next:NextFunction){
        try{
            req.body =await validator.validateAsync(req.body);
            return next();
        }catch(err){
            if(err.isJoi){
                return next(createHttpError(BadRequest(err.message)))
            }
            return next(createHttpError(InternalServerError(err)))
        }
    }
}


