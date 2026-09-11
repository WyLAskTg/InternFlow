const application = {
    companyName: "",
    position: "",
    status: "",
    interviewTime: "",
};

const applications = [];

applications.push(application);


// output
for(const application of applications){
    console.log(application.companyName);
}

applications.forEach(function(application){
    console.log(application.companyName);
});

// or
function printCompany(application){
    console.log(application.companyName);
}

applications.forEach(printCompany);

// or (no need to name the function)
(application) => {
    console.log(application.companyName);
}


// find

let result = null;
for(const application of applications){
    if(application.companyName === "Something"){
        result = application;
        break;
    }
}

// or
const Result = applications.find((application) => application.companyName === "Something");

/* format
array.find(some function) => return the first element that satisfies the condition
*/

// filter
const offeredApplications = applications.filter((application) => application.status === "Offer");

// map
const companyNames = applications.map((application) => application.companyName);