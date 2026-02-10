const formLogin = (req, res) => {
    res.render('auth/login',{
        pageName: 'login',
    })
}

const formRegister = (req, res) => {
    res.render('auth/register',{
     pageName: 'Register',
    })
}

const formForget = (req, res) => {
    res.render('auth/forget-password',{
     pageName: 'Recover your account access',
    })
}

export {
    formLogin, 
    formRegister,
    formForget
}