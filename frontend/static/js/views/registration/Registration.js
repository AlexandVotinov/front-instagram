import { navigateTo } from "../../index.js";
import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Registration");

        this.errorMessage = '';
        this.email = ''
        this.name = ''
        this.nickName = ''
        this.password = ''
    }

    async registration(){
        let user = {
            email: this.email,
            name: this.name,
            nickname: this.nickName,
            password: this.password,
        }
        let response = await fetch('http://localhost:3200/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        const json = await response.json();
    
        if(response.status == 200){
            return navigateTo('/login')
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
                    <div class="main-authentication-block--form_description">Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</div>
                    <button>
                        <i class="fab fa-facebook-square"></i> Войти через Facebook
                    </button>
                    <div class="main-authentication-block--form_alternative">
                        <div class="main-authentication-block--form_alternative__line">
                            <span>ИЛИ</span>
                        </div>
                    </div>
                    <div class="main-authentication-block--form_fields">
                        <form>
                            <input type="email" placeholder="Эл. адрес" value="${this.email}" bind="email">
                            <input type="text" placeholder="Имя и фамилия" value="${this.name}" bind="name">
                            <input type="text" placeholder="Имя пользователя" value="${this.nickName}" bind="nickName">
                            <input type="password" placeholder="Пароль" value="${this.password}" bind="password">
                            <input type="submit" value="Регистрация" event="registration">
                        </form>
                        <div id="alert_message">${this.errorMessage}</div>
                    </div>
                    <div class="main-authentication-block--form_attention">
                        Регистрируясь, вы принимаете наши Условия, Политику использования данных и Политику в отношении файлов cookie.
                    </div>
                </div>
                <div class="main-authentication-block--register">
                    <span>Есть аккаунт?</span>
                    <a href="/login" data-link>Вход</a>
                </div>
            </div>
        </div>
        `;
    }
}