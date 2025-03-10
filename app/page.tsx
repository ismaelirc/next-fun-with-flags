"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Card, Grid} from "./components/Index";
import {countriesApi} from "./services";
import {Country} from "./types/Country";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getAll();
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }
      setCountries(response);
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const sortedCountry = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  return (
    <>
      <Grid>
        {sortedCountry.map(
          ({cca3, flags, name, capital, region, population}, index) => {
            const {svg: flag} = flags ?? "";
            const {common: countryName} = name ?? {};
            const capitalName = capital?.[0] ?? "";
            return (
              <Link href={`/country/${cca3}`} key={cca3}>
                <Card
                  index={index}
                  flag={flag}
                  name={countryName}
                  capital={capitalName}
                  region={region}
                  population={population}
                />
              </Link>
            );
          }
        )}
      </Grid>
    </>
  );
}
