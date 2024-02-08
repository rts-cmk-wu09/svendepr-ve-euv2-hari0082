### Dokumentationsrapport

## Min tech stack

# React og React DOM

Hvorfor React?

React giver en effektiv måde at opbygge brugeroverflader på.
Dets komponentbaserede arkitektur forbedrer genanvendelighed og vedligeholdelse af kode.

# React Icons

Hvorfor React Icons?

React Icons tilbyder et stort udvalg af ikoner som React-komponenter, hvilket forenkler ikonintegrationen.
Det forbedrer visuel appel med let tilpasselige ikoner.

# React Router

Hvorfor React Router?

React Router DOM muliggør problemfri klient-side navigation og forbedrer brugerinteraktionen.
Deklarativ routing forenkler håndteringen af forskellige visninger i applikationen.

# Tailwind CSS

Hvorfor Tailwind CSS?

Tailwind CSS er et utility-first CSS-framework, der fremmer hurtig udvikling med foruddefinerede utility-klasser.
Det tilbyder en skalerbar og vedligeholdelsesvenlig tilgang til styling, der forbedrer udviklerens effektivitet.

## Dybdegående Kodeanalyse

# Hvorfor denne kode?

Jeg vælger denne kode fordi, brugeren kan søge på hold, træner, ugedage og beskrivelse i input feltet og det er meget brugervenligt. Det giver en god oplevelse og formindsker tid på siden for brugen. Det spændende at der kan fetche data fra mere end et endpoint - Data fra endpointsene filteres med funktioner filterClasses og filterTrainers alt efter brugers indput.

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft, HiMenuAlt3 } from "react-icons/hi";
import BurgerMenu from "../Components/BurgerMenu";
import Navigation from "../Components/Navigation";
import Loading from "../Components/Loading";

const Search = () => {
const [isNavigationOpen, setIsNavigationOpen] = useState(false);
const [popularClasses, setPopularClasses] = useState([]);
const [popularTrainers, setPopularTrainers] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

const handleToggleNavigation = () => {
setIsNavigationOpen((prev) => !prev);
};

useEffect(() => {
setIsLoading(true);

    fetch("http://localhost:4000/api/v1/classes")
      .then((response) => response.json())
      .then((data) => setPopularClasses(data))
      .catch((error) => console.error("Error fetching popular classes:", error))
      .finally(() => setIsLoading(false));

    fetch("http://localhost:4000/api/v1/trainers")
      .then((response) => response.json())
      .then((data) => setPopularTrainers(data.slice(0, 4)))
      .catch((error) =>
        console.error("Error fetching popular trainers:", error)
      )
      .finally(() => setIsLoading(false));

}, []);

const filteredClasses = popularClasses.filter(
(classItem) =>
(classItem.className &&
classItem.className.toLowerCase().includes(searchTerm.toLowerCase())) ||
(classItem.classDay &&
classItem.classDay.toLowerCase().includes(searchTerm.toLowerCase())) ||
(classItem.classDescription &&
classItem.classDescription
.toLowerCase()
.includes(searchTerm.toLowerCase())) ||
(classItem.trainer.trainerName &&
classItem.trainer.trainerName
.toLowerCase()
.includes(searchTerm.toLowerCase()))
);

const filteredTrainers = popularTrainers.filter((trainer) =>
trainer.trainerName.toLowerCase().includes(searchTerm.toLowerCase())
);

return (

<div className="m-4">
<div className="flex items-center justify-between p-2">
<Link to="/home">
<HiArrowNarrowLeft className="text-2xl cursor-pointer text-gray-500" />
</Link>
<h1 className="text-2xl">Search</h1>
{isNavigationOpen && <Navigation onClose={handleToggleNavigation} />}
<BurgerMenu />
</div>
<div>
<input
type="text"
className="border border-gray-300 h-[50px] p-6 mt-6 rounded-full w-full"
placeholder="Search"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
{isLoading && <Loading />}
{filteredClasses.length === 0 && filteredTrainers.length === 0 && (
<p className="text-yellow-400 mt-4 text-center">
Your search did not give any results. Try to search for something
else.
</p>
)}
<h2 className="text-xl font-bold mt-6">Popular Classes</h2>
{filteredClasses.length > 0 && (
<div className="flex overflow-x-auto mt-2 no-scrollbar">
{filteredClasses.map((classItem) => (
<Link
key={classItem.id}
to={`/class/${classItem.id}`}
className="m-2 relative" >
<img
                src={classItem.asset.url}
                alt={classItem.className}
                className="min-w-[129px] min-h-[144px] rounded-xl object-cover"
              />
<p className="absolute bottom-0 left-0 font-bold text-xs bg-yellow-400 w-[129px] h-[48px] p-2 rounded-tr-[30px] rounded-bl-[10px]">
{classItem.className}
</p>
</Link>
))}
</div>
)}
<h2 className="text-xl font-bold mt-6">Popular Trainers</h2>
{filteredTrainers.length > 0 && (
<div className="flex flex-col mt-2">
{filteredTrainers.map((trainer) => (
<Link
key={trainer.id}
to={`/class/${trainer.id}`}
className="m-2 flex items-center" >
<img
                src={trainer.asset.url}
                alt={trainer.trainerName}
                className="w-[88px] h-[88px] rounded-xl object-cover"
              />
<p className="ml-2">{trainer.trainerName}</p>
</Link>
))}
</div>
)}
</div>
);
};

export default Search;

---

# State

Bruger useState til at håndtere tilstanden for Navigation, Popular Classes,Popular Trainers, Loading, og Search Term.

# Toggle Navigation:

handleToggleNavigation håndterer åbning/lukning af navigationsmenuen.

- Bruger useEffect til at hente populære klasser og trænere ved komponentmontering.

# Filtrering af Klasser og Trænere:

Anvender filter-metoden til at filtrere klasser og trænere baseret på søgetermen.

# Visning af Loader:

Viser en loader, mens data indlæses, ved at betinge rendring baseret på isLoading-tilstanden.

# Dynamisk Visning af Popular Classes og Trainers:

Dynamisk mapper gennem filtrerede klasser og trænere og genererer links eller billeder med tilhørende information.

# Responsivt Design:

Bruger Tailwind CSS-klasser til responsivt design og styling.

# Forbedringer og Refleksion:

- Overvej at tilføje yderligere fejlhåndtering og brugerfeedback ved mislykkede API kaldet.
- Overvejer muligheden for at optimere billedstørrelser for at forbedre sideindlæsningstid.
- Overvej at organisere komponentstrukturen ved at opdele den i mindre komponenter.

## Ændringer jeg har fortaget mig fra design.

- Jeg har tilføjet en log ind i menuen, som veksler mellem "Log in" og "Log out" så brugeren kan se om de er logget ind eller ej. Hvis brugeren er logget ind, så kan de logge ud igen.

- Jeg har tilføjet en tilbage knap på login siden, hvis nu brugeren ikke ønsker at logge ind alligevel.

# Valgfri opgave begrundelse:

Jeg har valgt at gå med Automatiseret Deployment, og har ikke kunne lykkes med at deploy grundet min mappestruktur eller andet. Hverken netlify eller vercel kan depoy min side og giver mig en error. MEN jeg har den deployet manually.
