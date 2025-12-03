"use client"

import InputField from "../components/inputButton";
import {useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function signUp(){
    const[fullName, setFullName] = useState("");
    const[fullNameError, setFullNameError] = useState<string | null>(null);
    const[email, setEmail] = useState("");
    const[emailError, setEmailError] = useState<string | null>(null);
    const[pwd, setPwd] = useState("");
    const[pwdError, setPwdError ]= useState<string | null>(null);
    const[cfmPwd, setCfmPwd] = useState("");
    const[cfmPwdError, setCfmPwdError] =useState<string | null>(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [loading, setloading]= useState(false);

    const router = useRouter();

    function handleFullNameBlur(){
        if (!fullName){setFullNameError("Name cannot be empty")}
        else{setFullNameError("")}
    }

    function handleEmailBlur(){
        if(!email) {setEmailError("Email cannot be empty");}
        else if(!emailRegex.test(email)) { setEmailError("Invalid email format");}
        else{
            setEmailError(null);
        }
    }

    function handlePwdBlur(){
        if(!pwd){setPwdError("Password cannot be empty")}
        else if(pwd.length < 8){ setPwdError("The password at least has 8 characters")}
        else{
            setPwdError("");
        }
    }

    function handleCfmPwdBlur(){
        if(!cfmPwd){setCfmPwdError("Confirm Password cannot be empty");}
        else if(cfmPwd !== pwd){setCfmPwdError("Don't match with password");}
        else{
            setCfmPwdError("");
        }
    }

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        
        e.preventDefault();
        setloading(true);
        
        const target = e.nativeEvent as SubmitEvent;
        const btn = target.submitter as HTMLButtonElement;

        if(!fullName || !email || !pwd || !cfmPwd || !emailRegex.test(email) || pwd.length<8){
                alert("invaild input information")
                setloading(false)
                return
        }

        if(btn.value === "SignUp"){
            try{
              const res= await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({username:fullName,email,password:pwd})
              })

              const data = await res.json();

              if(!res.ok){
                alert(data.message || "Login failed")
                return
              }

              router.replace("/login");

              

            }catch(err){
                alert("Network error")

            }finally{
                setloading(false)
            }


        }

        if(btn.value === "google"){
            console.log("点击的按钮是：", btn.value);
        }


    }


    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-200 p-3 shadow-2xl w-110">
                <div className="m-3">
                    <p className="font-bold text-lg">Create an account</p>
                    <p className="text-ms text-gray-400">Enter your information below to create your account</p>
                </div>
                <div className="m-3 mt-5">
                    <h2 className="my-2 !text-ms">Full name</h2>
                    <InputField placeholder="John Doe" type="text" value={fullName} onChange={(e)=>{setFullName(e.target.value)}} onBlur={handleFullNameBlur}  error ={fullNameError ?? undefined}/>
                </div>
                <div className="m-3 mt-5">
                    <h2 className="my-2 !text-ms">Email</h2>
                    <InputField placeholder="m@example.com" type="email" value={email} onChange={(e) =>{setEmail(e.target.value)}} onBlur={handleEmailBlur} error={emailError ?? undefined}/>
                    <p className="text-[15px] text-gray-400">We'll use this to contact you. We will not share your email with anyone else.</p>
                </div>
                <div className="m-3 mt-5">
                    <h2 className="my-2 !text-ms">Password</h2>
                    <InputField type="password" value={pwd} onChange={(e) =>{setPwd(e.target.value)}} onBlur={handlePwdBlur} error={pwdError?? undefined}/>
                    <p className="text-[15px] text-gray-400">Must be at least 8 characters long.</p>
                </div>
                <div className="m-3 mt-5">
                    <h2 className="my-2 !text-ms">Confirm Password</h2>
                    <InputField type="password" value={cfmPwd} onChange={(e) =>{setCfmPwd(e.target.value)}} onBlur={handleCfmPwdBlur} error={cfmPwdError ?? undefined}/>
                    <p className="text-[15px] text-gray-400">Please confirm your password.</p>
                </div>
                <div className="m-3 mt-5">
                    <button value ="SignUp" className="h-10 w-full px-3 rounded-lg border border-zinc-200 hover:shadow-md my-2 bg-black text-white">Create Account</button>
                    <button value ="google" className="h-10 w-full px-3 rounded-lg border border-zinc-200 hover:shadow-md my-2">Sign up with google </button>
                    <div className="flex items-center justify-center text-gray-400">
                        <p>Already have an account?&nbsp;</p>
                        <Link href="/login" className="underline">Sign in</Link>
                    </div>
                    
                </div>
            </form>
        </main>
    )
}