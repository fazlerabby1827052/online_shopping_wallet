const regUser=document.getElementById('regUser');
const regPassword=document.getElementById('regPassword');
const regSubmit = document.getElementById('regSubmit');
const logUser=document.getElementById('logUser');
const logPassword=document.getElementById('logPassword');
const logSubmit = document.getElementById('logSubmit');
const register = document.getElementById("register");
const login= document.getElementById("login");
const wallet = document.getElementById("wallet");
const registersuccess=document.getElementById("registersuccess");
const loginsuccess=document.getElementById("loginsuccess");
const purchasesuccess= document.getElementById("purchasesuccess");
const purchaseSpan= document.getElementById("purchaseSpan");
const redirectLogin = document.getElementById("redirectLogin");
const logoutbtn = document.getElementById("logoutbtn");
const walletspan = document.getElementById("walletspan");
const addmoneyinput = document.getElementById("addmoneyinput");
const addmoneysubmit= document.getElementById("addmoneysubmit");
const addproductname= document.getElementById("addproductname");
const addproductprice= document.getElementById("addproductprice");
const addproductbtn= document.getElementById("addproductbtn");
const card= document.getElementById("card");

registersuccess.classList.add('notshow');
loginsuccess.classList.add('notshow');
purchaseSpan.classList.add('notshow');
purchasesuccess.classList.add('notshow');


function localetoOriginal(val){
    const one = localStorage.getItem(val);
    const two=JSON.parse(one);
    return two;
}

function addAClass(element,val){
    element.classList.add(val);
}
function removeAClass(element,val){
    element.classList.remove(val);
}

addAClass(register,'notshow');
addAClass(login,'notshow');
addAClass(wallet,'notshow');


let autoincrement = 0;
let users=[];



function checkIslogin(){
    const curr=localStorage.getItem("currentUser");
    if(curr===null){
        return false;
    }
    return true;
}
function userinfo(id){
    users=userfetch();
    // console.log(users);
    let userone;
    if(users.length){
        users.forEach((user)=>{
            if(user.id===id){
                userone=user;
            }
        })
        
    }
    return userone;
}

if(checkIslogin()===true){
    removeAClass(wallet,'notshow');
    const val2=localStorage.getItem("currentUser");
    const val3=JSON.parse(val2);
    const cu=userinfo(val3);
    walletspan.innerText=`${cu.walletBalance}`
}
else{
    removeAClass(register,'notshow');
}

function userfetch(){
    const val=localStorage.getItem("users");
    const val2=JSON.parse(val);
    return val2;
}





regSubmit.addEventListener('click',(e)=>{
    e.preventDefault();

    // console.log(localStorage.getItem("users"));
    if(localStorage.getItem("users")!==null){
        const localStorageUse=JSON.parse(localStorage.getItem("users"));
        users=localStorageUse;
    }


    
    
    if(regUser.value.length==0 || regPassword.value.length===0){
        alert("please give username and password");
        return;
    }
    let f=false;
    if(users.length){
        users.forEach((user)=>{
            if(user.userName===regUser.value){
                alert("already username exists");
                f=true;
                return;
            }
        })
    }
    if(f){
        return;
    }

    let useridone;

    if(localStorage.getItem("autoincrement")===null){
        let it=0;
        let it2=JSON.stringify(it);
        localStorage.setItem("autoincrement",it2);
        useridone=it;
    }
    else{
        let it=localStorage.getItem("autoincrement");
        let it2=JSON.parse(it);
        it2++;
        console.log(it);
        useridone=it2;

        let it3=JSON.stringify(useridone);
        localStorage.setItem("autoincrement",it3);
    }
    
    let newUser={
        userName:regUser.value,
        id:useridone,
        password:regPassword.value,
        walletBalance:0,
        isLogin:false,
        purchaseId:[],
    }
    users.push(newUser);
    regUser.value="";
    regPassword.value="";
    const val=JSON.stringify(users);
    const v2=JSON.parse(val);

    localStorage.setItem("users",val);
    registersuccess.classList.remove('notshow');
    setTimeout(()=>{
        registersuccess.classList.add('notshow');
    },2000);

    addAClass(register,'notshow');
    removeAClass(login,'notshow');
});

redirectLogin.addEventListener('click',(e)=>{
    addAClass(register,'notshow');
    removeAClass(login,'notshow');
});


logSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    users=userfetch();
    const un=logUser.value;
    const ps=logPassword.value;
    if(users.length){
        let f2=false;
        users.forEach((user)=>{
            if(user.userName===un && user.password===ps){
                f2=true;
                addAClass(login,'notshow');
                removeAClass(wallet,'notshow');
                walletspan.innerText=`${user.walletBalance}`
                
                let userId1=JSON.stringify(user.id);
                localStorage.setItem('currentUser',userId1);
            }
        });
        if(f2===false){
            alert("credential wrong");
        }
    }
    else{
        alert("credential wrong");
    }
});


logoutbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.reload();
});

function isNumber(num){
    for(const x in num){
        if((x>='0' && x<='9')===false){
            return false;
        }
    }
    return true;
}

addmoneysubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    if(addmoneyinput.value==""){
        alert("add a number");
    }
    else{
        if(isNumber(addmoneyinput.value)){
            const val=parseInt(addmoneyinput.value);
            const curr= localetoOriginal("currentUser");
            users=userfetch();
            const userone=userinfo(curr);
            const val2=userone.walletBalance;
            const newval=val+val2;
            userone.walletBalance=newval;
            let nuser=[];
            const nus=users.map((user)=>{ if(user.id!==curr){
                nuser.push(user);
            }});
            nuser.push(userone);
            // console.log(nuser);
            users=nuser;
            const st=JSON.stringify(users);
            localStorage.setItem("users",st);
            window.location.reload();
        }
        else{
            alert("please give a number");
        }
    }
});

let product=[];



addproductbtn.addEventListener('click',(e)=>{card
    e.preventDefault();
    
    const namep=addproductname.value;
    const pricep=addproductprice.value;
    if(isNumber(pricep)===true){
        if(namep.length===0 || pricep.length===0){
            alert("give product name and value");
        }
        else{

            const obj2={
                name:namep,
                price:pricep
            }
            console.log(product);
            product.push(obj2);
            console.log(product);
            const str=JSON.stringify(product);
            localStorage.setItem("product",str);
            window.location.reload();

        }
    }
    else{
        alert("price is a number");
    }
});

if(product.length){
    let ii=0;
    product.forEach((pro)=>{
        const divone=document.createElement('div');
        const val2=`pro-${ii}`;
        divone.innerHTML=`<p>${pro.name}</p>
        <p>$ ${pro.price}</p>
        <button type="submit" id=${val2}>Add Product</button>

        `;
        const val3=document.getElementById(val2);

        val3.addEventListener('click',(e)=>{
            e.preventDefault();
            users=userfetch();
            let val4=JSON.parse(localStorage.getItem("currentUser"));
            let useone=userinfo(val4);
            let balanceone=useone.walletBalance;
            if(balanceone>=pro.price){
                let newbalance=balanceone-pro.price;
                let narr=[];
                users.forEach((user)=>{
                    if(user.id!==val4){
                        narr.push(user);
                    }
                });
                useone.walletBalance=newbalance;
                narr.push(useone);
                users=narr;
                localStorage.setItem("users",JSON.stringify(users));
                window.location.reload();
            }
            else{
                alert("insuffient balance");
            }


        });
        ii++;
        card.innerHTML=``;
        card.innerHTML=`${divone}`;
        console.log(card);
    });
}