type ApplicationStatus = 
    "Applied" |
    "OA Received" |
    "OA Completed" |
    "Interview Scheduled" |
    "Offer" |
    "Rejected" |
    "Withdrawn";

interface Application {
    companyName: string;
    position: string;
    status: ApplicationStatus;
    interviewTime?: string;
}

const applications: Application[] = [];

function addApplication(application: Application): Application{
    applications.push(application);
    return application;
}

interface ApplicationNote {
    content: string;
    createdAt: string;
    updatedAt?: string;
    important: boolean;
}

const notes: ApplicationNote[] = [];


// typed function
function example(companyName: string, position: string, status: ApplicationStatus){
    // content
}

