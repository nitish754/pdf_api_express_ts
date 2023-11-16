import bcrypt from "bcrypt";

export const VerifyOldPassword = (old_password:any,hashedPwd:any) => {
    bcrypt.compare(old_password,hashedPwd, (err,result) => {
        if(err)
        {
            return false;
        }
        if(result)
        {
            return true;
        }
    });
    // return false;
}