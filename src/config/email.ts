import dotenv from 'dotenv'

dotenv.config();

interface MailConfig{
    default : string,
    drivers : {
        [key:string] : {
            api_key:string,
            domain : string,
            from_email : string,
            from_name : string,
        }
    }
}

export const EmailProvider : MailConfig = {
    default : 'mailgun',
    drivers : {
        mailgun : {
            api_key : "key-de4582feecd40bce619439a152ce7d23",
            domain : "mailing.webfirminfotech.com",
            from_email : 'Info@newcastleschooluk.com',
            from_name : process.env.MAIL_FROM_NAME || 'newcastleschool.uk'
        }
    }
    
}