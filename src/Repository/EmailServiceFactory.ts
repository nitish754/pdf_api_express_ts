import { EmailProvider } from "../config/email";
import { MailGunEmailService } from "./MailGunEmailService";

enum EmailServiceType{
    MAILGUN,

    // add more service if you want to integrate 

}

export class Mail {
    public static type:string = EmailProvider.default;
   
    static CreateEmail (){
        console.log('API KEY',EmailProvider.drivers.mailgun.api_key);
        console.log('API DOMAIN',EmailProvider.drivers.mailgun.domain);
        let api_key= 'key-de4582feecd40bce619439a152ce7d23';
        let domain = 'mailing.webfirminfotech.com';
        switch(this.type){
            case 'mailgun':
                return new MailGunEmailService(EmailProvider.drivers.mailgun.api_key,EmailProvider.drivers.mailgun.domain);
        }

    }
}