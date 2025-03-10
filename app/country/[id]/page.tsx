"use client";
import Image from "next/image";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {countriesApi} from "../../services";
import {Country as countryProps} from "../../types/Country";

export default function Country() {
  const params = useParams();
  const [id, setId] = useState<string | null>(null);
  const [country, setCountry] = useState<countryProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (params?.id && params.id !== id) {
      setId(params.id as string);
    }
  }, [params, id]);

  useEffect(() => {
    const fetchCountry = async () => {
      const [response, error] = await countriesApi.getCountry(id);
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }
      setCountry(response);
    };
    if (id) {
      fetchCountry();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const {
    flags,
    name,
    capital,
    region,
    population,
    currencies,
    languages,
    tld,
    borders,
  } = country ?? {};

  const {svg: flag} = flags ?? "";
  const {common: countryName, official: officialName} = name ?? {};
  const capitalName = capital?.[0] ?? "";
  const languagesNames = Object.values(languages ?? {}).join(", ");
  const currenciesNames = Object.values(currencies ?? {})
    .map(({name, symbol}) => `${name} (${symbol})`)
    .join(", ");
  const [topLevelDomain] = tld ?? [];
  const bordersIds = borders ?? [];

  return (
    <>
      <div className="mb-8">
        <Link href="/">
          <button className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded">
            Back
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-4 gap-4">
        <div className="flex items-center md:max-w-[400px]">
          <Image
            alt={`Flag of ${name}`}
            src={flag}
            className="max-h-80 obj-cover rounded-lg"
            width={500}
            height={300}
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">
            {countryName} {id}
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Official name</span>{" "}
              {officialName}
            </div>
            <div>
              <span className="font-semibold">Capital</span> {capitalName}
            </div>
            <div>
              <span className="font-semibold">Region</span> {region}
            </div>
            <div>
              <span className="font-semibold">Population</span> {population}
            </div>
            <div>
              <span className="font-semibold">Languages</span> {languagesNames}
            </div>
            <div>
              <span className="font-semibold">Currencies</span>{" "}
              {currenciesNames}
            </div>
            <div>
              <span className="font-semibold">Top level domain</span>{" "}
              {topLevelDomain}
            </div>
            <div className="md:max-w-80">
              <span className="font-semibold">Borders</span>
              {bordersIds.length > 0
                ? bordersIds.map((border) => (
                    <Link key={border} href={`/country/${border}`}>
                      <button className="bg-gray-200 hover:bg-gray-300 text-xs mb-[6px] mr-[6px] px-[6px] py[1.5px] py- rounded">
                        {border}
                      </button>
                    </Link>
                  ))
                : "None"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
