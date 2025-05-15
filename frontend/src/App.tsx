import { AddGameForm } from "./components/AddGameForm";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Backlog Gamer</h1>
      <AddGameForm />
      {/* …lista de juegos, calendario, etc. */}
    </div>
  );
}

export default App;
