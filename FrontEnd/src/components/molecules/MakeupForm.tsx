import { useState, useEffect } from "react";
import Input from "../atoms/Input/Input";
import Button from "../atoms/Button/Button";
import type { Makeup } from "../../types/Makeup";
import "./MakeupForm.css";

interface MakeupFormProps {
    onSave: (makeup: Omit<Makeup, "id">) => void;
    makeupEditing: Makeup | null;
    onUpdate: (makeup: Makeup) => void;
}

function MakeupForm({
    onSave,
    makeupEditing,
    onUpdate
}: MakeupFormProps) {

    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [categoria, setCategoria] = useState("");
    const [cor, setCor] = useState("");
    const [preco, setPreco] = useState("");

    useEffect(() => {
        if (makeupEditing) {
            setNome(makeupEditing.nome);
            setMarca(makeupEditing.marca);
            setCategoria(makeupEditing.categoria);
            setCor(makeupEditing.cor);
            setPreco(String(makeupEditing.preco));
        }
    }, [makeupEditing]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const newMakeup = {
            nome,
            marca,
            categoria,
            cor,
            preco: Number(preco)
        };

        if (makeupEditing) {
            onUpdate({
                id: makeupEditing.id,
                ...newMakeup
            });
        } else {
            onSave(newMakeup);
        }

        clearForm();
    }

    function clearForm() {
        setNome("");
        setMarca("");
        setCategoria("");
        setCor("");
        setPreco("");
    }

    return (
        <form className="form" onSubmit={handleSubmit}>

            <h2>
                {makeupEditing
                    ? "Editar Maquiagem"
                    : "Cadastrar Maquiagem"}
            </h2>

            <Input
                label="Nome do Produto"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <Input
                label="Marca"
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
            />

            <Input
                label="Categoria"
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />

            <Input
                label="Cor/Tonalidade"
                type="text"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
            />

            <Input
                label="Preço"
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
            />

            <Button
                text={makeupEditing ? "Atualizar" : "Cadastrar"}
                type="submit"
            />

        </form>
    );
}

export default MakeupForm;