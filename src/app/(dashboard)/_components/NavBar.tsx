import { ModeToggle } from "@/components/mode-toggle";

const NavBar = () => {
  return (
    <div className="w-full flex border-white justify-between px-12 my-4">
      {/* LEFT */}
      <div>Left</div>
      {/* RIGHT  */}
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
