type Props = {
    Cur_OfficialRate: number
    Cur_Name: string
    /* установка и типизация входящих данных */
};

export const ExcangeRate = ({Cur_OfficialRate,Cur_Name}: Props) => {
    return (
        <div className="weather">
            <p>Exchange rate: {Cur_OfficialRate} бел. руб.</p>
            <p>Currency: {Cur_Name}</p>
        </div>
    );
};