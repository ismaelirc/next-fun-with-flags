type SelectProps = {
  options: string[];
};

const Search = ({options}: SelectProps) => {
  return (
    <div className="w-1/3">
      <select className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
