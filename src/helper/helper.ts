import bcrypt from "bcrypt";

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

export const formateDate = (isoDate:any) => {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;

}



