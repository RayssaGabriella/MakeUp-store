import { useState, useEffect } from "react";
import "./Home.css";

import MakeupForm from "../components/molecules/MakeupForm";
import MakeupTable from "../components/organisms/MakeupTable";

import type { Makeup } from "../types/Makeup";

import {
    getMakeups,
    createMakeup,
    updateMakeupApi,
    deleteMakeupApi
} from "../services/api";

function Home() {

    const [makeups, setMakeups] =
        useState<Makeup[]>([]);

    const [makeupEditing, setMakeupEditing] =
        useState<Makeup | null>(null);

    useEffect(() => {
        loadMakeups();
    }, []);

    async function loadMakeups() {
        try {
            const data = await getMakeups();
            setMakeups(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addMakeup(
        newMakeup: Omit<Makeup, "id">
    ) {
        try {
            const makeupCreated =
                await createMakeup(newMakeup);

            setMakeups((prev) => [
                ...prev,
                makeupCreated
            ]);
        } catch (error) {
            console.error(error);
        }
    }

    async function updateMakeup(
        updatedMakeup: Makeup
    ) {
        try {

            await updateMakeupApi(
                updatedMakeup.id,
                updatedMakeup
            );

            setMakeups(
                makeups.map((makeup) =>
                    makeup.id === updatedMakeup.id
                        ? updatedMakeup
                        : makeup
                )
            );

            setMakeupEditing(null);

        } catch (error) {
            console.error(error);
        }
    }

    function editMakeup(makeup: Makeup) {
        setMakeupEditing(makeup);
    }

    async function deleteMakeup(id: number) {
        try {

            await deleteMakeupApi(id);

            setMakeups(
                makeups.filter(
                    (makeup) =>
                        makeup.id !== id
                )
            );

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">

            <h1>💄 MakeUp Store</h1>

            <MakeupForm
                onSave={addMakeup}
                makeupEditing={makeupEditing}
                onUpdate={updateMakeup}
            />

            <MakeupTable
                makeups={makeups}
                onEdit={editMakeup}
                onDelete={deleteMakeup}
            />

        </div>
    );
}

export default Home;