import Image from "next/image";

type CardProps = {
  index: number;
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: string;
};

const Card = ({index, name, flag, capital, region, population}: CardProps) => {
  return (
    <div className="h-full overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl hover:translate-y-1 transform transition-all duration-300 ease-in-out">
      <div className="aspect-video w-full">
        <Image
          alt={`Flag of ${name}`}
          src={flag}
          className="w-full h-full object-cover"
          width={500}
          height={300}
          priority={index < 12}
        />
      </div>
      <div className="p-6 text-sm text-gray-600">
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Capital </span>
            {capital}{" "}
          </div>
          <div>
            <span className="font-semibold">Region </span>
            {region}{" "}
          </div>
          <div>
            <span className="font-semibold">Population </span>
            {population}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
