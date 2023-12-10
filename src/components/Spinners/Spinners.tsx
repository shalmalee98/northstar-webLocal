import { useState, CSSProperties } from "react";
import GridLoader from "react-spinners/GridLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Spinners() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#2b57a8");

    return (
        <div className="sweet-loading">
            <GridLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Spinners;