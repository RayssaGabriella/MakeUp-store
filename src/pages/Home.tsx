import { useState, useEffect } from "react";
import "./Home.css";

import MakeupForm from "../components/molecules/MakeupForm";
import MakeupTable from "../components/organisms/MakeupTable";
import type { Makeup } from "../types/Makeup";

function Home() {
    const [makeups, setMakeups] = useState<Makeup[]>([]);
    const [makeupEditing, setMakeupEditing] = useState<Makeup | null>(null);


    useEffect(() => {
        const savedMakeups = localStorage.getItem("makeups");

        if (savedMakeups) {
            setMakeups(JSON.parse(savedMakeups));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("makeups", JSON.stringify(makeups));
    }, [makeups]);


    function addMakeup(newMakeup: Omit<Makeup, "id">) {

        const newId =
            makeups.length > 0
                ? makeups[makeups.length - 1].id + 1
                : 1;

        const makeup: Makeup = {
            id: newId,
            ...newMakeup
        };

        setMakeups([...makeups, makeup]);
    }


    function updateMakeup(updatedMakeup: Makeup) {

        setMakeups(
            makeups.map((makeup) =>
                makeup.id === updatedMakeup.id
                    ? updatedMakeup
                    : makeup
            )
        );

        setMakeupEditing(null);
    }


    function editMakeup(makeup: Makeup) {
        setMakeupEditing(makeup);
    }


    function deleteMakeup(id: number) {

        setMakeups(
            makeups.filter((makeup) => makeup.id !== id)
        );
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