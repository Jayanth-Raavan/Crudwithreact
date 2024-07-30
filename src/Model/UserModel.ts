export interface User {
    name: string;
    email: string;
    isActive: number;
    age: number | null;
    country: string;
    id?: string | any;
}