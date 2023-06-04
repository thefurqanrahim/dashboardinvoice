import axios from 'axios'

const baseUrl = "http://localhost:5000"

const getUser = (setuser: any) => {
    axios.get(baseUrl).then(({ data }) => {
        console.log('data --->', data);
        setuser(data)
    })
}

const addUser = (setShowAlert: any, userName: string, amount: string, date: string, status: string, setData: any, setUser: any) => {
    axios.post(`${baseUrl}/save`, { userName, amount, date, status })
        .then((item) => {
            console.log(userName, amount, date, status);
            console.log("data");
            setData("")
            getUser(setUser)
            setShowAlert(true)
        })
}

const updateUser = (userId: number, userName: string, amount: string, date: string, status: string, setUpdate: any, setData: any, setUser: any) => {
    axios.post(`${baseUrl}/update`, { _id: userId, userName, amount, date, status })
        .then((item) => {
            console.log("data");
            setData("")
            setUpdate(false)
            getUser(setUser)
        })
}

const deleteUser = (_id: number, setUser: any) => {
    axios.post(`${baseUrl}/delete`, { _id }).then(({ data }) => {
        getUser(setUser)
    })
}



export { getUser, addUser, deleteUser, updateUser }