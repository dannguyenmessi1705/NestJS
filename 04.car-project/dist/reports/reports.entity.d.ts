import { User } from 'src/users/users.entity';
export declare class Report {
    id: number;
    price: number;
    make: string;
    model: string;
    year: number;
    mileage: number;
    lat: number;
    lng: number;
    user: User;
}
