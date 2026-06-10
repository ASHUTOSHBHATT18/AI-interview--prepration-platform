import { useContext , useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import {register, login, logout, getMe} from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const {user, setUser, loading, setLoading} = context;

    const handleLogin =  async ({email,password})=>{

        setLoading(true);

        try{
        const data = await login({email,password});
        setUser(data.user);
        }
        catch(err){
            console.error('Login failed:', err);
        }finally{
            setLoading(false);
        }
    }

    const handleRegister = async ({username,email,password})=>{
        setLoading(true);
        try{
        const data = await register({username,email,password});
        setUser(data.user);
        }
        catch(err){
            console.error('Registration failed:', err);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try{
            await logout();
            setUser(null);
        }
        catch(err){
            console.error('Logout failed:', err);
        }
        finally{
        setLoading(false);
        }
    };

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                // getMe returns null when user is not logged in (401) — handle gracefully
                if (data && data.user) {
                    setUser(data.user);
                }
            } catch(err) {
                // ignore — user simply not authenticated
            } finally {
                setLoading(false);
            }
        }

        getAndSetUser();

    }, [])


    return { user, loading, handleLogin, handleRegister, handleLogout };
}