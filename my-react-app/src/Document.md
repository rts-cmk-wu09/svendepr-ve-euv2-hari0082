# Dokumentationsrapport

## Tech stack

### React og React DOM

**Hvorfor React?**

- React giver en effektiv måde at opbygge brugeroverflader på.
- Dets komponentbaserede arkitektur forbedrer genanvendelighed og vedligeholdelse af kode.

### React Icons

**Hvorfor React Icons?**

- React Icons tilbyder et stort udvalg af ikoner som React-komponenter, hvilket forenkler ikonintegrationen.
- Det forbedrer visuel appel med let tilpasselige ikoner.

### React Router DOM

**Hvorfor React Router DOM?**

- React Router DOM muliggør problemfri klient-side navigation og forbedrer brugerinteraktionen.
- Deklarativ routing forenkler håndteringen af forskellige visninger i applikationen.

### React Scripts

**Hvorfor React Scripts?**

- React Scripts tilbyder essentielle scripts til at bygge og køre React-applikationer.
- Det giver et bekvemt udviklingsmiljø og optimerede produktionsbygger.

### Vite

**Hvorfor Vite?**

- Vite er en hurtig udviklingsserver og en bundler, der giver hurtig opstart og hot module replacement.
- Dets hastighed forbedrer udviklingsworkflowet med næsten øjeblikkelig feedback.

### Vite React Plugin

**Hvorfor Vite React Plugin?**

- Vite React Plugin optimerer React-applikationer i Vite-økosystemet.
- Det forbedrer byggeydelsen og giver en mere problemfri udviklingsoplevelse.

### Tailwind CSS

**Hvorfor Tailwind CSS?**

- Tailwind CSS er et utility-first CSS-framework, der fremmer hurtig udvikling med foruddefinerede utility-klasser.
- Det tilbyder en skalerbar og vedligeholdelsesvenlig tilgang til styling, der forbedrer udviklerens effektivitet.

## Ekstra:

**Bemærkning om github:**

GitHub betragtes ikke som en del af teknologistakken, da det er en ekstern platform, der bruges til versionsstyring og samarbejde.

---

## Dybdegående Kodeanalyse

import React from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";

const Navigation = ({ onClose }) => {
const handleLinkClick = () => {
onClose();
};

return (

<div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-50">
<HiX
        className="text-2xl absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      />
<ul className="list-none text-2xl font-medium">
<li className="mb-6">
<Link to="/home" onClick={handleLinkClick}>
Hjem
</Link>
</li>
<li className="mb-6">
<Link to="/search" onClick={handleLinkClick}>
Søg
</Link>
</li>
<li className="mb-6">
<Link to="/schedule" onClick={handleLinkClick}>
Min Tidsplan
</Link>
</li>
<li className="mb-6">
<button>Log ud</button>
</li>
</ul>
</div>
);
};

export default Navigation;

# Navigation:

Udnytter Link-komponenten fra react-router-dom til deklarativ navigation på klientens side.
Navigationslinks har en onClick-begivenhedshåndterer (handleLinkClick), der udløser funktionen onClose for at lukke menuen.

# Forbedret Brugeroplevelse:

Lukning af menuen (onClose) ved klik på link giver en glattere og mere intuitiv brugeroplevelse.
Bruger React Routers Link sikrer effektiv navigation på klientens side uden fuld sideindlæsning.

# Modulær Funktionalitet:

Funktionen handleLinkClick tilføjer et abstraktionslag, hvilket gør komponenten mere modulær og lettere at vedligeholde.
Hvert link har en konsistent struktur, hvilket bidrager til renere og mere læselig kode.

# Bevarelse af Stil og Struktur:

Bevarer stilen og strukturen fra den tidligere version og sikrer visuel konsistens.
Bruger Tailwind CSS-klasser til styling og fastholder den utility-first-tilgang.

# Logout-knap:

"Log ud"-knappen er...

## Ændringer jeg har fortaget mig.

- Jeg har tilføjet en log ind i menuen, som veksler mellem "Log in" og "Log out" så brugeren kan se om de er logget ind eller ej.

- Jeg har tilføjet en tilbage knap på login siden, hvis nu brugeren ikke ønsker at logge ind.
