import { useEffect } from "react";

export function meta() {
    return [
        { title: "Sign Up - SpeakMaster" },
        { name: "description", content: "Create your account" }
    ];
}

export default function Signup() {
    useEffect(() => {
        document.getElementById("send")?.addEventListener("click",function(){
            const name_input = document.getElementById("name") as HTMLInputElement
            const name = name_input.value
            const mail_input = document.getElementById("email") as HTMLInputElement
            const mail = mail_input.value
            const pass_input = document.getElementById("password") as HTMLInputElement
            const pass = pass_input.value
            const display = document.querySelector(".display")
            if(mail == "" && display) display.innerHTML = "Podaj adres e-mail";
            else if(name == "" && display) display.innerHTML = "Podaj nazwę użytkownika";
            else if(pass == "" && display) display.innerHTML = "Podaj hasło";
            else {
                const options = {
                    method: "POST",
                    Headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: mail,
                        password: pass,
                        name: name
                    })
                }
                fetch("/api/v1/auth/register", options)
                .then(async res => {
                    console.log(res)
                    const data = await res.json()
                    if(!res.ok && display) display.innerHTML = data.error
                    else if(display) display.innerHTML = data.message
                })
                .catch(err => {
                    if(display) display.innerHTML = "Nie znaleziono serwera.<br>Sprawdź połączenie z internetem"
                    console.log(err)
                })
            }
        })
    },[])

    return (
        <div className="cont">
            <div className="panel" style={{width: '30em'}}>
                <h1 className="heading">Zarejestruj się</h1>
                <label htmlFor="name">Nazwa użytkownika<span style={{color: '#CC0000'}}>*</span></label>
                <input type="text" id="name"/>
                <label htmlFor="email">Adres e-mail<span style={{color: '#CC0000'}}>*</span></label>
                <input type="email" id="email"/>
                <label htmlFor="password">Hasło<span style={{color: '#CC0000'}}>*</span></label>
                <input type="password" id="password"/>
                <p className="display"></p>
                <button className="confirm" id="send">Zarejestruj</button>
            </div>
        </div>
    );
}