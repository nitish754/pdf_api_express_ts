import dotenv from 'dotenv'

dotenv.config();

export const DB = process.env.DB!;
export const PORT = process.env.PORT || 3000;
export const JWT_KEY = process.env.JWT_KEY!;
export const FRONTEND_URL = process.env.FRONTEND_URL!;
export const API_KEY = process.env.API_KEY || 'ea071073495502c9b47feac5ea126977-5d2b1caa-e4acb341'

/**
 * custom application configration 
 */
export const date_format = "YYYY-mm-dd";
/**
 * define static header config file
 */
export const headerInfo = {
    logo : "https://recipeapp.nyc3.cdn.digitaloceanspaces.com/images/logo.jpg",
    contact : "+44 7784 004353",
    email : "info@newcastleschooluk.com",
    website : "www.newcastleschooluk.com",
    address1 : "Northumbria University, Ellison Pl",
    address2 : "Newcastle upon Tyne NE1 8ST",

}

export const pdfTemplatePath = {
    path : process.env.VIEW_PATH,
    output : process.env.PDF_OUT_PATH
}
