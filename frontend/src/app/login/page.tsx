import React from "react";

const LoginPage = () => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700">Entrar</h2>
    
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu e-mail"
                />
              </div>
    
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sua senha"
                />
              </div>
    
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Entrar
                </button>
              </div>
            </form>
    
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
        </div>
    );
}

export default LoginPage;