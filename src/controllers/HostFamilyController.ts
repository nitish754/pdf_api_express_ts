import { RequestHandler } from "express";
import HostFamily from "../model/HostFamily";
import createHttpError, { CreateHttpError } from "http-errors";
import PDFDocument from 'pdfkit';

export const HostFamilyList: RequestHandler = async (req, res, next) => {
    try {
        let { city, search } = req.query;
        let filterField = {};

        if (city) {
            filterField = { 'personal_info.city': city }
        }
        if (search) {
            filterField = { 'personal_info.name': search, 'personal_info.email': search, 'personal_info.contact': search }
        }

        let hostFamily = await HostFamily.find(filterField).sort({ _id: -1 });

        res.status(200).json({
            message: 'Data reterived successfully',
            data: hostFamily
        })

    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const AddHostFamily: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const family = await HostFamily.findOne({}).sort({_id : -1});
        // res.json(family?.personal_info.family_id);
        let family_id = '';
        if (family) {
            
            family_id = family?.personal_info.family_id;
            
            const match = family_id?.match(/00(\d+)/);
            // res.json(match[1]);

            if (match && match[1]) {
                let temp_id = parseInt(match[1])+1;

                // res.json(temp_id);
           
                if(temp_id <= 9)
                {
                    family_id = 'NH000' + temp_id.toString();
                }else{
                    family_id = 'NH00' + temp_id.toString();
                }
                
                
            }
            // family_id = 'NH0001'
        } else {
            family_id = 'NH0001';
        }

        // res.json(family_id);

        payload.personal_info.family_id = family_id;

        // res.json(payload);


        const ValidateEmail = await HostFamily.findOne({ 'personal_info.email': req.body.personal_info.email })
        if (ValidateEmail) {
            return next(createHttpError(422, "Email already registered with us"))
        }
        const addHost = await HostFamily.create(payload);
        res.status(201).json({
            message: 'Host family added successfully',
            data: addHost
        });
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const findFamilyById: RequestHandler = async (req, res, next) => {
    try {
        const hostFamily = await HostFamily.findById(req.params.id);

        if(hostFamily)
        {
            res.status(200).json({
                status : 'success',
                message: 'Data reterived successfully',
                data: hostFamily
            })
        }else{
            res.status(404).json({
                status : 'failed',
                message: 'Family Not Found',
             
            })
        }

        
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const UpdateFamily: RequestHandler = async (req, res, next) => {
    try {
        const ValidateEmail = await HostFamily.findOne({ 'personal_info.email': req.body.personal_info.email });

        if (req.params.id !== ValidateEmail?._id.toString()) {
            return next(createHttpError(422, "Email already exist"));
        }

        const UpdateFamily = await HostFamily.findByIdAndUpdate(req.params.id, req.body);

        res.status(204).json({
            message: 'Family updated successfully',
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const DeleteHostFamily: RequestHandler = async (req, res, next) => {
    try {

        const deleteFamily = await HostFamily.findByIdAndDelete(req.params.id);

        if (deleteFamily) {
            res.status(204).json({
                message: 'Family deleted successfully'
            });
        }
      
    }
    catch (error) {
        return next(createHttpError.InternalServerError)
    }
}

export const GeneratePdf: RequestHandler = async (req, res, next) => {
    // try {
    //     // fetch data by id 
    //     let data = await HostFamily.findById(req.params.id);
    //     if(data)
    //     {
    //         // Create a new PDF document
    //     const pdf = new PDFDocument();
    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');

    //     // Pipe the PDF document to the response
    //    await pdf.pipe(res);

    //     // Add content to the PDF

    //     // start adding text on pdf
    //     pdf.fontSize(18).text('Personal Information:', 50, 50);
    //     pdf.fontSize(14).text(`Family ID: ${data?.personal_info.family_id}`, 50, 70);
    //     pdf.fontSize(14).text(`Name: ${data.personal_info.first_name} ${data.personal_info.last_name}`, 50, 90);
    //     pdf.fontSize(14).text(`Address: ${data.personal_info.address}`, 50, 110);
    //     pdf.fontSize(14).text(`Country: ${data.personal_info.country}`, 50, 130);
    //     pdf.fontSize(14).text(`City: ${data.personal_info.city}`, 50, 150);
    //     pdf.fontSize(14).text(`Landline: ${data.personal_info.land_line}`, 50, 170);
    //     pdf.fontSize(14).text(`Email: ${data.personal_info.email}`, 50, 190);
    //     pdf.fontSize(14).text(`Contact: ${data.personal_info.contact}`, 50, 210);

    //     pdf.fontSize(18).text('Specifications:', 50, 270);
    //     pdf.fontSize(14).text(`Interests: ${data.specifications.interests.join(', ')}`, 50, 290);
    //     pdf.fontSize(14).text(`Number of Members: ${data.specifications.no_of_members}`, 50, 310);
    //     pdf.fontSize(14).text(`Number of Beds: ${data.specifications.number_of_bed}`, 50, 330);
    //     pdf.fontSize(14).text(`Pets at Home: ${data.specifications.is_pets_at_home ? 'Yes' : 'No'}`, 50, 350);
    //     pdf.fontSize(14).text(`Dogs at Home: ${data.specifications.is_dogs_at_home ? 'Yes' : 'No'}`, 50, 370);
    //     pdf.fontSize(14).text(`Preference: ${data.specifications.preference}`, 50, 390);
    //     pdf.fontSize(14).text(`Notes: ${data.specifications.notes}`, 50, 410);
    //     pdf.fontSize(14).text(`Description: ${data.specifications.description}`, 50, 430);

    //     pdf.fontSize(18).text('Bank Details:', 50, 490);
    //     pdf.fontSize(14).text(`Account Number: ${data.bank_details.account_number}`, 50, 510);
    //     pdf.fontSize(14).text(`Bank Name: ${data.bank_details.bank_name}`, 50, 530);
    //     pdf.fontSize(14).text(`Sort Code: ${data.bank_details.sort_code}`, 50, 550);
    //     pdf.fontSize(14).text(`Account Holder Name: ${data.bank_details.account_holder_name}`, 50, 570);

    //     // End the PDF stream and send it as a downloadable link
    //     await pdf.end();
    //     }
    // } catch (error) {

    // }
}