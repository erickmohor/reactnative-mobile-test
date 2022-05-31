import React, { useEffect, useState } from "react"
import { TouchableOpacity, FlatList } from "react-native"
import BoxContainer from "../../components/BoxContainer"
import BoxHeader from "../../components/BoxHeader"
import BoxItem from "../../components/BoxItem"
import ScreenContainer from "../../containers/ScreenContainer"
import * as ApiService from '../../services/ApiService';
import { IStocks } from "./types"
import HeartFilledIcon from "../../../assets/icons/heart-filled.svg";
import HeartEmptyIcon from "../../../assets/icons/heart-empty.svg";
import MessageBox from "../../components/MessageBox"
import Error from "../../components/Error"
import Loading from "../../components/Loading"


export default function Stocks() {
    const [data, setData] = useState<IStocks[]>([]);
    const [list, setList] = useState<IStocks[]>([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        setErrorMsg("");
        await getDbList();
    }

    const getDbList = async () => {
        setIsLoading(true)
        try {
            const response = await ApiService.get("stocks");
            if (response && !response.error) {
                setData(response.data)
                setList(response.data)
            }
            else {
                setErrorMsg(response.error ? response.error : "Erro")
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    const handleFavorite = async (id: number) => {
        const newList = list.map(item => { return item.id === id ? { ...item, favorite: !item.favorite } : item })
            .sort((currentItem, nextItem) => (currentItem.name > nextItem.name) ? 1 : (nextItem.name > currentItem.name) ? -1 : 0)
            .sort((currentItem, nextItem) => (currentItem.favorite === nextItem.favorite) ? 0 : (currentItem.favorite) ? -1 : 1)
        setList(newList);
    }

    const renderEmptyList = () => {
        return (
            <MessageBox
                message="No momento não há Ações."
            />
        )
    }

    return (
        <ScreenContainer>
            {
                isLoading ? <Loading /> :
                errorMsg ? <Error message={errorMsg} onPress={() => init()} /> :
                            <FlatList
                                data={list}
                                keyExtractor={item => String(item.id)}
                                ListEmptyComponent={renderEmptyList}
                                renderItem={({ item }) => (
                                    <BoxContainer key={item.id}>
                                        <BoxHeader
                                            title={item.name}
                                            subtitle={item.ticker}
                                            favorite={item.favorite ?
                                                <TouchableOpacity onPress={() => handleFavorite(item.id)}>
                                                    <HeartFilledIcon />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity onPress={() => handleFavorite(item.id)}>
                                                    <HeartEmptyIcon />
                                                </TouchableOpacity>
                                            }
                                        />
                                        <BoxItem
                                            title="Valor Mínimo:"
                                            type="minimumValue"
                                            value={item.minimumValue!}
                                        />
                                        <BoxItem
                                            title="Rentabilidade:"
                                            type="profitability"
                                            value={item.profitability!}
                                        />
                                    </BoxContainer>
                                )}
                            />
                            
            }
        </ScreenContainer>
    )
}