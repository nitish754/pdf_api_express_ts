import { RequestHandler } from "express";
import TaskModel from '../model/Task';
import createHttpError from 'http-errors'
import puppeteer from "puppeteer";
import fs from 'fs';
import PDFDocument from 'pdfkit';


export const getExample: RequestHandler = (req, res, next) => {
    res.json({
        message: "Your Project setup is done"
    });
}

export const getExample2: RequestHandler = (req, res, next) => {
    res.status(200).json({
        message: "Your second route is working"
    })
}

export const addTask: RequestHandler = async (req, res, next) => {
    try {
        let { title, description, due_date }: ITaskData = req.body;
        const createTask = await TaskModel.create({
            title: title,
            description: description,
            due_date: due_date
        })
        res.json({
            message: "Task Added Successfully",
            data: createTask
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }

}

export const convertHtmlToPDF : RequestHandler =async (req,res,next) => {
    const doc = new PDFDocument({ size: 'letter' });
doc.pipe(fs.createWriteStream('design.pdf'));

// Set background color
doc.rect(0, 0, 612, 792).fillColor('#e0e0e0').fill();

// Add text
doc.fontSize(20);
doc.fillColor('black');
doc.text('Design PDF Example', { align: 'center' });

// Add a rectangle
doc.rect(100, 100, 400, 300).stroke();

// Save and end the document
doc.end();

    
}

export const checkHttpCall: RequestHandler = async (req, res, next) => {

    const auth_user = req.user;

    console.log("auth",auth_user);

    // res.json(auth_user?.name);

    // const instance = axios.create({
    //     withCredentials: true
    // });

    // console.log("JWT Token",req.cookies.jwt);
    // const http = await axios.get('http://localhost:3000/api/host-family', {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTml0aXNoIEpoYSIsImVtYWlsIjoiZXJuaXRpc2gxOTkzQGdtYWlsLmNvbSIsIl9pZCI6IjY1MjAzNmFjMjllMTE2MWE0N2JjMGZhZSIsImlhdCI6MTY5ODEzOTEyOCwiZXhwIjoxNjk4MjI1NTI4fQ.D2XgUC72CkamGHm-AFVygVU_oGRt6owQoKoRuE8iLCo',
    //     }
    // });
    // console.log("HTTP RESSPONSE",http.data);
    // res.json(http.data);

    // console.log(http);

}

