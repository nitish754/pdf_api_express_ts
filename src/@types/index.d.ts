declare interface ITaskData {
    title : string,
    description: string,
    due_date : string
}

declare interface IUserData {
    first_name : string,
    email : string,
    password :string,
    confirm_password : string
}

declare interface IPersonalInfoData {
    family_id: string,
    first_name: string,
    last_name: string,
    address: string,
    country: string,
    city: string,
    land_line: string,
    email: string,
    contact: string,
}

declare interface ISpecificationData {
    interests: string[],
    no_of_members: number,
    number_of_bed: number,
    is_pets_at_home: boolean,
    is_dogs_at_home: boolean,
    preference: string,
    notes: string,
    description: string,
}

declare interface IBankDetailsData{
    account_number: string,
    bank_name: string,
    sort_code: string,
    account_holder_name: string,
}

declare interface IHostFamilyData{
    personal_info : IPersonalInfoData,
    specification : ISpecificationData,
    bank_details : IBankDetailsData
}

declare module 'puppeteer-html-pdf';
