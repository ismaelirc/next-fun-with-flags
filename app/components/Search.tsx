import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

type searchProps = {
  count: number;
  search: string;
  setSearch: (search: string) => void;
};

const Search = ({count, search, setSearch}: searchProps) => {
  return (
    <div className="w-1/3">
      <div className="relative">
        <input
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by country name..."
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon className="size-4" />
        </span>
      </div>
      <span className="text-sm pl-1 text-gray-600">
        Showing {count} {count === 1 ? "country" : "countries"}
      </span>
    </div>
  );
};

export default Search;
