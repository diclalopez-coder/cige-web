export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">CIGE</h1>
      <div className="space-x-6 hidden md:flex">
        <a href="#inicio" className="hover:text-gray-300">Inicio</a>
        <a href="#congreso" className="hover:text-gray-300">Congreso</a>
        <a href="#contacto" className="hover:text-gray-300">Contacto</a>
      </div>
    </nav>
  );
}
