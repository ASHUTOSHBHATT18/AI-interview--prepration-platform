import axios from 'axios'

export async function  register({username,email,password}){

    try{

        const response = await axios.post("https://ai-interview-prepration-platform-hvi2.onrender.com/api/auth/register", {
            username,
            email,
            password
        },{
            withCredentials: true
        });

        return response.data;

    }
    catch(err){
        console.error('Error registering user:', err);
    }
}

export async function login({email,password}){
    try{

        const response =await axios.post("https://ai-interview-prepration-platform-hvi2.onrender.com/api/auth/login", {
            email,
            password
        },{
            withCredentials: true
        });

        return response.data;

    }

    catch(err){
        console.error('Error logging in user:', err);
    }
}

export async function logout(){
    try{
        await axios.get("https://ai-interview-prepration-platform-hvi2.onrender.com/api/auth/logout",{
            withCredentials: true
        });

        return response.data;

    }
    catch(err){
        console.error('Error logging out user:', err);
    }
}

export async function getMe(){

    try{
        const response = await axios.get("https://ai-interview-prepration-platform-hvi2.onrender.com/api/auth/get-me",{
            withCredentials: true
        });

        return response.data;

    }
    catch(err){
        console.error('Error fetching user data:', err);
    }
}

