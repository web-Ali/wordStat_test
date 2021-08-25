import React, {useState, useEffect} from 'react';
import './style.css';
import {getList} from "./API";


const FormQuest = () => {

    const [text, setText] = useState('');
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failNum, setFailNum] = useState([]);

    function getVowels(str) {
        let m = str.match(/[aeiouауоыиэяюёеáéíóúýæöøåäüâàîûœêà]/gi);
        return m === null ? 0 : m.length;
    }

    function getWords(str) {
        return str.split(/,—| [^;—]/g).length;
    }

    const send = async (arr) => {
        const arrList = [];
        setError([])
        setFailNum([])
        setLoading(true);
        setTableData([]);
        arr = arr.replace(/\s+/g, '')
        arr = arr.split(/[,;]/)
        arr = [...new Set(arr)];
        console.log(arr);
        for (let a = 0; a < arr.length; a++) {
            if (!isNaN(arr[a]) && arr[a] > 0 && arr[a] <= 20) {
                try {


                    const resp = await getList(arr[a]);
                    arrList.push(resp.data.text)

                    // console.log(resp.data.text)
                } catch (e) {
                    setError(prevState => ([...prevState, `Произошла ошибка при загрузке текста с идентификатором
                     ${arr[a]}, поробуйте повторить запрос позже`]));
                }
            } else {
                setFailNum(prevState => ([...prevState, `Число ${arr[a]} некорректно`]));

            }

        }
        setTableData(arrList);
        // setTableData(prevState => ([...prevState, resp.data.text]));
        setLoading(false)
    }


    return (
        <div>
            <form className='question'>
                <label>Идентификатор строк: </label>
                <input value={text} onChange={(e) => setText(e.target.value)} type="text"/>
                <button type="submit"
                        onClick={
                            (e) => {
                                e.preventDefault();
                                send(text);
                            }
                        }>Подсчитать
                </button>
            </form>
            <div>
                <p>{loading ? 'Идёт загрузка данных' : null}</p>
            </div>
            <div>
                {error.map((a, index) => {
                    return <p key={index} style={{color: 'red'}}>
                        {a}
                    </p>
                })}
                {failNum.map((a, index) => {
                    return <p key={index} style={{color: 'red'}}>
                        {a}
                    </p>
                })}

            </div>
            <div>

            </div>
            <div className="table-answer">
                <table>
                    <thead>
                    <tr>
                        <td>Текст</td>
                        <td>Количество слов</td>
                        <td>Количество гласных</td>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((a, index) => {
                        return (
                            <tr key={index}>

                                <td>
                                    {a}
                                </td>
                                <td>
                                    {getWords(a)}
                                </td>
                                <td>
                                    {getVowels(a)}

                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FormQuest;