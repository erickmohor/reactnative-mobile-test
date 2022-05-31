import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"
import BoxContainer from "../../components/BoxContainer"
import BoxHeader from "../../components/BoxHeader"
import BoxItem from "../../components/BoxItem"
import ScreenContainer from "../../containers/ScreenContainer"
import { IFunds } from "./types"
import * as ApiService from '../../services/ApiService';
import MessageBox from "../../components/MessageBox"
import Loading from "../../components/Loading"
import Error from "../../components/Error"


export default function Funds() {
    const [list, setList] = useState<IFunds[]>([]);
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
            const response = await ApiService.get("funds");
            if (response && !response.error) {
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

    const renderEmptyList = () => {
        return (
            <MessageBox
                message="No momento não há Fundos."
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
                            <BoxContainer key={item.id} status={item.status}>
                                <BoxHeader
                                    key={item.id}
                                    title={item.name}
                                    subtitle={item.type}
                                    status={item.status}
                                />
                                <BoxItem
                                    title="Classificação:"
                                    type="rating"
                                    value={item.rating}
                                    status={item.status}
                                />
                                <BoxItem
                                    title="Valor Mínimo:"
                                    type="minimumValue"
                                    value={item.minimumValue!}
                                    status={item.status}
                                />
                                <BoxItem
                                    title="Rentabilidade:"
                                    type="profitability"
                                    value={item.profitability!}
                                    status={item.status}
                                />
                            </BoxContainer>
                        )}
                    />

            }
        </ScreenContainer>
    )
}