export interface Idata {
    "_id": string,
    "title": string,
    "category": string,
    "maxCapacity": string,
    "hourlyRate": string,
    "securityDeposit": string,
    "location": string,
    "imageUrl": string,
    "gallery"?: string[],
    "overview": string,
    "rating": string,
    "review": string,
    "amenities": string[],
    "email"?: string,
    "hostName"?: string
}