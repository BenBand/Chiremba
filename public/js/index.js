// Signing-page-code
function FormValidation(){
    const userName = document.getElementById("input-name").value;
    const userPass = document.getElementById("input-password").value;

    const ErrorName = document.getElementById("error-name");
    const ErrorPass = document.getElementById("error-pass");

    ErrorName.textContent = "";
    ErrorPass.textContent = "";

    let isValid = true;


    if(userName === "" || userName.length > 6){
        ErrorName.textContent = "Please Enter you Username";
        isValid = false;
    }


    if(userPass === "" || Password.length < 6){
        ErrorPass.textContent = "Please Enter you password";
        isValid = false;
    }
    return isValid;
}

