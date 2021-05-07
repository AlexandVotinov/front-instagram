export default class {
    constructor(params) {
        this.params = params;
        this.clickedElement;

        document.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target.matches("[event]")){
                const attribute = e.target.getAttribute('event');
                if(attribute) this[attribute]();
            }

            this.getClicked(e.target)
        })

        document.addEventListener('input', (e) => {
            if(e.target.matches("[bind]")){
                const attribute = e.target.getAttribute('bind');
                this[attribute] = e.target.value;
            }
        })
    }

    getClicked(el){
        
    }
    
    getToken(){
        return sessionStorage.getItem('token')
    }

    getParams(){
        return this.params.id
    }

    setTitle(title) {
        document.title = title;
    }

    render(){
        document.querySelector("#app").innerHTML = this.getHtml();
        const components = this.components()
        if(components){
            Object.keys(components).forEach(key => {
                document.querySelector(key).innerHTML = components[key]
            })
        }



    }

    async getHtml() {
        return "";
    }
}