import bcrypt from "bcrypt";
import mailgun from 'mailgun-js';
import fs from 'fs'
import { pdfTemplatePath } from "../config";

export const VerifyOldPassword = (old_password: any, hashedPwd: any) => {
    bcrypt.compare(old_password, hashedPwd, (err, result) => {
        if (err) {
            return false;
        }
        if (result) {
            return true;
        }
    });
    // return false;
}

export const formateDate = (isoDate: any) => {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;

}

export const SendEmail = () => {
    const apiKey = 'key-de4582feecd40bce619439a152ce7d23';
    const domain = 'mailing.webfirminfotech.com';
    const FROM_EMAIL = 'sender@example.com';
    const TO_EMAIL = 'ernitish1993@gmail.com';

    const mg = mailgun({apiKey , domain });
    const attachmentFilePath = `${pdfTemplatePath.output}Justice League_certificate.pdf`;// Replace with your attachment file path
    const study_report = fs.readFileSync(attachmentFilePath);

    const data = {
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: 'Email with Attachment',
        text: 'Please find the attachment.',
        attachment: study_report,
        filename: 'attachment.pdf',
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
          console.error('Error sending email:', error);
        //   res.status(500).send('Error sending email');
        } else {
          console.log('Email sent!', body);
        //   res.send('Email sent successfully!');
        }
      });
}


