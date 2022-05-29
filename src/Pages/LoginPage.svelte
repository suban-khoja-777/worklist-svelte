<script>
    import { signinUser } from "../firebase";
    import {fireEvent,EVENTS} from "../EventManager";
    import Button from "../utility/Button.svelte";
    import Input from "../utility/Input.svelte";

    let user = {
        email:"",
        name:""
    }

    const handleChange = (e) => {
        user[e.target.name] = e.target.value;
    }

    const onSignIn = () => {
        
        const email = user.email;
        const password = user.password;

        if(email && password){
            fireEvent(EVENTS.SHOW_SPINNER,{});
            signinUser(email,password)
            .then (res => {
                fireEvent(EVENTS.HIDE_SPINNER,{});
            })
            .catch(err => {
                fireEvent(EVENTS.HIDE_SPINNER,{});
            });
        }
    }

</script>

<style>

    .container{
        margin: 0;
        padding: 0;
        height: 100vh;
    }

    .main{
        width: 100%;
        height: 100%;
        
    }

    .app-footer{
        padding: 1.5em 1em;
    }

    .title {
        font-family: normal;
        font-size: 1.75em;
        color: var(--primary-color);
    }

    .form-container{
        height: 100vh;
    }

    .highlight{
        color: var(--secondary-color);
    }

    .form{
        width: 400px;
        height: 400px;
        background: white;
        border-radius: 5px;
        padding: 0 3rem;
        box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    }

    .sub-container{
        width: 100%;
    }
    
    .dev-name{
        padding: 0.25rem 0.5rem;
        background: white;
        border-radius: 5px;
    }

    h1{
        margin: 0;
    }

    .app-highlight{
        font-weight: 900;
        background-color: #F1416C;
        color: white;
        padding: .25rem;
        border-radius: 5px;
    }
    
</style>

<div class="flex flex-row container">

        <div class="main">
            <div class="form-container flex justify-center flex-column login-form">
                <div class="sub-container grow flex justify-center align-center flex-row">
                    <div class="form form-right flex justify-center flex-column">
                        <div class="flex flex-row justify-center align-cente">
                            <h1 class="flex justify-center title flex align-center text-primary text-boldest">
                                Sign in to worklist
                            </h1>
                            &nbsp;<span class="flex align-center justify-center app-highlight">tracker</span>
                        </div>
                        <br/>
                        <br/>
                        <Input data_type="field" name="email" type="email" label="Email" label_class="dark" hasLabel onChange={handleChange}/>
                        <br/>
                        <Input data_type="field" name="password" type="password" label="Password" label_class="dark" hasLabel onChange={handleChange}/>
                        <br/>
                        <Button onClick={onSignIn} label="Login" type="primary"/>
                    </div>
                </div>
                <footer class="app-footer flex justify-end align-center bg-transparent">
                    <span class="dev-name text-bold highlight text-underline">Made with ❤️ by Suban Khoja</span>
                </footer>
            </div>
           
        </div>
       
</div>