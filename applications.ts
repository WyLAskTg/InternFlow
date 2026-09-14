import { Application, ApplicationStatus, ApplicationEvent, ApplicationEventType } from "./types";

let applications: Application[] = [];

let nextApplicationId = 1;

const allowedTransitions: Record<ApplicationStatus, ApplicationStatus[]> = {
    Applied: ["OA", "Interview", "Offer", "Rejected", "Withdrawn"],
    OA: ["OA", "Interview", "Offer", "Rejected", "Withdrawn"],
    Interview: ["Interview", "Offer", "Rejected", "Withdrawn"],
    Offer: ["Withdrawn"],
    Rejected: [],
    Withdrawn: []
};

const allowedEvents: Record<ApplicationStatus, ApplicationEventType[]> = {
    "Applied": ["Application Submitted", "OA Received", "Interview Scheduled", "Offer Received", "Rejected", "Withdrawn"],
    "OA": ["OA Received", "OA Completed", "Interview Scheduled", "Offer Received", "Rejected", "Withdrawn"],
    "Interview": ["Interview Scheduled", "Interview Completed", "Offer Received", "Rejected", "Withdrawn"],
    "Offer": ["Withdrawn"],
    "Rejected": [],
    "Withdrawn": []
};

export function createApplication(companyName: string, position: string, submittedAt: string): Application{
    const newApplication: Application = {id: nextApplicationId, companyName, position, status: "Applied", events: []};
    applications.push(newApplication);
    addApplicationEvent(newApplication.id, "Application Submitted", submittedAt);
    nextApplicationId++;
    return newApplication;
}

export function deleteApplication(id: number): void{
    const app = findApplicationById(id);
    if(app){
        applications = applications.filter((application) => application.id !== id);
    }
    else{
        throw new Error("Application does not exist");
    }
}

export function findApplicationById(id: number): Application | undefined{
    return applications.find((application) => application.id === id);
}

function canAddEvent(status: ApplicationStatus, eventType: ApplicationEventType): boolean{
    return allowedEvents[status].includes(eventType);
}

function addApplicationEvent(applicationId: number, eventType: ApplicationEventType, eventTime: string): void{
    const app = findApplicationById(applicationId);
    if(app){
        if(canAddEvent(app.status, eventType)){
            const newEvent: ApplicationEvent = {eventType, eventTime};
            app.events.push(newEvent);
        }
        else{
            throw new Error(`Cannot add event ${eventType} while application is ${app.status}`)
        }
    }
    else{
        throw new Error("Application does not exist");
    }
}

export function getEventsByApplicationId(id: number): ApplicationEvent[]{
    const app = findApplicationById(id);
    if(app){
        return [...app.events];
    }
    else{
        throw new Error("Application does not exist");
    }
}

function canTransition(fromStatus: ApplicationStatus, toStatus: ApplicationStatus): boolean{
    return allowedTransitions[fromStatus].includes(toStatus);
}

function transitionWithEvent(applicationId: number, newStatus: ApplicationStatus, eventType: ApplicationEventType, eventTime: string): void{
    const app = findApplicationById(applicationId);
    if(!app){
        throw new Error("Application does not exist");
    }
    if(!canAddEvent(app.status, eventType)){
        throw new Error(`Cannot add event ${eventType} while application is ${app.status}`);
    }
    if(!canTransition(app.status, newStatus)){
        throw new Error(`Cannot transition from ${app.status} to ${newStatus}`);
    }
    const newEvent: ApplicationEvent = {eventType, eventTime};
    app.events.push(newEvent);
    app.status = newStatus;
}

// Recruiting workflow functions

export function receiveOA(applicationId: number, eventTime: string): void{
    transitionWithEvent(applicationId, "OA", "OA Received", eventTime);
}

export function completeOA(applicationId: number, eventTime: string): void{
    addApplicationEvent(applicationId, "OA Completed", eventTime);
}

export function scheduleInterview(applicationId: number, eventTime: string, interviewTime: string): void{
    const app = findApplicationById(applicationId);
    if(!app){
        throw new Error("Application does not exist");
    }
    if(!canAddEvent(app.status, "Interview Scheduled")){
        throw new Error(`Cannot add event Interview Scheduled while application is ${app.status}`);
    }
    if(!canTransition(app.status, "Interview")){
        throw new Error(`Cannot transition from ${app.status} to Interview`);
    }
    const newEvent: ApplicationEvent = {eventType: "Interview Scheduled", eventTime};
    app.events.push(newEvent);
    app.status = "Interview";
    app.interviewTime = interviewTime;
}

export function completeInterview(applicationId: number, eventTime: string): void{
    addApplicationEvent(applicationId, "Interview Completed", eventTime);
}

export function receiveOffer(applicationId: number, eventTime: string): void{
    transitionWithEvent(applicationId, "Offer", "Offer Received", eventTime);
}

export function rejectApplication(applicationId: number, eventTime: string): void{
    transitionWithEvent(applicationId, "Rejected", "Rejected", eventTime);
}

export function withdrawApplication(applicationId: number, eventTime: string): void{
    transitionWithEvent(applicationId, "Withdrawn", "Withdrawn", eventTime);
}