"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Card, Grid, Search} from "./components/Index";
import {countriesApi} from "./services";
import {Country} from "./types/Country";
import {formatNumber} from "./utils";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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

  const filteredCountries = sortedCountry.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-8">
        <Search
          count={filteredCountries.length}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <Grid>
        {filteredCountries.map(
          ({cca3, flags, name, capital, region, population}, index) => {
            const {svg: flag} = flags ?? "";
            const {common: countryName} = name ?? {};
            const capitalName = capital?.[0] ?? "";
            const populationFormated = formatNumber(population);
            return (
              <Link href={`/country/${cca3}`} key={cca3}>
                <Card
                  index={index}
                  flag={flag}
                  name={countryName}
                  capital={capitalName}
                  region={region}
                  population={populationFormated}
                />
              </Link>
            );
          }
        )}
      </Grid>
    </>
  );
}
