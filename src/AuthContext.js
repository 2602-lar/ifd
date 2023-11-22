import axios from "axios";
import { createContext, useState} from "react";
import { jwtDecode } from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { Proxy } from "./variables";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    let navigate = useNavigate()

    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ?
        jwtDecode(localStorage.getItem('authTokens'))
        :
        null
    )
    let [authTokens, setAuthToken] = useState(() => localStorage.getItem('authTokens') ?
        JSON.parse(localStorage.getItem('authTokens'))
        :
        null
    )

    let loginUser = async (id, password) => {
        let response = ''
        await axios({
            method: 'POST',
            url: Proxy + '/token/',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: id,
                password: password
            },
        }).then(async (res) => {
            console.log(res.data.access)
            localStorage.setItem('authTokens', JSON.stringify(res.data))
            var userId = jwtDecode(localStorage.getItem('authTokens')).user_id


            setAuthToken(res.data)
            setUser(jwtDecode(res.data.access))
            localStorage.setItem('authTokens', JSON.stringify(res.data))
            response = res
            navigate('/apphome')
        }).catch((err) => {
            console.log(err)
            response = err
        })
        console.log(user)
        return response
    }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('theme')
        navigate('/login')
    }

    let contextData = {
        authTokens: authTokens,
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
} 