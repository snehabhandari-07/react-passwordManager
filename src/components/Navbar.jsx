const Navbar = () => {
  return (
    <nav className="bg-[#00A3FF]/10 backdrop-blur-sm shadow-sm flex items-center justify-between px-3 py-4">
      <div className="logo font-bold">PassMan</div>
      <ul>
        <li className="space-x-8">
          <a className="hover:font-semibold cursor-pointer" href="/">Home</a>
          <a className="hover:font-semibold cursor-pointer" href="/">About</a>
          <a className="hover:font-semibold cursor-pointer" href="/">Contacts</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
