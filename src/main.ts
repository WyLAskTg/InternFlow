const addButton = document.getElementById("add-application");
const applicationForm = document.getElementById("application-form");
const cancelApplication = document.getElementById("cancel-application");

if(!addButton || !applicationForm || !cancelApplication){
    throw new Error("Required UI element not found");
}
else{
    addButton.addEventListener("click", () => {
        applicationForm.hidden = false;
    });
    cancelApplication.addEventListener("click", () => {
        applicationForm.hidden = true;
    });
}

const companyNameInput = document.getElementById("company-name");
const positionInput = document.getElementById("position");

if(!(companyNameInput instanceof HTMLInputElement)){
    throw new Error("Company name input not found");
}
if(!(positionInput instanceof HTMLInputElement)){
    throw new Error("Position input not found");
}

applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const companyNameVal = companyNameInput.value;
    const positionVal = positionInput.value;
    console.log(companyNameVal);
    console.log(positionVal);
});
