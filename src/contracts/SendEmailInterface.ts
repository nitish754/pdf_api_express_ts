export default interface SendEmailInterface{
    sendEmail(from: string, to: string, subject: string, text: string, attachment?: Buffer,filename?:string): Promise<boolean>;
}
