import SendEmailInterface from "../contracts/SendEmailInterface";
import mailgun from "mailgun-js";

export class MailGunEmailService implements SendEmailInterface{
    private mailgun : mailgun.Mailgun;

    constructor(apiKey:string, domain:string)
    {
        this.mailgun = mailgun({apiKey,domain})
    }

    async sendEmail(from: string, to: string, subject: string, html: string, attachment?: Buffer | undefined,filename?:string): Promise<boolean> {
        return new Promise((resolve,reject) => {
            const data : mailgun.messages.SendData  = {
                from,
                to,
                subject,
                html
            }

            if(attachment)
            {
                data.attachment = attachment;
                // data.filename = filename
            }

            this.mailgun.messages().send(data,(error,body) =>{
                if(error)
                {
                    console.log('Error in sending email',error);
                }
                else{
                    console.log('Email Sent', body);
                }
            });
        })
    }
}