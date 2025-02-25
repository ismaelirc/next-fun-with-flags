
export type Country = {
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
    currencies?: Record<string, { name: string, symbol: string }>;
    languages?: Record<string, string>
    tld?: string[];
    borders: string[];
};