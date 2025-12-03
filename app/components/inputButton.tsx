'use client'

import { useState } from "react";


type InputFieldProps = {
    type?:string;
    value:string;
    placeholder?:string;
    className?:string;
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?:string;
}
export default function InputField({type="text", value, onChange,onBlur,error, placeholder, className}:InputFieldProps){

    return (
        <div>
            <input type={type} onChange={onChange} onBlur={onBlur} value={value} placeholder={placeholder} className={`h-10 w-full px-3 rounded-lg border focus:outline-none focus:ring-2
            ${error ? "border-red-500 focus:ring-red-500" : "border-zinc-200 focus:ring-gray-500"}
            ${className ?? ""}`}></input>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        
    )

}