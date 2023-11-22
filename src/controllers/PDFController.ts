import * as fs from 'fs';
import hbs from 'hbs';
import * as htmlPDF from 'puppeteer-html-pdf';
import { promisify } from 'util';
import { Request, RequestHandler, Response } from 'express';
import HostFamily from '../model/HostFamily';
import GroupStudent from '../model/GroupStudent';
import { BSON, ObjectId } from 'bson';
import mongoose from 'mongoose';
import StudyGroup from '../model/StudyGroup';
import { FilterStudentByFamilyId, formateDate } from '../helper/helper';
import { headerInfo, pdfTemplatePath } from '../config';

export const viewHTML: RequestHandler = (req, res, next) => {
  res.render('invoice');
}

export const print = async (req: Request, res: Response): Promise<void> => {
  const pdfData = {
    image: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?w=740&t=st=1699605878~exp=1699606478~hmac=b651bf982f0d19af27c6eb76fec0ee8ae8b93865f3b3ddad0bed8c735a389aca",
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
    path: './src/public/invoice.pdf',
    displayHeaderFooter: true,
    printBackground: true,
    footerTemplate: '<img src="data:image/png;base64,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" style="width:100%; margin-bottom:-15px;">'
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

export const StudyGroupCertificatePDF: RequestHandler = async (req, res, next) => {
  let { group_id } = req.params;

  const pdfData = await GroupStudent.aggregate([
    {
      $lookup: {
        from: 'studygroups',
        localField: 'study_group_id',
        foreignField: '_id',
        as: 'group',
      },
    },
    {
      $unwind: '$group',
    },
    {
      $lookup: {
        from: 'hostfamilies',
        localField: 'host_family_id',
        foreignField: '_id',
        as: 'family',
      },
    },
    {
      $unwind: '$family',
    },
    {
      $match: {
        $and: [
          { 'group._id': new mongoose.Types.ObjectId(group_id) }, // Match specific group
          { 'family._id': { $exists: true } }, // Ensure there's a family
        ],
      },
    },
  ]);


  let groupInfo = await StudyGroup.findById(group_id);
  const family = await GroupStudent.find({ study_group_id: group_id }).select('host_family_id').lean();

  let host_family_id = family.map(item => item.host_family_id);
  const host_family_id_string = host_family_id.map(String);
  const host_family_id_unique = [... new Set(host_family_id_string)];

  const families = await HostFamily.find({ _id: { $in: host_family_id_unique } }).select('_id personal_info.full_name personal_info.family_id personal_info.address personal_info.contact').lean();

  let formatedData: any = [];
  families.forEach(family => {
    const familyInfo = {
      family_info: {
        name: family.personal_info.full_name,
        address: family.personal_info.address,
        contact: family.personal_info.contact,
      },
      students: pdfData.filter(function (pdf) {
        if (pdf.host_family_id.toString() === family._id.toString()) {
          return pdf;
        }
      })
    }

    formatedData.push(familyInfo);
  });

  const pdfPayload = {
    headerInfo: headerInfo,

    hostfamilyInfo: formatedData,
    groupInfo: {
      group_name: groupInfo?.group_name,
      arrival: formateDate(groupInfo?.arrival_date),
      departure: formateDate(groupInfo?.departure_date),
    },

    baseUrl: `${req.protocol}://${req.get('host')}`, // http://localhost:3000

  };
  const pdf_name = `${groupInfo?.group_name}_certificate.pdf`;
  const pdfURL = `${pdfTemplatePath.output}${pdf_name}`;

  const options = {
    format: 'A4',
    path: pdfURL,
    displayHeaderFooter: true,
    printBackground: true,
    footerTemplate: '<img src="data:image/png;base64,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" style="width:100%; margin-bottom:-15px;">'
  };


  try {
    const readFileAsync = promisify(fs.readFile);
    const html = await readFileAsync(`${pdfTemplatePath.path}study_group_report.hbs`, 'utf8');
    const template = hbs.compile(html);
    // const template = hbs.create
    const content = template(pdfPayload, {
      allowedProtoMethods: {
        trim: true
      }
    });

    const buffer = await htmlPDF.create(content, options);
    // res.attachment(`${groupInfo?.group_name}_certificate.pdf`);
    // res.end(buffer);
    res.json({
      status: 'success',
      message: 'Pdf generated successfully',
      pdf_url: `${req.protocol}://${req.get('host')}/${pdf_name}`
    });
  } catch (error) {
    console.log(error);
    res.send('Something went wrong.');
  }


}


export const HostFamilyLetter: RequestHandler = async (req, res, next) => {
  let { group_id } = req.params;
  let groupInfo = await StudyGroup.findById(group_id);
  const family = await GroupStudent.find({ study_group_id: group_id }).select('host_family_id').lean();
  let host_family_id = family.map(item => item.host_family_id);
  const host_family_id_string = host_family_id.map(String);
  const host_family_id_unique = [... new Set(host_family_id_string)];

  const pdfData = await GroupStudent.aggregate([
    {
      $lookup: {
        from: 'studygroups',
        localField: 'study_group_id',
        foreignField: '_id',
        as: 'group',
      },
    },
    {
      $unwind: '$group',
    },
    {
      $lookup: {
        from: 'hostfamilies',
        localField: 'host_family_id',
        foreignField: '_id',
        as: 'family',
      },
    },
    {
      $unwind: '$family',
    },
    {
      $match: {
        $and: [
          { 'group._id': new mongoose.Types.ObjectId(group_id) }, // Match specific group
          { 'family._id': { $exists: true } }, // Ensure there's a family
        ],
      },
    },
  ]);

  const families = await HostFamily.find({ _id: { $in: host_family_id_unique } }).select('_id personal_info.full_name personal_info.family_id personal_info.address personal_info.contact').lean();

  try {
    const readFileAsync = promisify(fs.readFile);
    const html = await readFileAsync(`${pdfTemplatePath.path}host-family.hbs`, 'utf8');
    const template = hbs.compile(html);
    const createPdf = families.forEach(async (family) => {
      const options = {
        format: 'A4',
        path: `${pdfTemplatePath.output}${groupInfo?.group_name}_${family.personal_info.full_name}_letter.pdf`,
        displayHeaderFooter: true,
        printBackground: true,
        footerTemplate: '<img src="data:image/png;base64,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" style="width:100%; margin-bottom:-15px;">'
      };
      // payload
      const pdfPayload = {
        headerInfo: headerInfo,

        hostfamilyInfo: {
          name: family.personal_info.full_name,
          address: family.personal_info.address,
          contact: family.personal_info.contact,
        },
        students: pdfData.filter(function (pdf) {
          if (pdf.host_family_id.toString() === family._id.toString()) {
            return pdf;
          }
        }),
        groupInfo: {
          group_name: groupInfo?.group_name,
          arrival: formateDate(groupInfo?.arrival_date),
          departure: formateDate(groupInfo?.departure_date),
          country_origin: groupInfo?.country_origin
        },

        baseUrl: `${req.protocol}://${req.get('host')}`, // http://localhost:3000

      };
      // res.json(pdfPayload);
      // return;
      // const template = hbs.create
      const content = template(pdfPayload, {
        allowedProtoMethods: {
          trim: true
        }
      });

      const buffer = await htmlPDF.create(content, options);
      // res.attachment(`${groupInfo?.group_name}_certificate.pdf`);
      // res.end(buffer);

    });
    res.json({
      'status': 'success',
      'message': 'PDF created successfully'
    })
  } catch (error) {
    console.log(error);
    res.send('Something went wrong.');
  }

  // create pdf 


}

export const GenerateIdCard: RequestHandler = async (req, res, next) => {
  try {
    let {group_id} = req.params;
    const groupInfo = await StudyGroup.findById(req.params.group_id);
    // const students = await GroupStudent.find({study_group_id: req.params.group_id}).lean();
    const students = await GroupStudent.aggregate([
      {
        $match : {study_group_id : new mongoose.Types.ObjectId(group_id)}
      },
      {
        $lookup : {
          from : 'hostfamilies',
          foreignField : '_id',
          localField : 'host_family_id',
          as : 'hostfamily'
        }
      },
      {
        $project : {
          first_name : 1,
          last_name : 1,
          profile_type : 1,
          nationality: 1,
          host_family_name : '$hostfamily.personal_info.full_name',
          host_family_address : '$hostfamily.personal_info.address',
          host_family_contact : '$hostfamily.personal_info.contact'
        }
      }
    ]);

    // res.json(students);
    // return;
    const readFileAsync = promisify(fs.readFile);
    const html = await readFileAsync(`${pdfTemplatePath.path}id.hbs`, 'utf8');
    const template = hbs.compile(html);
    // const template = hbs.create
    const pdfPayload = {
      headerInfo : headerInfo,
        students : students
    };
    const content = template(pdfPayload, {
      allowedProtoMethods: {
        trim: true
      }
    });
    const pdf_name = `${groupInfo?.group_name}_id_card_info.pdf`;
    const pdfURL = `${pdfTemplatePath.output}${pdf_name}`;
    const options = {
      format: 'A4',
      path: pdfURL,
      displayHeaderFooter: true,
      printBackground: true,
      footerTemplate: '<img src="data:image/png;base64,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" style="width:100%; margin-bottom:-15px;">'
    };

    const buffer = await htmlPDF.create(content, options);
    // res.attachment(`${pdf_name}`);
    // res.end(buffer);
    res.json({
      "status": "success",
      "message": "Pdf generated successfully",
      "pdf_url": `${req.protocol}://${req.get('host')}/${pdf_name}`
    })

  } catch (error) {
    console.log(error);
    res.send('Something went wrong.');
  }

}

export const HostFamilyDetailsPDF: RequestHandler = async (req, res, next) => {
  try {
    const familyInfo = await HostFamily.findById(req.params.id).lean();
    const readFileAsync = promisify(fs.readFile);
    const html = await readFileAsync(`${pdfTemplatePath.path}host_family_details.hbs`, 'utf8');
    const template = hbs.compile(html);

    const pdfPayload = {
      headerInfo: headerInfo,
      hostfamilyInfo: familyInfo,
    };

    // res.json(pdfPayload);
    // return;

    const content = template(pdfPayload, {
      allowedProtoMethods: {
        trim: true
      }
    });
    const pdf_name = `${familyInfo?.personal_info.full_name}_info.pdf`;
    const pdfURL = `${pdfTemplatePath.output}${pdf_name}`;

    const options = {
      format: 'A4',
      path: pdfURL,
      displayHeaderFooter: true,
      printBackground: true,
      footerTemplate: '<img src="data:image/png;base64,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" style="width:100%; margin-bottom:-15px;">'
    };

    const buffer = await htmlPDF.create(content, options);
    // res.attachment(pdf_name)
    // res.end(buffer);

    res.json({
      "status": "success",
      "message": "Pdf generated successfully",
      "pdf_url": `${req.protocol}://${req.get('host')}/${pdf_name}`
    })
  } catch (error) {
    console.log(error);
    res.send('Something went wrong.');
  }
}