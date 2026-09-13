type ApplicationStatus = 
    "Applied" |
    "OA" |
    "Interview" |
    "Offer" |
    "Rejected" |
    "Withdrawn";

type ApplicationEventType = 
    "Application Submitted" |
    "OA Received" |
    "OA Completed" |
    "Interview Scheduled" |
    "Interview Completed" |
    "Offer Received" |
    "Rejected" |
    "Withdrawn";

interface Application {
    id: number;
    companyName: string;
    position: string;
    status: ApplicationStatus;
    interviewTime?: string;
}

function updateApplicationStatus(id: number, newStatus: ApplicationStatus): void{
    const found = findApplicationByID(id);
    if(found !== undefined){
        found.status = newStatus;
    }
    else{
        throw new Error("Application does not exist");
    }
}

function findApplicationByID(id: number): Application | undefined{
    return applications.find((application) => application.id === id);
}

function getEventsByApplicationId(id: number): ApplicationEvent[]{
    return events.filter((event) => event.applicationId === id);
}

function addApplicationEvent(applicationId: number, eventType: ApplicationEventType, eventTime: string): void{
    if(findApplicationByID(applicationId)){
        const newEvent: ApplicationEvent = {applicationId, eventType, eventTime};
        events.push(newEvent);
    }
    else{
        throw new Error("Application does not exist");
    }
}

try{
    addApplicationEvent(1, "OA Received", "2026");
}
catch(error){
    if(error instanceof Error){
        console.log(error.message);
    }
}

function receiveOA(applicationId: number, eventTime: string): void{
    updateApplicationStatus(applicationId, "OA");
    addApplicationEvent(applicationId, "OA Received", eventTime);
}

function completeOA(applicationId: number, eventTime: string): void{
    addApplicationEvent(applicationId, "OA Completed", eventTime);
}

function scheduleInterview(applicationId: number, eventTime: string, interviewTime: string): void{
    const app = findApplicationByID(applicationId);
    if(app){
        app.status = "Interview";
        app.interviewTime = interviewTime;
    }
    else{
        throw new Error("Application does not exist");
    }
    addApplicationEvent(applicationId, "Interview Scheduled", eventTime);
}

function completeInterview(applicationId: number, eventTime: string): void{
    addApplicationEvent(applicationId, "Interview Completed", eventTime);
}

function receiveOffer(applicationId: number, eventTime: string): void{
    updateApplicationStatus(applicationId, "Offer");
    addApplicationEvent(applicationId, "Offer Received", eventTime);
}

function rejectApplication(applicationId: number, eventTime: string): void{
    updateApplicationStatus(applicationId, "Rejected");
    addApplicationEvent(applicationId, "Rejected", eventTime);
}

function withdrawApplication(applicationId: number, eventTime: string): void{
    updateApplicationStatus(applicationId, "Withdrawn");
    addApplicationEvent(applicationId, "Withdrawn", eventTime);
}