import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <main className="error">
            <div>
                <h2>404</h2>
                <p>
                    {" "}
                    Oups! Nous rencontrons des difficultés à charger la page
                    demandée.{" "}
                </p>
                <Link to="/" className="link">
                    Retour à la page d'accueil
                </Link>
            </div>
        </main>
    );
}
