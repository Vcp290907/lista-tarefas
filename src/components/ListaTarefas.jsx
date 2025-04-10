import { useState, useEffect } from "react";
import TarefasFormulario from "./TarefasFormulario";
import ListaComTarefas from "./ListaComTarefas";

const ListaTarefas = () => {

    // Estado para armazenar as tarefas

    const [tarefas, setTarefas] = useState(() => {
        const tarefasSalvas = localStorage.getItem("tarefas");
        if (tarefasSalvas) {  //Verifica se há tarefas salvas no localStorage
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

    // Efeito para salvar as tarefas no localStorage

    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    // Funções para adicionar tarefa

    const adicionarTarefa = (dataTarefa) => {
        const novaTarefa = {
            id: Date.now().toString(), //Id é para identificar a tarefa
            titulo: dataTarefa.titulo,
            concluida: false,
            data: dataTarefa.data,
            prioritaria: false,
        };
    
        setTarefas((tarefas) => [...tarefas, novaTarefa]);
    };

    //função para adicionar a estrelinha de prioridade

    const togglePrioridadeTarefa = (id) => {
        setTarefas((tarefas) =>
            tarefas.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, prioritaria: !tarefa.prioritaria } : tarefa
            )
        );
    };

    //Função para excluir a terefa

    const removerTarefa = (id) => {
        setTarefas((tarefas) => tarefas.filter((tarefa) => tarefa.id !== id));
    };

    //Função para marcar a tarefa como concluida

    const concluirTarefa = (id) => {
        setTarefas((tarefas) =>
            tarefas.map((tarefa) =>
                tarefa.id === id
                    ? { ...tarefa, concluida: !tarefa.concluida }
                    : tarefa
            )
        );
    };

    //Retorno para o que vai ter no HTML, chamo tambem os arquivos de Formulario e a Lista com as tarefas

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
                    onMudarPrioridadeTarefa={togglePrioridadeTarefa}
                />
            </div>
        </div>
    );
};

export default ListaTarefas;