import React from "react";
import { format } from "date-fns";
import { Trash2, Star } from "lucide-react";

const ListaComTarefas = ({ tarefas, onRemoverTarefa, onConcluirTarefa, onMudarPrioridadeTarefa }) => {
  if (tarefas.length === 0) {
    return <p className="text-center text-muted">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <div className="list-group">
      {tarefas.map((tarefa) => (
        <div
          key={tarefa.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            tarefa.concluida ? "list-group-item-success" : ""
          } ${tarefa.prioritaria ? "bg-warning" : ""}`}
        >
          <div className="d-flex align-items-center">
            <div className="form-check">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => onConcluirTarefa(tarefa.id)}
                className="form-check-input"
                id={`tarefa-${tarefa.id}`}
              />
              <label
                htmlFor={`tarefa-${tarefa.id}`}
                className="form-check-label ms-2"
                style={{ textDecoration: tarefa.concluida ? "line-through" : "none" }}
              >
                {tarefa.titulo}
              </label>
            </div>
            <button
              type="button"
              className="btn btn-outline-warning btn-sm ms-3"
              onClick={() => onMudarPrioridadeTarefa(tarefa.id)}
            >
              <Star size={16} color={tarefa.prioritaria ? "white" : "gray"} />
            </button>
          </div>
          <div className="d-flex align-items-center">
            <small className="text-muted me-3">
              Data de conclusão: {format(new Date(tarefa.data), "dd/MM/yyyy")}
            </small>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onRemoverTarefa(tarefa.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaComTarefas;