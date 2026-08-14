const GAME = {
    title: "Cimrmanova poslední výprava",
    adminPassword: "medved",

    stations: [
        {
    id: 1,
    title: "Stránka deníku č. 1",
    question: "Jaké jediné slovo nejlépe vystihuje, co má člověk udělat, když má vyrazit na cestu?",
    type: "choice",
    options: [
        "Počkej",
        "Jdi",
        "Schovej se",
        "Vrať se"
    ],
    correct: 1,
    points: 15,
    story: `
📜 Stránka deníku č. 1

„Dnes jsem došel k zásadnímu objevu.
Většina lidí čeká, až se něco stane.
Přitom někdy stačí prostě vyrazit.

Zapsal jsem si proto první pravidlo každé výpravy:
Kdo chce něco najít, nesmí stát na místě.“

✒️ Poznámka na okraji:
JDI
`
},
{
    id: 2,
    title: "Stránka deníku č. 2",
    question: "Od jakého ptáka, který podle pověsti nosí děti, má cesta pokračovat?",
    type: "choice",
    options: [
        "Od havrana",
        "Od čápa",
        "Od sovy",
        "Od datla"
    ],
    correct: 1,
    points: 10,
    story: `
📜 Stránka deníku č. 2

„Dlouho jsem zkoumal čápa.
Je to zvláštní tvor: stojí na jedné noze,
přesto se tváří, jako by měl všechno pod kontrolou.

Lidé mu navíc připisují doručování dětí.
Pošta by mu mohla závidět.“

✒️ Poznámka na okraji:
OD ČÁPA
`
},
{
    id: 3,
    title: "Stránka deníku č. 3",
    question: "Jaké slovo se používá, když určujeme, kudy se má někdo vydat?",
    type: "choice",
    options: [
        "Pozpátku",
        "Směrem",
        "Náhodou",
        "Kolem"
    ],
    correct: 1,
    points: 10,
    story: `
📜 Stránka deníku č. 3

„Sestrojil jsem kompas, který ukazoval vždy tam,
kam jsem chtěl jít.

Bohužel jsem pokaždé chtěl jinam.
Přístroj tedy fungoval dokonale,
jen nebyl příliš užitečný.“

✒️ Poznámka na okraji:
SMĚREM
`
},
{
    id: 4,
    title: "Stránka deníku č. 4",
    question: "Na kterou známou horu s ikonickou stavbou na vrcholu je odsud vidět?",
    type: "choice",
    options: [
        "Sněžku",
        "Říp",
        "Ještěd",
        "Praděd"
    ],
    correct: 2,
    points: 15,
    story: `
📜 Stránka deníku č. 4

„Pokusil jsem se postavit vlastní horu.
Po týdnu práce jsem měl pouze větší krtinec.

Rozhodl jsem se proto využívat hory již hotové.
Jedna z nich je pro orientaci zvlášť vhodná,
protože ji člověk pozná už z dálky.“

✒️ Poznámka na okraji:
NA JEŠTĚD
`
},
{
    id: 5,
    title: "Stránka deníku č. 5",
    question: "Doplň větu: „Pokračuj, ________ k cíli.“",
    type: "choice",
    options: [
        "až dorazíš",
        "dokud neprší",
        "pak si odpočiň",
        "pokud se nebojíš"
    ],
    correct: 0,
    points: 10,
    story: `
📜 Stránka deníku č. 5

„Zjistil jsem, že nejrychlejší způsob,
jak někam dorazit,
je přestat bloudit.

Tento objev byl mezi turisty přijat rozpačitě,
zejména těmi, kteří už několik hodin bloudili.“

✒️ Poznámka na okraji:
AŽ DORAZÍŠ
`
},
        {
    id: 6,
    title: "Stránka deníku č. 6",
    question: "Ke kterému závodníkovi je na konci soutěže upřena největší pozornost?",
    type: "choice",
    options: [
        "K poslednímu",
        "K prostřednímu",
        "K prvnímu",
        "Ke druhému"
    ],
    correct: 2,
    points: 10,
    story: `
📜 Stránka deníku č. 6

„Rozhodl jsem se očíslovat všechny důležité objekty.
Problém nastal hned na začátku.

Nikdo si totiž nebyl jistý,
který z nich je vlastně první.“

✒️ Poznámka na okraji:
K PRVNÍMU
`
},
{
    id: 7,
    title: "Stránka deníku č. 7",
    question: "Jak se říká zařízení, kde lidé bydlí nedobrovolně, mají pevný režim a nemohou jen tak odejít?",
    type: "choice",
    options: [
        "Internát",
        "Vězení",
        "Hotel",
        "Nemocnice"
    ],
    correct: 1,
    points: 15,
    story: `
📜 Stránka deníku č. 7

„Dnes jsem navštívil zařízení,
kde lidé dostávají zdarma jídlo i ubytování.
Přesto se všichni snaží co nejrychleji odejít.

Můj ekonomický experiment tedy neuspěl.“

✒️ Poznámka na okraji:
VĚZENÍ
`
},
{
    id: 8,
    title: "Stránka deníku č. 8",
    question: "Jak byste z angličtiny přeložili výraz there?",
    type: "choice",
    options: [
        "Tam",
        "Sem",
        "Nikde",
        "Vedle"
    ],
    correct: 0,
    points: 10,
    story: `
📜 Stránka deníku č. 8

„Když jsem se ztratil,
všichni mi říkali:
‚Je to tam.‘

Nikdo ale nedokázal vysvětlit,
kde to tam vlastně je.“

✒️ Poznámka na okraji:
TAM
`
},
{
    id: 9,
    title: "Stránka deníku č. 9",
    question: "Jdu na sever, jdu na jih, i když pořád rovně. Co musím udělat pro to, abych si to zopakoval?",
    type: "choice",
    options: [
        "Přeskoč",
        "Utíkej od",
        "Se otoč o",
        "Přikrč se"
    ],
    correct: 2,
    points: 10,
    story: `
📜 Stránka deníku č. 9

„Zjistil jsem,
že nejlepší způsob,
jak změnit výhled,
je změnit směr, kterým se dívám.“

✒️ Poznámka na okraji:
SE OTOČ O
`
},
{
    id: 10,
    title: "Stránka deníku č. 10",
    question: "Kolik stupňů má otočení přesně opačným směrem?",
    type: "choice",
    options: [
        "360",
        "90",
        "45",
        "180"
    ],
    correct: 3,
    points: 15,
    story: `
📜 Stránka deníku č. 10

„Jednou jsem se otočil o 360 stupňů.
Výsledek byl zklamáním.
Stál jsem přesně tam,
kde předtím.

Polovina otočky je mnohem praktičtější.“

✒️ Poznámka na okraji:
180
`
},
{
    id: 11,
    title: "Stránka deníku č. 11",
    question: "V jakých jednotkách se udává velikost úhlu?",
    type: "choice",
    options: [
        "Metrech",
        "Sekundách",
        "Stupních",
        "Kilogramech"
    ],
    correct: 2,
    points: 10,
    story: `
📜 Stránka deníku č. 11

„Teploměr i úhloměr používají stejné slovo.
Každý však měří něco úplně jiného.

To považuji za zbytečné matení veřejnosti.“

✒️ Poznámka na okraji:
STUPŇŮ
`
},
{
    id: 12,
    title: "Stránka deníku č. 12",
    question: "Které slovní spojení znamená, že nemáš skončit, ale jít dál?",
    type: "choice",
    options: [
        "A pokračuj",
        "Vrať se",
        "Počkej",
        "Sedni si"
    ],
    correct: 0,
    points: 10,
    story: `
📜 Stránka deníku č. 12

„Na mapě jsem našel slepou cestu.
Šel jsem po ní dál
a po chvíli už slepá nebyla.

Mapy jsou někdy zbytečně pesimistické.“

✒️ Poznámka na okraji:
A POKRAČUJ
`
},
{
    id: 13,
    title: "Stránka deníku č. 13",
    question: "Jakým směrem jde člověk, když stoupá do kopce?",
    type: "choice",
    options: [
        "Dolů",
        "Vpravo",
        "Vzhůru",
        "Pozpátku"
    ],
    correct: 2,
    points: 10,
    story: `
📜 Stránka deníku č. 13

„Zjistil jsem,
že cesta z kopce bývá příjemnější.
Jen málokdy vede tam,
kam člověk potřebuje.“

✒️ Poznámka na okraji:
VZHŮRU
`
},
{
    id: 14,
    title: "Stránka deníku č. 14",
    question: "Jak se nazývá schovaná cennost, kterou lidé hledají?",
    type: "choice",
    options: [
        "Poklad",
        "Suvenýr",
        "Mapa",
        "Batoh"
    ],
    correct: 0,
    points: 10,
    story: `
📜 Stránka deníku č. 14

„Nejbezpečnější cennost je ta,
o které nikdo neví.

Druhá nejbezpečnější je ta,
kterou všichni hledají
na špatném místě.“

✒️ Poznámka na okraji:
POKLAD
`
},
{
    id: 15,
    title: "Stránka deníku č. 15",
    question: "Jakým rozkazovacím slovesem někomu řekneš, aby něco našel?",
    type: "choice",
    options: [
        "Počkej",
        "Hledej",
        "Utíkej",
        "Vrať se"
    ],
    correct: 1,
    points: 10,
    story: `
📜 Stránka deníku č. 15

„Dnes jsem učinil další zásadní objev.
Kdo nehledá,
většinou nic nenajde.

Výjimkou jsou věci,
o které zakopne.“

✒️ Poznámka na okraji:
HLEDEJ
`
},
        {
    id: 16,
    title: "Stránka deníku č. 16",
    question: "Kde začíná strom? (Přesněji řečeno – jak se říká jeho spodní části u země?)",
    type: "choice",
    options: [
        "U kořenů",
        "U paty",
        "U kmene",
        "U pařezu"
    ],
    correct: 1,
    points: 15,
    story: `
📜 Stránka deníku č. 16

„Boty pro stromy se nikdy neujaly.
Výrobci namítali,
že strom stejně celý život stojí na jednom místě.

Přesto jsem zjistil,
že i strom má svoji patu,
jen se do ní nevejde ponožka.“

✒️ Poznámka na okraji:
U PATY
`
},
{
    id: 17,
    title: "Stránka deníku č. 17",
    question: "Jak se říká tomu, kdo něco hlídá?",
    type: "choice",
    options: [
        "Průvodce",
        "Voják",
        "Strážce",
        "Správce"
    ],
    correct: 2,
    points: 10,
    story: `
📜 Stránka deníku č. 17

„Každý poklad potřebuje svého ochránce.
Nejlepší je takový,
který nikdy neusne,
nikam neodejde
a nechce výplatu.

Takového člověka jsem nenašel.
Musel jsem si vystačit s něčím jiným.“

✒️ Poznámka na okraji:
STRÁŽCE
`
},
{
    id: 18,
    title: "Stránka deníku č. 18",
    question: "Jak se nazývá místo, kde se setkává pevnina s vodou?",
    type: "choice",
    options: [
        "Moře",
        "Hlubina",
        "Plovárna",
        "Pobřeží"
    ],
    correct: 3,
    points: 10,
    story: `
📜 Stránka deníku č. 18

„Moře je zvláštní vynález přírody.
Vypadá nekonečně,
ale nakonec stejně někde skončí.

Právě tam začíná země.
A lidé tomu dali jméno.“

✒️ Poznámka na okraji:
POBŘEŽÍ
`
},
{
    id: 19,
    title: "Stránka deníku č. 19",
    question: "Kde se právě nacházíš?",
    type: "choice",
    options: [
        "V prdeli",
        "Ve snu",
        "V místě",
        "Ve vodě"
    ],
    correct: 2,
    points: 10,
    story: `
📜 Stránka deníku č. 19

„Při hledání pokladů jsem zjistil,
že slovo ‚někde‘
je naprosto k ničemu.

Poklad totiž nikdy není někde.
Je vždy přesně tam,
kde má být.“

✒️ Poznámka na okraji:
V MÍSTĚ
`
},
{
    id: 20,
    title: "Poslední stránka deníku",
    question: "Jak se jmenuje zařízení na střeše, které odvádí úder blesku bezpečně do země?",
    type: "choice",
    options: [
        "Bleskosvod",
        "Anténa",
        "Komín",
        "Okap"
    ],
    correct: 0,
    points: 10,
    story: `
📜 Poslední nalezená stránka deníku Járy Cimrmana

„Pokud čteš tyto řádky,
znamená to,
že ses dostal až na konec mé poslední výpravy.

Celý život jsem hledal vynález,
který dokáže změnit svět.

Nakonec jsem zjistil,
že největším vynálezem není žádný složitý stroj.

Je to ..........

Dokáže totiž změnit to,
co je zdánlivě dané.

✒️ Poslední poznámka na okraji:
BLESKOSVODU
`
},
    ]
};