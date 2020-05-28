export const API_URL = 'http://localhost:3001';

export const fetchUserData = async(keyword) => {
    let userDataJson = await fetch(`${API_URL}/api/users?search=${keyword}`);
    let userData = await userDataJson.json();
    return userData;
}

export const submitUserData = async(nama,hp,email,alamat) => {
    let dataPayload = {nama, hp, email, alamat};
    let userDataJson = await fetch(`${API_URL}/api/users/add`,{
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(dataPayload)
    });
    let userData = await userDataJson.json();
    return userData;
}
