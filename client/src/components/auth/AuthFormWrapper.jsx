    import React from 'react';

    const AuthFormWrapper = ({ children, title, subtitle, linkText, linkTo }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
            <p className="mt-2 text-gray-600">
                {subtitle}{' '}
                <a href={linkTo} className="text-indigo-600 hover:text-indigo-800 font-semibold">
                {linkText}
                </a>
            </p>
            </div>
            {children}
        </div>
        </div>
    );
    };

    export default AuthFormWrapper;
