import React, { useState } from "react";
import { format } from "date-fns";

const TarefasFormulario = ({ onAdicionarTarefa }) => {
  const [textoTarefa, setTextoTarefa] = useState("");
  const [dataTarefa, setDataTarefa] = useState(undefined);

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (textoTarefa.trim() && dataTarefa) {
      const novaTarefa = {
        id: Date.now(),
        titulo: textoTarefa,
        data: dataTarefa,
        concluida: false,
      };

      onAdicionarTarefa(novaTarefa);
      setTextoTarefa("");
      setDataTarefa(undefined);
    }
  };

  return (
    <form onSubmit={adicionarTarefa}>
      <div className="mb-3">
        <label className="form-label">Tarefa</label>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={textoTarefa}
          onChange={(e) => setTextoTarefa(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data de conclusão</label>
        <input
          type="date"
          value={dataTarefa ? format(dataTarefa, "yyyy-MM-dd") : ""}
          onChange={(e) =>
            setDataTarefa(e.target.value ? new Date(e.target.value) : undefined)
          }
          className="form-control"
        />
      </div>

      <button
        type="submit"
        disabled={!textoTarefa.trim() || !dataTarefa}
        className="btn btn-primary"
      >
        Adicionar Tarefa
      </button>
    </form>
  );
};

export default TarefasFormulario;