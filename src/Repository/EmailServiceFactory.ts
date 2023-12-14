import { EmailProvider } from "../config/email";
import { MailGunEmailService } from "./MailGunEmailService";

enum EmailServiceType{
    MAILGUN,

    // add more service if you want to integrate 

}

export class Mail {
    public static type:string = EmailProvider.default;
   
    static CreateEmail (){
        switch(this.type){
            case 'mailgun':
                return new MailGunEmailService(EmailProvider.drivers.mailgun.api_key,EmailProvider.drivers.mailgun.domain);
        }

    }
}