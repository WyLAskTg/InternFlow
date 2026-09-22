export type ApplicationStatus = 
    "Applied" |
    "OA" |
    "Interview" |
    "Offer" |
    "Rejected" |
    "Withdrawn";

export interface ApplicationEvent {
    eventType: ApplicationEventType;
    eventTime: string;
}

export type ApplicationEventType = 
    "Application Submitted" |
    "OA Received" |
    "OA Completed" |
    "Interview Scheduled" |
    "Interview Completed" |
    "Offer Received" |
    "Rejected" |
    "Withdrawn";

export interface Application {
    id: number;
    companyName: string;
    position: string;
    status: ApplicationStatus;
    interviewTime?: string;
    events: ApplicationEvent[];
}