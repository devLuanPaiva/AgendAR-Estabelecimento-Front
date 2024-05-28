import { useState } from "react";

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        if (e.target && e.target.name) {
            setValues({ ...values, [e.target.name]: e.target.value });
        } else {
            console.error("O evento de mudança não contém um alvo válido ou o nome do alvo não está definido.");
        }
    };

    return [values, handleChange, setValues];
}
