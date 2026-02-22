// Dit simuleert de data die uit het CMS van de verhuurder komt.
const defaultAppData = {
    "guest": {
        "name": "Arno en Kitty",
        "checkIn": "2026-02-22",
        "checkOut": "2026-02-25"
    },
    "property": {
        "name": "Veluwe droom chalet?",
        "headerImage": "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop",
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
            "title": "Inchecken & Uitchecken",
            "desc": "Inchecken na 15:00. Uitchecken voor 10:00. De sleutel mag dan weer in het kastje."
        },
        {
            "title": "Afvalscheiding",
            "desc": "Groenbak achter het schuurtje. Papier in de blauwe bak. Restafval in de grijze bak."
        },
        {
            "title": "Hottub",
            "desc": "Gebruik op eigen risico. Laat het deksel er altijd op na gebruik ivm warmteverlies."
        },
        {
            "title": "Feestjes & Geluid",
            "desc": "Geen feesten. Vanaf 22:00 graag stilte om van de natuur te genieten."
        }
    ],
    "videos": [
        {
            "title": "vakantiehuisje",
            "thumb": "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop",
            "url": "https://www.youtube.com/watch?v=S1WnqtMAeS4"
        }
    ],
    "restaurants": [
        {
            "name": "Pannenkoekenboerderij De Boswachter",
            "desc": "Heerlijk voor de kinderen. 5 minuten fietsen.",
            "url": "#"
        },
        {
            "name": "Bistro 't Groene Woud",
            "desc": "Iets luxer dineren. Reserveren aangeraden.",
            "url": "#"
        }
    ]
};

// De actieve appData. We kijken of de host via admin.html iets in de browser (localStorage) heeft opgeslagen.
let appData = defaultAppData;
if (localStorage.getItem('greatStayData')) {
    appData = JSON.parse(localStorage.getItem('greatStayData'));
}
