import { navigateTo } from "../../index.js";
import AbstractView from "../AbstractView.js";
import { headerComponent } from "../components/Header.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.getPerson()
        this.setTitle("Profile");

        this.profileId = params.id;
        
        this.nickName = ''
        this.name = ''
        this.main;
        this.publications = 1
        this.subscribers = 2
        this.subscriptions = 3

        this.menuVisible = {
            false: 'hide',
            true: '',
            state: false
        }

    }

    components(){
        return {
            'header_component': headerComponent
        }
            
    }

    getClicked(el){
        if(!el.classList.contains('menu-item') && !el.classList.contains('profile__menu_button_JS')){
            this.menuVisible.state = false
        }
        this.render() 
    }

    async getPerson(){
        const token = this.getToken();
        const id = this.getParams();

        let response = await fetch('http://localhost:3200/person/page', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, token: token}),
        });
        const json = await response.json();
    
        if(response.status == 200){
            this.nickName = json.nickname
            this.name = json.name
            this.publications = json.publications || 0
            this.subscribers =json.subscribers || 0
            this.subscriptions = json.subscriptions || 0
            this.main = json.main || 'hide'
        }else{

        }
        this.render() 
    }

    showMenu(){
        this.menuVisible.state = !this.menuVisible.state
        this.render()
    }

    getHtml() {
        return `
        <header_component></header_component>
        <div class="header">
            <div class="main-header">
                <div class="main-header_logo">
                    <img src="/static/img/logo.png" alt="instagram_logo">
                </div>
                <div class="main-header_search">
                    <input type="search" placeholder="Поиск">
                </div>
                <div class="main-header_nav">
                    <div class="main-header_nav__home nav-item">
                        <svg aria-label="Главная страница" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path></svg>
                    </div>
                    <div class="main-header_nav__mailer nav-item">
                        <svg aria-label="Messenger" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M36.2 16.7L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.8 10.7c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9l6.8-10.7c.6-1.1-.7-2.2-1.7-1.5zM24 1C11 1 1 10.5 1 23.3 1 30 3.7 35.8 8.2 39.8c.4.3.6.8.6 1.3l.2 4.1c0 1 .9 1.8 1.8 1.8.2 0 .5 0 .7-.2l4.6-2c.2-.1.5-.2.7-.2.2 0 .3 0 .5.1 2.1.6 4.3.9 6.7.9 13 0 23-9.5 23-22.3S37 1 24 1zm0 41.6c-2 0-4-.3-5.9-.8-.4-.1-.8-.2-1.3-.2-.7 0-1.3.1-2 .4l-3 1.3V41c0-1.3-.6-2.5-1.6-3.4C6.2 34 4 28.9 4 23.3 4 12.3 12.6 4 24 4s20 8.3 20 19.3-8.6 19.3-20 19.3z"></path></svg>
                    </div>
                    <div class="main-header_nav__popular nav-item">
                        <svg aria-label="Найти людей" class="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fill-rule="evenodd"></path></svg>
                    </div>
                    <div class="main-header_nav__notifications nav-item">
                        <svg aria-label="Что нового" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                    </div>
                    <div class="main-header_nav__profile profile__menu_button_JS">
                        <img class='profile__menu_button_JS' src="https://sun9-75.userapi.com/impf/c622227/v622227253/19005/7IhnNcSfFuY.jpg?size=563x1000&quality=96&sign=80d93e2dda366f6bad1e65b9f3123cd5&type=album" alt="${this.name}" event="showMenu" bind="menuVisible.state">
                    </div>
                    <div class="main-header_nav__profile__menu profile__menu_list_JS ${this.menuVisible[this.menuVisible.state]}">
                        <ul>
                            <a href='/profile/${this.nickName}'><li class="menu-item">Профиль</li></a>
                            <li class="menu-item"> Сохраненное</li>
                            <li class="menu-item"> Настройки</li>
                            <li class="menu-item"> Аккаунты</li>
                            <hr>
                            <a href="/auth/logout"><li class="menu-item">Выйти</li></a>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <main>
            <div class="main-person">
                <div class="main-person-photo">
                    <img src="https://sun9-75.userapi.com/impf/c622227/v622227253/19005/7IhnNcSfFuY.jpg?size=563x1000&quality=96&sign=80d93e2dda366f6bad1e65b9f3123cd5&type=album" alt="Alexander">
                </div>
                <div class="main-person-info">
                    <div class="main-person-info_header">
                        <div class="main-person-info_nickname">${this.nickName}</div>
                        <div class="main-person-info_rewrite-profile">
                            <button class="main-person-info_rewrite-profile__button ${this.main}">Редактировать профиль</button>
                        </div>
                    </div>
                    <div class="main-person-info_counter">
                        <div class="main-person-info_counter_publications">
                            <span>${this.publications}</span>
                            <span>публикаций</span>
                        </div>
                        <div class="main-person-info_counter_subscribers">
                            <a href="#">
                                <span>${this.subscribers}</span>
                                <span>подписчиков</span>
                            </a>
                        </div>
                        <div class="main-person-info_counter_subscriptions">
                            <a href="#">
                                <span>${this.subscriptions}</span>
                                <span>подписок</span>
                            </a>
                        </div>
                        <div class="main-person-info_counter_subscriptions">
                            <a href="/profile/7654321" data-link>
                            7654321
                            </a>
                        </div>
                    </div>
                    <div class="main-person-info_additional">
                        <div class="main-person-info_additional_name">${this.name}</div>
                    </div>
                </div>
            </div>
            <div class="main-nav">
                <div class="main-nav_publications active">публикации</div>
                <div class="main-nav_IGTV">igtv</div>
                <div class="main-nav_saved">сохраненное</div>
                <div class="main-nav_marks">отметки</div>
            </div>
            <div class="main-galery">
                <div class="main-galery_item" data-id="0">
                    <div class="show-stats_type"></div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>14</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>1</span>
                            </span>
                        </div>
                    </div>
                    <img src="2.jpg" alt="ads">
                </div>
                <div class="main-galery_item" data-id="1">
                    <div class="show-stats_type album">
                        <i class="fas fa-images"></i>
                    </div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>320</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>22</span>
                            </span>
                        </div>
                    </div>
                    <img src="3.png" alt="ads">
                </div>
                <div class="main-galery_item" data-id="2">
                    <div class="show-stats_type video">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>112</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>37</span>
                            </span>
                        </div>
                    </div>
                    <img src="4.jpg" alt="ads">
                </div>

                <div class="main-galery_item" data-id="3">
                    <div class="show-stats_type"></div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>14</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>1</span>
                            </span>
                        </div>
                    </div>
                    <img src="5.jpg" alt="ads">
                </div>
                <div class="main-galery_item" data-id="4">
                    <div class="show-stats_type album">
                        <i class="fas fa-images"></i>
                    </div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>320</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>22</span>
                            </span>
                        </div>
                    </div>
                    <img src="6.jpg" alt="ads">
                </div>
                <div class="main-galery_item" data-id="5">
                    <div class="show-stats_type video">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>112</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>37</span>
                            </span>
                        </div>
                    </div>
                    <img src="7.jpg" alt="ads">
                </div>

                <div class="main-galery_item" data-id="6">
                    <div class="show-stats_type"></div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>14</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>1</span>
                            </span>
                        </div>
                    </div>
                    <img src="8.jpg" alt="ads">
                </div>
                <div class="main-galery_item" data-id="7">
                    <div class="show-stats_type album">
                        <i class="fas fa-images"></i>
                    </div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>320</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>22</span>
                            </span>
                        </div>
                    </div>
                    <img src="9.jpeg" alt="ads">
                </div>
                <div class="main-galery_item" data-id="8">
                    <div class="show-stats_type video">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>112</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>37</span>
                            </span>
                        </div>
                    </div>
                    <img src="10.jpg" alt="ads">
                </div>

                <div class="main-galery_item" data-id="9">
                    <div class="show-stats_type"></div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>14</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>1</span>
                            </span>
                        </div>
                    </div>
                    <img src="11.jpg" alt="ads">
                </div>
                <div class="main-galery_item" data-id="10">
                    <div class="show-stats_type album">
                        <i class="fas fa-images"></i>
                    </div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>320</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>22</span>
                            </span>
                        </div>
                    </div>
                    <img src="12.png" alt="ads">
                </div>
                <div class="main-galery_item" data-id="11">
                    <div class="show-stats_type video">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="show-stats">
                        <div class="show-stats_info">
                            <span>
                                <i class="fas fa-heart"></i>
                                <span>112</span>
                            </span>
                            <span>
                                <i class="fas fa-comment"></i>
                                <span>37</span>
                            </span>
                        </div>
                    </div>
                    <img src="13.jpg" alt="ads">
                </div>
            </div>
        </main>
        <footer>
            <div>
                <span>Информация</span>
                <span>Блог</span>
                <span>Вакансии</span>
                <span>Помощь</span>
                <span>API</span>
                <span>Конфиденциальность</span>
                <span>Условия</span>
                <span>Популярные аккаунты</span>
                <span>Хэштэги</span>
                <span>Места</span>
            </div>
            <div>
                <span>Русский</span>
                <span>© Instagram от Facebook, 2021</span>
            </div>
        </footer>
        <div class="popup">
            <div class="main-popup_nav close close-popup_JS fas fa-times"></div>
            <div class="main-popup">
                <div class="main-popup_nav left fas fa-chevron-left"></div>
                <div class="main-popup_nav right fas fa-chevron-right"></div>
                <div class="main-popup-content">
                    <img src="8.jpg" alt="ads">
                </div>
                <div class="main-popup-panel">
                    <div class="main-popup-panel_header">
                        <div class="main-popup-panel_header_logo">
                            <img src="1.jpg" alt="Alexander">
                        </div>
                        <div class="main-popup-panel_header_content">
                            <a href="#">alexander.votinov</a>
                            <span>My firs day without problems</span>
                            <div>28 нед.</div>
                        </div>
                    </div>
                    <div class="main-popup-panel_header_comment">
                        <div class="main-popup-panel_header_comment__buttons">
                            <span class="far fa-heart like-active"></span>
                            <span class="far fa-comment"></span>
                            <span class="far fa-share-square"></span>
                            <span class="far fa-bookmark save"></span>
                        </div>
                        <div class="main-popup-panel_header_comment__description">
                            <img src="1.jpg" alt="Alexander">
                            <span>Нравится</span>
                            <span><a href="#">alexander.votinov</a></span>
                            <span>и еще</span>
                            <span><a href="#">14</a></span>
                        </div>
                        <div class="main-popup-panel_header_comment__date">
                            2 августа 2020 г.
                        </div>
                        <div class="main-popup-panel_header_comment__add-comment">
                            <div class="main-popup-panel_header_comment__add-comment_emoji">
                                <span class="far fa-smile"></span>
                            </div>
                            <div class="main-popup-panel_header_comment__add-comment_input">
                                <input type="text" placeholder="Добавить комментарий...">
                            </div>
                            <div class="main-popup-panel_header_comment__add-comment_submit">
                                Опубликовать
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}