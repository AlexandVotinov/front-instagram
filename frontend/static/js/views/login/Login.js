import { navigateTo } from "../../index.js";
import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Login");

        this.errorMessage = '';
        this.nickName = ''
        this.password = ''
    }

    async login(){
        let user = {
            nickname: this.nickName,
            password: this.password,
        }
        let response = await fetch('http://localhost:3200/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        const json = await response.json();
    
        if(response.status == 200){
            sessionStorage.setItem('token', json.token);
            return navigateTo(`/profile/${json.nickname}`)
        }else{
            this.errorMessage = json.message;
        }
        this.render() 
    }

    getHtml() {
        return `
        <div class="main-login">
            <div class="main-authentication-block">
                <div class="main-authentication-block--form">
                    <div class="main-authentication-block--form_logo">
                        <img src="/static/img/logo.png" alt="instagram_logo">
                    </div>
                    <div class="main-authentication-block--form_fields">
                        <form>
                            <input type="text" placeholder="Имя пользователя" value="${this.nickName}" bind="nickName">
                            <input type="password" placeholder="Пароль" value="${this.password}" bind="password">
                            <input  type="submit" value="Войти" event="login">
                        </form>
                        <div id="alert_message">${this.errorMessage}</div>
                    </div>
                    <div class="main-authentication-block--form_alternative">
                        <div class="main-authentication-block--form_alternative__line">
                            <span>ИЛИ</span>
                        </div>
                    </div>
                    <div class="main-authentication-block--form_facebook">
                        <a href="#"> <i class="fab fa-facebook-square"></i> Войти через Facebook</a>
                    </div>
                    <div class="main-authentication-block--form_password-recovery">
                        <a href="#">Забыли пароль?</a>
                    </div>
                </div>
                <div class="main-authentication-block--register">
                    <span>У вас ещё нет аккаунта?</span>
                    <a href="/registration" data-link>Зарегистрироваться</a>
                </div>
            </div>
        </div>
        `;
    }
}