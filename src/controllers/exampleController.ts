import { RequestHandler } from "express";
import TaskModel from '../model/Task';
import createHttpError from 'http-errors'
import axios from "axios";

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

export const checkHttpCall: RequestHandler = async (req, res, next) => {

    // const instance = axios.create({
    //     withCredentials: true
    // });

    console.log("JWT Token",req.cookies.jwt);
    const http = await axios.get('http://localhost:3000/api/host-family', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTml0aXNoIEpoYSIsImVtYWlsIjoiZXJuaXRpc2gxOTkzQGdtYWlsLmNvbSIsIl9pZCI6IjY1MjAzNmFjMjllMTE2MWE0N2JjMGZhZSIsImlhdCI6MTY5ODEzOTEyOCwiZXhwIjoxNjk4MjI1NTI4fQ.D2XgUC72CkamGHm-AFVygVU_oGRt6owQoKoRuE8iLCo',
        }
    });
    console.log("HTTP RESSPONSE",http.data);
    res.json(http.data);

    // console.log(http);

}

