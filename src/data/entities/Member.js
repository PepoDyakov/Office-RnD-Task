export default class Member {
    name = "";
    location = -1;
    team = -1;
    email = "";
    image = "";
    phone = "";
    startDate = Date.now();
    createdAt = Date.now();
    calculatedStatus = ["new"];

    constructor(
        name,
        location,
        team,
        email,
        image,
        phone,
        startDate,
        calculatedStatus
    ) {
        this.name = name;
        this.location = location;
        this.team = team;
        this.email = email;
        this.image = image;
        this.phone = phone;
        this.startDate = startDate;
    }

    toObject() {
        return {
            name: this.name,
            location: this.location,
            team: this.team,
            email: this.email,
            image: this.image,
            phone: this.phone,
            startDate: this.startDate,
            createdAt: this.createdAtm,
            calculatedStatus: this.calculatedStatus,
        };
    }
}
