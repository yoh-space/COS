export interface Administrator {
    id: string;
    title: string;
    name?: string;
    imagePath: string;
    accountabilityStatement?: string;
    duties: string[];
}

export interface AdministratorSectionProps {
    administrator: Administrator;
}
