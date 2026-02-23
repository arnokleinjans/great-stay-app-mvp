// Dit simuleert de data die uit het CMS van de verhuurder komt.
const appData = {
    "accessCode": "VELUWE2026",
    "guest": {
        "name": "Arno en Kitty",
        "checkIn": "2026-02-22",
        "checkOut": "2026-02-25"
    },
    "property": {
        "name": "Veluwe Droom Chalet",
        "headerImage": "images/Boshuisje.jpg",
        "wifi": {
            "network": "DeRust_Gasten",
            "password": "BomenZijnFijn2026"
        },
        "host": {
            "name": "Arno",
            "phone": "+31612345678",
            "avatar": "https://ui-avatars.com/api/?name=Arno&background=4A5D23&color=fff&rounded=true"
        }
    },
    "rules": [
        {
            "title": "Afvalscheiding",
            "desc": "Groenbak achter het schuurtje. Papier in de blauwe bak. Restafval in de grijze bak."
        },
        {
            "title": "Hottubs",
            "desc": "Gebruik op eigen risico. Laat het deksel er altijd op na gebruik ivm warmteverlies."
        },
        {
            "title": "Test",
            "desc": "Test"
        }
    ],
    "videos": [
        {
            "title": "vakantiehuisje",
            "thumb": "images/Boshuisje.jpg",
            "url": "https://www.youtube.com/watch?v=S1WnqtMAeS4"
        }
    ],
    "restaurants": [
        {
            "name": "Pannenkoekenboerderij De Boswachter",
            "desc": "Heerlijk voor de kinderen. 5 minuten fietsen.",
            "url": "https://www.nu.nl/"
        },
        {
            "name": "Bar het suffertje",
            "desc": "testbar",
            "url": "https://www.nu.nl/"
        }
    ],
    "insights": [
        {
            "icon": "wifi.svg",
            "title": "Wifi",
            "subtitle": "test",
            "action": "wifi-modal"
        },
        {
            "icon": "clock.svg",
            "title": "In- en uitchecken",
            "subtitle": "Inchecken kan vanaf 15.00 uur en gaat contactloos via een sleutelkastje. Het uitchecken is uiterlijk om 10.30 uur. ",
            "action": "none"
        },
        {
            "icon": "key.svg",
            "title": "Sleutelkastje",
            "subtitle": "Het sleutelkastje kun je vinden....",
            "action": "none"
        }
    ]
};
