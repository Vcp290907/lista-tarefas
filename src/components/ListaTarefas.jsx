import { useState, useEffect } from "react";
import TarefasFormulario from "./TarefasFormulario";
import ListaComTarefas from "./ListaComTarefas";

const ListaTarefas = () => {
    const [tarefas, setTarefas] = useState(() => {
        const tarefasSalvas = localStorage.getItem("tarefas");
        if (tarefasSalvas) {
            try {
                return JSON.parse(tarefasSalvas).map((tarefa) => ({
                    ...tarefa,
                    data: new Date(tarefa.data),
                }));
            } catch (error) {
                console.error("Erro ao carregar tarefas do localStorage:", error);
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    const adicionarTarefa = (dataTarefa) => {
        const novaTarefa = {
            id: Date.now().toString(),
            titulo: dataTarefa.titulo,
            concluida: false,
            data: dataTarefa.data,
            prioritaria: false,
        };
    
        setTarefas((tarefas) => [...tarefas, novaTarefa]);
    };

    const togglePrioridadeTarefa = (id) => {
        setTarefas((tarefas) =>
            tarefas.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, prioritaria: !tarefa.prioritaria } : tarefa
            )
        );
    };

    const removerTarefa = (id) => {
        setTarefas((tarefas) => tarefas.filter((tarefa) => tarefa.id !== id));
    };

    const concluirTarefa = (id) => {
        setTarefas((tarefas) =>
            tarefas.map((tarefa) =>
                tarefa.id === id
                    ? { ...tarefa, concluida: !tarefa.concluida }
                    : tarefa
            )
        );
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Gerenciar Tarefas</h2>
            </div>
            <div className="card-body">
                <TarefasFormulario onAdicionarTarefa={adicionarTarefa} />
            </div>
            <div className="card-footer">
                <h3 className="h5">Suas tarefas</h3>
                <ListaComTarefas
                    tarefas={tarefas}
                    onRemoverTarefa={removerTarefa}
                    onConcluirTarefa={concluirTarefa}
                    onTogglePrioridadeTarefa={togglePrioridadeTarefa}
                />
            </div>
        </div>
    );
};

export default ListaTarefas;