import { useEffect, useState } from "react";
import SelecaoPais from "./SelecaoPais";

const ConversorForm = () => {
    const [quantia, setQuantia] = useState(100);
    const [deMoeda, setDeMoeda] = useState("BRL");
    const [paraMoeda, setParaMoeda] = useState("USD");
    const [resultadoConversao, setResultadoConversao] = useState("");

    const mudarMoedaSVG = () => {
        const tempMoeda = deMoeda;
        setDeMoeda(paraMoeda);
        setParaMoeda(tempMoeda);
    }

    const obterValor = async () => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${deMoeda}/${paraMoeda}`;

        try {
            const resposta = await fetch(API_URL); 
            if(!resposta.ok) throw Error("Algo deu errado! Não se preocupe, não é sua culpa.");
            
            const data = await resposta.json();
            const conversao = (data.conversion_rate * quantia).toFixed(2);
            setResultadoConversao(`${quantia} ${deMoeda} = ${conversao} ${paraMoeda}`);
        } catch (error) {
            console.log(error);
        }
    }

    const resultadoFormSubmit = (e) => {
        e.preventDefault();
        obterValor();
    }

    useEffect(() => obterValor,[])

    return (
        <form className='conversor-form' onSubmit={resultadoFormSubmit}>
            <div className="form">
                <label className='form-label valor'>Insira aqui um valor</label>
                <input
                type="number"
                className='form-input'
                value={quantia}
                onChange={e => setQuantia(e.target.value)}
                required 
                />
            </div>

            <div className="form">
                <div className="form-dobra">
                    <label className='form-label'>De</label>
                    <SelecaoPais 
                        moedaSelecionada={deMoeda}
                        mudarMoeda={e => setDeMoeda(e.target.value)}
                    />
                </div>
            </div>

            <div className="conversor-svg" onClick={mudarMoedaSVG}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-64L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64 320 0z"/>
                </svg>
            </div>

            <div className="form">
                <div className="form-dobra">
                    <label className='form-label'>Para</label>
                    <SelecaoPais
                        moedaSelecionada={paraMoeda}
                        mudarMoeda={e => setParaMoeda(e.target.value)}
                    />
                </div>
            </div>
            <button type='submit' className="submit-btn">Valor convertido</button>
            <p className='conversor-resultado'>
                {resultadoConversao}
            </p>
        </form>
    );
}

export default ConversorForm;
