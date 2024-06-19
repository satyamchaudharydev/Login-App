import axios from "axios";

const API_KEY = "AIzaSyAfjR01_SVYzz95nDyTM4WmYQZ4WqRcEOI"

export async function authenticate(mode, email, password){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    const response =  await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    })
    const token = response.data.idToken
    return token
}   

export function createUser  ({
    email,
    password,
    returnSecureToken = true
}) {
    return authenticate("signUp", email, password, returnSecureToken)

}
export  function login ({
    email,
    password,
    returnSecureToken = true
}) {
    return authenticate("signInWithPassword", email, password, returnSecureToken)
}