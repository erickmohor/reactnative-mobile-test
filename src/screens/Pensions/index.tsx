import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"
import BoxContainer from "../../components/BoxContainer"
import BoxHeader from "../../components/BoxHeader"
import BoxItem from "../../components/BoxItem"
import ScreenContainer from "../../containers/ScreenContainer"
import { Container } from "./styles"
import * as ApiService from '../../services/ApiService';
import MessageBox from "../../components/MessageBox"
import { IPensions } from "./types"
import FilterButton from "../../components/FilterButton"
import FilterBox from "../../components/FilterBox"
import Error from "../../components/Error"
import Loading from "../../components/Loading"


export default function Pensions() {
    const [data, setData] = useState<IPensions[]>([]);
    const [list, setList] = useState<IPensions[]>([]);
    const [filterTax, setFilterTax] = useState(false);
    const [filterMinimumValue, setFilterMinimumValue] = useState(false);
    const [filterRedemptionTerm, setFilterRedemptionTerm] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        getFilteredList();
    }, [filterTax, filterMinimumValue, filterRedemptionTerm])

    const init = async () => {
        setErrorMsg("");
        await getDbList();
        await getFilteredList();
    }

    const getDbList = async () => {
        setIsLoading(true)
        try {
            const response = await ApiService.get("pensions");
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

    const getFilteredList = async () => {
        if (data.length > 0) {
            setIsLoading(true)
            let filteredList = [...data];

            if (filterTax) { filteredList = filteredList.filter((item) => item.tax === 0 ? true : false); }
            if (filterMinimumValue) { filteredList = filteredList.filter((item) => item.minimumValue === 100 ? true : false); }
            if (filterRedemptionTerm) { filteredList = filteredList.filter((item) => item.redemptionTerm === 1 ? true : false); }

            setList(filteredList)
            setIsLoading(false)
        }
    }

    function renderFilterHeader() {
        return (
            <FilterBox>
                <FilterButton title="SEM TAXA" status={filterTax} onPress={() => setFilterTax(!filterTax)} />
                <FilterButton title="R$ 100,00" status={filterMinimumValue} onPress={() => setFilterMinimumValue(!filterMinimumValue)} />
                <FilterButton title="D+1" status={filterRedemptionTerm} onPress={() => setFilterRedemptionTerm(!filterRedemptionTerm)} />
            </FilterBox>
        )
    }

    const renderEmptyList = () => {
        if (filterTax || filterMinimumValue || filterRedemptionTerm) {
            return (
                <Container horizontalAlign="center">
                    <MessageBox
                        message="Nenhum resultado foi encontrado para os filtros selecionados."
                    />
                </Container>
            )
        }

        return (
            <Container horizontalAlign="center">
                <MessageBox
                    message="No momento não há Previdências."
                />
            </Container>
        )
    }


    return (
        <ScreenContainer>
            {
                isLoading ? <Loading /> :
                    errorMsg ? <Error message={errorMsg} onPress={() => init()} /> :
                        <FlatList
                            data={list}
                            ListHeaderComponent={renderFilterHeader}
                            ListEmptyComponent={renderEmptyList}
                            keyExtractor={item => String(item.id)}
                            renderItem={({ item }) => (
                                <BoxContainer key={item.id}>
                                    <BoxHeader
                                        title={item.name}
                                        subtitle={item.type}
                                    />
                                    <BoxItem
                                        title="Valor Mínimo:"
                                        type="minimumValue"
                                        value={item.minimumValue!}
                                    />
                                    <BoxItem
                                        title="Taxa:"
                                        type="tax"
                                        value={item.tax!}
                                    />
                                    <BoxItem
                                        title="Resgate:"
                                        type="redemptionTerm"
                                        value={item.redemptionTerm!}
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