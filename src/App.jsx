import './App.css'
import ListaTarefas from "./components/ListaTarefas";

const App = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ListaTarefas />
        </div>
      </div>
    </div>
  );
};

export default App;