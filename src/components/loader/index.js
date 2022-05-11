import React from "react";
import { CircularProgress } from "@mui/material";

function Loader() {
    return (
        <div className="loading">
            <CircularProgress />
        </div>
    );
}

export default Loader;