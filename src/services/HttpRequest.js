import axios from 'axios'

class HttpRequest {

    token = '';
}

export function login(username, password, j) {
    var login = {
        username: username,
        password: password
    }
    axios.post('https://receitas.devari.com.br/authentication/', login)
        .then(response => {
            console.log(response)
            localStorage.setItem('token', response.data.token)
            j(response)
        }).catch(error => {
            console.log(error)
            j(error)
        })
};

export function getCategory() {
    var token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
    axios.get('https://receitas.devari.com.br/api/v1/category/', config)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
}

export function getRecipe(idrecipe = null, idclient = null) {
    var token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': 'Token ' + token
        }
    }

    var url = "https://receitas.devari.com.br/api/v1/recipe";
    if (idrecipe) {
        url = url.concat('/' + idrecipe)
    } if (idclient) {
        url = url.concat('?user=' + idclient);
    }


    axios.get(url, config)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
}

export function recipe(type, id = null, title = null, description = null, category = null, j) {

    var recipe = {
        title: title,
        description: description,
        category: category
    }

    var token = localStorage.getItem('token');

    var config = {
        headers: {
            'Authorization': 'Token ' + token
        }
    }

    if (type === 'add') {
        axios.post('https://receitas.devari.com.br/api/v1/recipe/', recipe, config)
            .then(response => {
                console.log(response)
                j(response)
            }).catch(error => {
                console.log(error)
                j(error)
            })
    } if (type === 'edit') {
        axios.put('https://receitas.devari.com.br/api/v1/recipe/' + id, recipe, config)
            .then(response => {
                console.log(response)
                j(response)
            }).catch(error => {
                console.log(error)
                j(error)
            })
    } if (type === 'delete') {
        axios.delete('https://receitas.devari.com.br/api/v1/recipe/' + id, config)
            .then(response => {
                console.log(response)
                j(response)
            }).catch(error => {
                console.log(error)
                j(error)
            })
    }

}

export default HttpRequest