import React, {useState} from "react";
import ApiService from "../ApiService";
import toast from "react-hot-toast";
import {handleApiErrors} from "../HelperMethods";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const apiService = new ApiService();
    const navigate = useNavigate();

    async function registerUser() {
        try {
            await apiService.registerUser({email, username, password});
            toast("Register success, Please login now");
            navigate("/login")
        } catch (ex) {
            handleApiErrors(ex);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">PostIt</h1>
                    <h3 className="mt-6 text-center text-2xl text-gray-900">Create your account</h3>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    registerUser()
                }}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="display-name" className="sr-only">Display Name</label>
                            <input id="display-name" name="display-name" type="text" autoComplete="first-name" required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Display Name" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">Email</label>
                            <input id="email" name="email" type="text" autoComplete="email" required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="password"
                                   required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}