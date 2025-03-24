"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Card, Grid, Loading, Search, Select} from "./components/Index";
import {countriesApi} from "./services";
import {Country} from "./types/Country";
import {formatNumber} from "./utils";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All regions");

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

  if (loading) return <Loading text="Loading..." />;
  if (error) return <div>{error}</div>;

  const regions = [
    "All regions",
    ...new Set(countries.map(({region}) => region)),
  ];

  const sortedCountry = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  const filteredCountries = sortedCountry.filter(({name, region}) => {
    const nameMatches = name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const regionMatches = selected === "All regions" || region === selected;
    return nameMatches && regionMatches;
  });

  return (
    <>
      <div className="mb-8 flex flex-col-reverse gap-4 md:flex-row justify-between">
        <Search
          count={filteredCountries.length}
          search={search}
          setSearch={setSearch}
        />
        <Select
          options={regions}
          selected={selected}
          setSelected={setSelected}
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
