export class RegistrationModel {
    officialName:string;
    casualName:string;
    uniqueKey:string;
    operationArea:string="INDUSTRIAL";
    contactNumber:string;
    emailAddress:string;
    address:[];
    leadGroup={"type":"LAN_TO_LAN"};
    selectedProduct:string;
    mappedProduct:string;
}