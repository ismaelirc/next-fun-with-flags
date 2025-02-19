"use client";
import {useEffect, useState} from "react";
import {Card, Footer, Grid, Header} from "./components/Index";

type Country = {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  region: string;
  capital: string[];
  population: number;
};

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,population,flags"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError("Fail to fetch");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <Header />
      <main className="flex-1">
        <Grid>
          {countries.map(
            ({cca3, flags, name, capital, region, population}, index) => {
              const {svg: flag} = flags ?? "";
              const {common: countryName} = name ?? {};
              const capitalName = capital?.[0] ?? "";
              return (
                <Card
                  index={index}
                  key={cca3}
                  flag={flag}
                  name={countryName}
                  capital={capitalName}
                  region={region}
                  population={population}
                />
              );
            }
          )}
        </Grid>
      </main>
      <Footer />
    </>
  );
}
