export interface User{
    name: string
    email: string
    password: string
    phoneNumber: string
    address:{
        full_adress:string
        postal_code:string
    }
}