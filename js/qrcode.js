var firstName, lastName, email, phone, mobile, website, company, position, address, postalCode, city;
var valeur;

document.forms[0].onchange = () => {
    console.log("chargement");
}

var qr = new QRious({
    element: document.querySelector('.qrious'),
    size: 250
});

function change(element) {
    switch (element.id) {
        case "firstName":
            firstName = element.value;
            break;
        case "lastName":
            lastName = element.value;
            break;
        case "email":
            email = element.value;
            break;
        case "phone":
            phone = element.value;
            break;
        case "mobile":
            mobile = element.value;
            break;
        case "website":
            website = element.value;
            break;
        case "company":
            company = element.value;
            break;
        case "position":
            position = element.value;
            break;
        case "address":
            address = element.value;
            break;
        case "postalCode":
            postalCode = element.value;
            break;
        case "city":
            city = element.value;
            break;
    }

    var vCardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:' + lastName + ';' + firstName + ';;;',
        'FN:' + firstName + ' ' + lastName,
        'EMAIL;TYPE=INTERNET:' + email,
        'TEL;TYPE=WORK:' + phone,
        'TEL;TYPE=CELL:' + mobile,
        'URL:' + website,
        'ORG:' + company,
        'TITLE:' + position,
        'ADR;TYPE=WORK:;;' + address + ';;' + city + ';;' + postalCode + ';;',
        'END:VCARD'
    ].join('\n');

    qr.value = vCardData;
}

