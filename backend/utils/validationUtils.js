const validators = [
    {field: "name", validator: ({name})=> name && name.trim().length ? null : "Invalid Name"},
    {field: "surname", validator: ({surname})=> surname && surname.trim().length ? null : "Invalid surname"},
    {field: "email", validator: ({email})=> email && email.trim().length ? null : "Invalid email"},
    // {field: "space", validator: ({space})=> space ? null : "No available spacename"},
    {field: "country", validator: ({country})=> country ? null : "Invalid country"},
    {field: "isEmailInUse", validator: ({isEmailInUse})=> !isEmailInUse ? null : null },
            // "This user is already invited for Data Fabric beta access."
];

const validateSignup = (signUpData) => {
    const invalidFields = validators
        .map(({validator})=> validator(signUpData))
        .filter(Boolean);

    return {
        isValid: invalidFields.length === 0,
        errorsMessages: invalidFields.join(",")
    }
}

const errorText =  "fatal: [localhost]: FAILED!"
const duplicatedUserText  =  "The request resulted in a duplicate entry";
const duplicatedTextToSend = "This user is already invited for Data Fabric beta access."
const apiErrorToSend = "Internal error, please try again after sometime?";

function parseAnsibleResponse(ansibleResponse){
    const isError = typeof(ansibleResponse) === "string" &&  ansibleResponse.indexOf(errorText) !== -1;
    return {
        isError,
        errorMessage: isError
            ? ansibleResponse.indexOf(duplicatedUserText) !== -1
                ? duplicatedTextToSend
                : apiErrorToSend
            : ""
    }
}

module.exports = {
    duplicatedUserText,
    parseAnsibleResponse,
    validateSignup
}