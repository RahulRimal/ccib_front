class User {
    constructor({
        username,
        firstName,
        middleName,
        lastName,
        citizenshipNumber,
        citizenshipIssuedPlace,
        citizenshipIssuedDate,
        dob,
        fathersName,
        phoneNumber
    }) {
        this.username = username;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.citizenshipNumber = citizenshipNumber;
        this.citizenshipIssuedPlace = citizenshipIssuedPlace;
        this.citizenshipIssuedDate = citizenshipIssuedDate;
        this.dob = dob;
        this.fathersName = fathersName;
        this.phoneNumber = phoneNumber;
    }

    static fromJson(json) {
        return new User(
            username=json.username,
            firstName=json.first_name,
            middleName=json.middle_name,
            lastName=json.last_name,
            citizenshipNumber=json.citizenship_number,
            citizenshipIssuedPlace=json.citizenship_issued_place,
            citizenshipIssuedDate=json.citizenship_issued_date,
            dob=json.dob,
            fathersName=json.fathers_name,
            phoneNumber=json.phone_number
        );
    }

    toJson() {
        return {
            username: this.username,
            first_name: this.firstName,
            middle_name: this.middleName,
            last_name: this.lastName,
            citizenship_number: this.citizenshipNumber,
            citizenship_issued_place: this.citizenshipIssuedPlace,
            citizenship_issued_date: this.citizenshipIssuedDate,
            dob: this.dob,
            fathers_name: this.fathersName,
            phone_number: this.phoneNumber
        }
    }

}
