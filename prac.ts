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

function getNumber(): number{
    return 5;
}

interface ApplicationEvent {
    applicationId: number;
    eventType: ApplicationEventType;
    eventTime: string;
}

const events: ApplicationEvent[] = [];

let value: unknown;
/*
string / number / boolean -> typeof
object (i.e. Error) -> instanceof
*/

const updates: Partial<Application> = {
    status: "Interview",
    interviewTime: "xxx"
};