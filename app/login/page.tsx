"use client"

import { useState } from "react"
import InputField from "../components/inputButton"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function login(){
    const [email, setEmail] = useState("");
    const [pwd,setPwd] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [pwdError, setpwdError] = useState<string | null>(null);
    //加个loading状态
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function handleEmailBlur(){
        if(!email) {setEmailError("Email cannot be empty");}
        else if(!emailRegex.test(email)) { setEmailError("Invalid email format");}
        else{
            setEmailError(null);
        }
    }
    
    function handlePwdBlur(){
        if(!pwd) {setpwdError("Password cannot be empty");}
        else if(pwd.length<8){ setpwdError("The password at least has 8 characters")}
        else{
            setpwdError(null)
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setLoading(true)


        const target = e.nativeEvent as SubmitEvent;
        const btn = target.submitter as HTMLButtonElement;

        //if(!emailError && !pwdError && email && pwd){}有潜在问题：onBlur状态可能不被触发
        if(!email || !pwd || !emailRegex.test(email) || pwd.length<8){
            alert("invaild input information")
            setLoading(false)
            return 
        }

        if(btn.value === "login"){
            try {
                const res = await fetch("/api/auth/login",{
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body:JSON.stringify({email,password: pwd})
                })
                //如果返回内容解析失败也会报错
                const data = await res.json();

                if(!res.ok){
                    //console.log("login error data:", data)
                    alert(data.message || "Login failed")
                    return
                }

                const userInfo = {
                    username: data.user.username,
                    email: data.user.email
                }
                
                localStorage.setItem("userInfo", JSON.stringify(userInfo));

                router.push("/dashboard")

            }catch(err){
                alert("Network error")
                console.error(err);
            }finally{
                setLoading(false)
            }
        }

        if(btn.value === "google"){
                console.log("点击的按钮是：", btn.value);
        }
    }
    



    return(
        <main className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-200 p-3 shadow-2xl">
                <div className="m-3">
                    <p className="font-bold !text-lg">Login to your account</p>
                    <p className="!text-ms text-gray-400">Enter your email below to login to your account</p>
                </div>
                <div className="m-3 mt-8">
                    <p className="my-2 !text-ms">
                        Email
                    </p>
                    <InputField type="email" value={email}  placeholder="m@exaple.com" onChange={(e)=>{setEmail(e.target.value)}} onBlur={handleEmailBlur} error ={emailError ?? undefined}/>
                </div>
                <div className="m-3 mt-8">
                    <div className="flex justify-between my-2" >
                        <p>Password</p> 
                        <Link href="/path" className="items-right !text-[14px] hover:underline hover:text-blue-800">Forget your password?</Link>
                    </div>
                    <InputField type="password" value= {pwd} onChange={(e)=>{setPwd(e.target.value)}} onBlur={handlePwdBlur} error={pwdError ?? undefined}/>
                </div>
                <div className="flex flex-col m-3 mt-6">
                    <button value='login' className="h-10 w-full px-3 rounded-lg border border-zinc-200 hover:shadow-md my-2 bg-black text-white">Login</button>
                    <button value="google" className="h-10 w-full px-3 rounded-lg border border-zinc-200 hover:shadow-md my-2">Login with Google</button>
                    <div className="flex items-center justify-center text-gray-400">
                        <p>Don't have an account? &nbsp; </p> 
                        <Link href="/signUp" className="underline">Sign Up</Link>
                    </div>
                    
                </div>
                
            </form>
        </main>
    )
}