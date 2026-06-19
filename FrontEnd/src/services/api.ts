const API_URL = "http://localhost:3001/makeups";

export async function getMakeups() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar maquiagens");
    }

    return response.json();
}

export async function createMakeup(makeup: any) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(makeup),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar maquiagem");
    }

    return response.json();
}

export async function updateMakeupApi(id: number, makeup: any) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(makeup),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar maquiagem");
    }

    return response.json();
}

export async function deleteMakeupApi(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir maquiagem");
    }
}