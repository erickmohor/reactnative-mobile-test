import axios from "axios";

export const get = async (endpoint: string) => {
    const url = "https://62965e3675c34f1f3b2e97a4.mockapi.io/" + endpoint;

    return await axios.get(url)
        .then((response) => {
            console.log("Conectado ao banco de dados")          

            let listInAlphOrder = [...response.data.data];
            listInAlphOrder.sort((currentItem, nextItem) => (currentItem.name > nextItem.name) ? 1 : (nextItem.name > currentItem.name) ? -1 : 0)

            response.data.data = listInAlphOrder

            return response.data
        })
        .catch((error) => {
            if(error.response!.status === 404) {
                console.log("O endpoint informado não existe")
            }
            else {
                console.log(error)
            }
            return { error: "Não foi possível se conectar ao banco de dados." }
        })

}