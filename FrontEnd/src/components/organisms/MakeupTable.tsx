import "./MakeupTable.css";
import Button from "../atoms/Button/Button";
import type { Makeup } from "../../types/Makeup";

interface MakeupTableProps {
    makeups: Makeup[];
    onEdit: (makeup: Makeup) => void;
    onDelete: (id: number) => void;
}

function MakeupTable({
    makeups,
    onEdit,
    onDelete
}: MakeupTableProps) {

    return (
        <div className="table-container">

            <h2>Lista de Maquiagens</h2>

            {makeups.length === 0 ? (
                <p>Nenhuma maquiagem cadastrada.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Marca</th>
                            <th>Categoria</th>
                            <th>Cor</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {makeups.map((makeup) => (
                            <tr key={makeup.id}>
                                <td>{makeup.id}</td>
                                <td>{makeup.nome}</td>
                                <td>{makeup.marca}</td>
                                <td>{makeup.categoria}</td>
                                <td>{makeup.cor}</td>
                                <td>
                                    R$ {makeup.preco.toFixed(2)}
                                </td>
                                <td className="buttons">
                                    <Button
                                        text="Editar"
                                        onClick={() => onEdit(makeup)}
                                    />

                                    <Button
                                        text="Excluir"
                                        onClick={() => onDelete(makeup.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            )}

        </div>
    );
}

export default MakeupTable;