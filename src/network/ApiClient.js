import Cookies from "universal-cookie";

class ApiClient {
    backendBaseUrl = 'https://api.croatia-airport-transfer.com';
    appType = 'web';
    version = 'v1';

    fetchLocationList = async () => {
        return await fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/location`)
            .then(res => res.json());
    };

    loginUser = async (username, password) => {
        return await fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/auth/login/user`, {
            headers: {
                'username': username,
                'password': password,
            }
        }).then(res => res.json());
    };

    deleteTransferBooking = async (transferBookingId, cancellationToken) => {
        const transferData = {
            "data": {
                "id": transferBookingId,
                "type": "transfer-booking",
            }
        };

        return await fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/transfer-booking/${transferBookingId}`, {
            headers: {
                'cancellationToken': cancellationToken,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify(transferData)
        }).then(res => res.json());
    };

    getUserById = async (userId) => {
        return await fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/user/${userId}`).then(res => res.json());
    };

    getClientMessages = (clientId) => {
        return fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/message?filter[clientId]=${clientId}`).then(res => res.json());
    };

    sendContactUsEmail = async (email, name, message) => {
        const data = {
            "data": {
                "type": "contact-us-email",
                "attributes": {
                    "email": email,
                    "name": name,
                    "message": message,
                }
            }
        };

        return await fetch(
            `${this.backendBaseUrl}/${this.appType}/${this.version}/email/contact-us`,
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        ).then(res => res.json());
    };

    getExcursions = async () => {
        return await fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/excursion?include=fromLocation,toLocation`).then(res => res.json());
    };

    getTransferBookingById = (transferBookingId) => {
        return fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/transfer-booking/${transferBookingId}`).then(res => res.json());
    };

    getPriceBetweenLocations = async (fromId, toId) => {
        return await fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/transfer-price/${fromId}/${toId}`).then(res => res.json());
    };

    getUserReservations = async (userId) => {
        return await fetch(`${this.backendBaseUrl}/${this.appType}/${this.version}/transfer-booking?filter[userId]=${userId}`).then(res => res.json());
    };

    registerUser = async (
        email,
        password,
        firstName,
        lastName,
        phone,
    ) => {
        const userData = {
            "data": {
                "type": "user",
                "attributes": {
                    "email": email,
                    "firstName": firstName,
                    "lastName": lastName,
                    "phone": phone,
                    "password": password
                }
            }
        };
        return await fetch(
            `${this.backendBaseUrl}/${this.appType}/${this.version}/user`,
            {
                method: 'POST',
                body: JSON.stringify(userData)
            }
        ).then(res => res.json());
    };

    signRbaTransaction = async (orderId, amount) => {
        const data = {
            "data": {
                "type": "rba-transaction",
                "attributes": {
                    "orderId": orderId,
                    "amount": amount,
                }
            }
        };
        return await fetch(
            `${this.backendBaseUrl}/${this.appType}/${this.version}/payment/rba/transaction-signing`,
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        ).then(res => res.json());
    };

    createTransferBooking = async (
        from,
        to,
        dateTime,
        returnDateTime,
        pickUpAddressOrFlightNumber,
        dropOffAddress,
        message,
        passengers,
        bags,
        firstName,
        lastName,
        email,
        phone,
        price,
        stops,
        vehicleType,
        paidBy,
        infantSeat,
        childSeat,
        boosterSeat,
        bicycle,
        wheelchair,
        extraStop,
    ) => {
        const cookie = new Cookies();
        const userId = cookie.get('userId');
        let user = [];
        if (userId) {
            user = [{"type": "user", "id": userId}];
        }
        const transferData = {
            "data": {
                "type": "transfer-booking",
                "attributes": {
                    "fromLocation": from,
                    "toLocation": to,
                    "transferDate": dateTime,
                    "returnDate": returnDateTime,
                    "pickUpAddressOrFlightNumber": pickUpAddressOrFlightNumber,
                    "dropOffAddress": dropOffAddress,
                    "message": message,
                    "passengers": passengers,
                    "bags": bags,
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "phone": phone,
                    "price": price,
                    "stops": stops,
                    "vehicleType": vehicleType,
                    "paidBy": paidBy,
                    "infantSeat": infantSeat,
                    "childSeat": childSeat,
                    "boosterSeat": boosterSeat,
                    "bicycle": bicycle,
                    "wheelchair": wheelchair,
                    "extraStop": extraStop,
                },
                "relationships": {
                    "user": {
                        "data": user
                    }
                }
            }
        };
        return await fetch(
            `${this.backendBaseUrl}/${this.appType}/${this.version}/transfer-booking`,
            {
                method: 'POST',
                body: JSON.stringify(transferData)
            }
        ).then(res => res.json());
    };

    updateTransferBooking = async (
        id,
        from,
        to,
        dateTime,
        returnDateTime,
        pickUpAddressOrFlightNumber,
        dropOffAddress,
        message,
        passengers,
        bags,
        firstName,
        lastName,
        email,
        phone,
        price,
        stops,
        vehicleType,
        paidBy,
        infantSeat,
        childSeat,
        boosterSeat,
        bicycle,
        wheelchair,
        extraStop,
    ) => {
        const cookie = new Cookies();
        const userId = cookie.get('userId');
        let user = [];
        if (userId) {
            user = [{"type": "user", "id": userId}];
        }
        const transferData = {
            "data": {
                "id": id,
                "type": "transfer-booking",
                "attributes": {
                    "fromLocation": from,
                    "toLocation": to,
                    "transferDate": dateTime,
                    "returnDate": returnDateTime,
                    "pickUpAddressOrFlightNumber": pickUpAddressOrFlightNumber,
                    "dropOffAddress": dropOffAddress,
                    "message": message,
                    "passengers": passengers,
                    "bags": bags,
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "phone": phone,
                    "price": price,
                    "stops": stops,
                    "vehicleType": vehicleType,
                    "paidBy": paidBy,
                    "infantSeat": infantSeat,
                    "childSeat": childSeat,
                    "boosterSeat": boosterSeat,
                    "bicycle": bicycle,
                    "wheelchair": wheelchair,
                    "extraStop": extraStop,
                },
                "relationships": {
                    "user": {
                        "data": user
                    }
                }
            }
        };
        return await fetch(
            `${this.backendBaseUrl}/${this.appType}/${this.version}/transfer-booking/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(transferData)
            }
        ).then(res => res.json());
    };
}

export default ApiClient;
