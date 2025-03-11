import moon from "../../assets/moon.png";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  return (
    <div
      className={`flex w-full h-[80px] justify-between items-center px-10 shadow-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="font-[800] text-[24px]">Where in the world?</h1>
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleDarkMode}
      >
        <img className="w-[20px] h-[20px]" src={moon} alt="Dark Mode Icon" />
        <p className="font-[600] text-[16px] ml-2">Dark Mode</p>
      </div>
    </div>
  );
}

export default Header;
