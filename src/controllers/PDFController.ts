import * as fs from 'fs';
import  hbs from 'hbs';
import * as htmlPDF from 'puppeteer-html-pdf';
import { promisify } from 'util';
import { Request, RequestHandler, Response } from 'express';
import HostFamily from '../model/HostFamily';
import GroupStudent from '../model/GroupStudent';
import { BSON, ObjectId } from 'bson';
import mongoose from 'mongoose';
import StudyGroup from '../model/StudyGroup';

export const viewHTML:RequestHandler = (req,res,next) => {
    res.render('invoice');
}

export const print = async (req: Request, res: Response): Promise<void> => {
    const pdfData = {
        image : "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?w=740&t=st=1699605878~exp=1699606478~hmac=b651bf982f0d19af27c6eb76fec0ee8ae8b93865f3b3ddad0bed8c735a389aca",
        invoiceItems: [
            { item: 'Website Design', amount: 5000 },
            { item: 'Hosting (3 months)', amount: 2000 },
            { item: 'Domain (1 year)', amount: 1000 },
        ],
        invoiceData: {
            invoice_id: 123,
            transaction_id: 1234567,
            payment_method: 'Paypal',
            creation_date: '04-05-1993',
            total_amount: 141.5,
        },
        baseUrl: `${req.protocol}://${req.get('host')}`, // http://localhost:3000
    };

    const options = {
        format: 'A4',
        path : './src/public/invoice.pdf'
    };

    try {
        const readFileAsync = promisify(fs.readFile);
        const html = await readFileAsync('./src/views/invoice.hbs', 'utf8');
        const template = hbs.compile(html);
        // const template = hbs.create
        const content = template(pdfData);

        const buffer = await htmlPDF.create(content, options);
        res.attachment('invoice.pdf');
        res.end(buffer);
    } catch (error) {
        console.log(error);
        res.send('Something went wrong.');
    }
};

export const StudyGroupCertificatePDF : RequestHandler = async (req,res,next) => {
    let {group_id} = req.params;
    // const pdfData = await StudyGroup.find({_id : group_id});
    const pdfData = await StudyGroup.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(group_id) } },
        {
          $lookup: {
            from: 'groupstudents',
            foreignField: 'study_group_id',
            localField: '_id',
            as: 'GroupStudent',
          },
        },
        {
          $unwind: '$GroupStudent', // Unwind to destructure the array created by $lookup
        },
        {
          $lookup: {
            from: 'hostfamilies',
            foreignField: 'GroupStudent.host_family_id',
            localField: 'hostfamilies._id', // Use the field from the unwound array
            as: 'GroupStudent.Hostfamily',
          },
        },
        {
          $group: {
            _id: '$_id',
            group_id: { $first: '$group_id' },
            group_name: { $first: '$group_name' },
            arrival_date: { $first: '$arrival_date' },
            departure_date: { $first: '$departure_date' },
            GroupStudent: { $push: '$GroupStudent' },
          },
        },
      ]);
      
    //   console.log(pdfData);
      
      

    res.json(pdfData);
}
