type SelectProps = {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
};

const Search = ({options, selected, setSelected}: SelectProps) => {
  const SelectPptions = ["All regions", ...options];

  return (
    <div className="w-1/3">
      <select
        value={selected}
        onChange={({target}) => setSelected(target.value)}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
      >
        {SelectPptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
