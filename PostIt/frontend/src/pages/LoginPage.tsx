import React, {useContext, useEffect, useState} from 'react';
import ApiService from "../ApiService";
import {handleApiErrors, saveJwtInLoginResponse} from "../HelperMethods";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../Store";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const apiService = new ApiService();
    const navigate = useNavigate()
    const [_, setUser] = useContext(UserContext);
    
    useEffect(() =>{
        localStorage.clear();
        setUser(null)
    }, [])
    

    const handleLogin = async () => {
        try {
            const loginResponse = await apiService.login({email, password});
            saveJwtInLoginResponse(loginResponse);
            setUser({username: loginResponse.data.username})
            navigate("/")
        } catch (ex) {
            handleApiErrors(ex);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Email</label>
                            <input id="username" name="username" type="text" autoComplete="username" required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" checked type="checkbox"
                                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Create new account instead?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
