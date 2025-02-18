import {Card, Footer, Grid, Header} from "./components/Index";

export default function Home() {
  const countries = [
    {
      id: 1,
      country: "Brasil",
      capital: "Brasília",
      region: "América do Sul",
      population: "214M",
    },
    {
      id: 2,
      country: "Estados Unidos",
      capital: "Washington, D.C.",
      region: "América do Norte",
      population: "331M",
    },
    {
      id: 3,
      country: "França",
      capital: "Paris",
      region: "Europa",
      population: "67M",
    },
    {
      id: 4,
      country: "Japão",
      capital: "Tóquio",
      region: "Ásia",
      population: "125000M",
    },
    {
      id: 5,
      country: "África do Sul",
      capital: "Pretória",
      region: "África",
      population: "600M",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <Grid>
          {countries.map(({id, country, capital, region, population}) => (
            <Card
              key={id}
              country={country}
              capital={capital}
              region={region}
              population={population}
            />
          ))}
        </Grid>
      </main>
      <Footer />
    </>
  );
}
