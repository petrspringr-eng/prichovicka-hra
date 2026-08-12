const GAME = {
    title: "Cimrmanova poslední výprava",
    adminPassword: "medved",

    stations: [
        {
            id: 1,
            title: "Poslední deník Járy Cimrmana",
            question: "Jak se jmenuje rozhledna stojící vedle Muzea Járy Cimrmana v Příchovicích?",
            type: "choice",
            options: ["Štěpánka", "Maják", "Královka", "Smrk"],
            correct: 1,
            points: 10,
            story: `
📜 Stránka deníku č. 1

„Dnes jsem konečně nalezl místo,
kde bude můj poslední vynález
v bezpečí.

Lidé chodí kolem,
ale nikdo se nedívá správným směrem.“
`
        },
        {
            id: 2,
            title: "Stanoviště 2",
            question: "Který strom je jehličnan?",
            type: "choice",
            options: ["Dub", "Buk", "Smrk", "Javor"],
            correct: 2,
            points: 10,
            story: "DUB"
        },
        {
            id: 3,
            title: "Stanoviště 3",
            question: "Kolik minut má jedna hodina?",
            type: "text",
            answer: "60",
            points: 10,
            story: "U"
        },
        {
            id: 4,
            title: "Stanoviště 4",
            question: "Najděte něco kulatého v přírodě.",
            type: "task",
            points: 15,
            story: "CESTY"
        },
        {
            id: 5,
            title: "Stanoviště 5",
            question: "Kolik metrů je jeden kilometr?",
            type: "text",
            answer: "1000",
            points: 10,
            story: "POD"
        },
        {
            id: 6,
            title: "Stanoviště 6",
            question: "Který směr je na běžné mapě nahoře?",
            type: "choice",
            options: ["Jih", "Sever", "Východ", "Západ"],
            correct: 1,
            points: 10,
            story: "VELKÝM"
        },
        {
            id: 7,
            title: "Stanoviště 7",
            question: "Vyfoťte celý tým.",
            type: "task",
            points: 15,
            story: "STROMEM"
        },
        {
            id: 8,
            title: "Stanoviště 8",
            question: "Kolik je 7 × 8?",
            type: "text",
            answer: "56",
            points: 10,
            story: "HLEDEJTE"
        },
        {
            id: 9,
            title: "Stanoviště 9",
            question: "Najděte jiný tým a udělejte si společnou fotku.",
            type: "task",
            points: 25,
            story: "ZNAČKU"
        },
        {
            id: 10,
            title: "Stanoviště 10",
            question: "Co ukazuje světové strany?",
            type: "choice",
            options: ["Teploměr", "Kompas", "Stopky", "Metr"],
            correct: 1,
            points: 10,
            story: "TŘI"
        },
        {
            id: 11,
            title: "Stanoviště 11",
            question: "Kolik dní má týden?",
            type: "text",
            answer: "7",
            points: 10,
            story: "KROKY"
        },
        {
            id: 12,
            title: "Stanoviště 12",
            question: "Postavte z přírodních materiálů šipku.",
            type: "task",
            points: 15,
            story: "VLEVO"
        },
        {
            id: 13,
            title: "Stanoviště 13",
            question: "Co je vrstevnice?",
            type: "choice",
            options: [
                "Silnice",
                "Čára stejné nadmořské výšky",
                "Řeka",
                "Hranice lesa"
            ],
            correct: 1,
            points: 20,
            story: "OD"
        },
        {
            id: 14,
            title: "Stanoviště 14",
            question: "Kolik sekund má minuta?",
            type: "text",
            answer: "60",
            points: 10,
            story: "LAVIČKY"
        },
        {
            id: 15,
            title: "Stanoviště 15",
            question: "Najděte něco přírodního ve tvaru písmene Y.",
            type: "task",
            points: 15,
            story: "JE"
        },
        {
            id: 16,
            title: "Stanoviště 16",
            question: "Která barva turistické značky často označuje hlavní trasy?",
            type: "choice",
            options: ["Červená", "Fialová", "Oranžová", "Černá"],
            correct: 0,
            points: 20,
            story: "CÍL"
        },
        {
            id: 17,
            title: "Stanoviště 17",
            question: "Kolik kilometrů je 5000 metrů?",
            type: "text",
            answer: "5",
            points: 10,
            story: "BONUS 1"
        },
        {
            id: 18,
            title: "Stanoviště 18",
            question: "Vymyslete desetisekundový týmový pokřik.",
            type: "task",
            points: 20,
            story: "BONUS 2"
        },
        {
            id: 19,
            title: "Stanoviště 19",
            question: "Co je bezpečnější při bouřce?",
            type: "choice",
            options: [
                "Stát pod osamělým stromem",
                "Najít bezpečný úkryt",
                "Lehnout si do potoka",
                "Běžet na kopec"
            ],
            correct: 1,
            points: 20,
            story: "BONUS 3"
        },
        {
            id: 20,
            title: "Stanoviště 20",
            question: "Najděte jiný tým a zjistěte jméno nejstaršího člena.",
            type: "task",
            points: 25,
            story: "BONUS 4"
        }
    ]
};