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
const addmoneysuccess= document.getElementById("addmoneysuccess");
const spendamountcard= document.getElementById("spendamountcard");
const totalspend= document.getElementById("totalspend");
const lasttransactions= document.getElementById("lasttransactions");
const transactiondiv= document.getElementById("transactiondiv");




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
addAClass(addmoneysuccess,'notshow');
addAClass(spendamountcard,'notshow');
addAClass(lasttransactions,'notshow');
addAClass(transactiondiv,'notshow');



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
    removeAClass(spendamountcard,'notshow');
    removeAClass(lasttransactions,'notshow');
    
    const val2=localStorage.getItem("currentUser");
    const val3=JSON.parse(val2);
    const cu=userinfo(val3);
    walletspan.innerText=`${cu.walletBalance}`;
    totalspend.innerText=`${cu.totalSpend}`;

}
else{
    removeAClass(register,'notshow');
}

function userfetch(){
    const val=localStorage.getItem("users");
    const val2=JSON.parse(val);
    return val2;
}
regUser.value="";
regPassword.value="";


// setTimeout(()=>{
//     if(localStorage.getItem("currentUser")!==null){
//         localStorage.removeItem("currentUser");
//         window.location.reload();
//     }
// },180000);

regSubmit.addEventListener('click',(e)=>{
    e.preventDefault();

    // console.log(localStorage.getItem("users"));
    if(localStorage.getItem("users")!==null){
        const localStorageUse=JSON.parse(localStorage.getItem("users"));
        users=localStorageUse;
    }


    
    const uid=regUser.value.trim();
    const upass=regPassword.value.trim();
    console.log(upass);
    if(uid==="" || upass===""){
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
        totalSpend:0,
        isLogin:false,
        transactions:[],
    }
    users.push(newUser);
    regUser.value="";
    regPassword.value="";
    const val=JSON.stringify(users);
    const v2=JSON.parse(val);

    localStorage.setItem("users",val);
    removeAClass(registersuccess,'notshow');
    setTimeout(()=>{
        registersuccess.classList.add('notshow');
    },2000);
    setTimeout(()=>{
        addAClass(register,'notshow');
        removeAClass(login,'notshow');
    },2000);
    
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
                removeAClass(loginsuccess,'notshow');
                setTimeout(()=>{
                    addAClass(loginsuccess,'notshow');
                },2000);

                setTimeout(()=>{
                    addAClass(login,'notshow');
                    removeAClass(wallet,'notshow');
                },2000);
                
                
                walletspan.innerText=`${user.walletBalance}`;
                removeAClass(spendamountcard,'notshow');
                


                
                let userId1=JSON.stringify(user.id);
                localStorage.setItem('currentUser',userId1);
                window.location.reload();
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
            if(addmoneyinput.value<=0){
                alert("give a positive value please!");
                return;
            }
            const val=parseFloat(addmoneyinput.value);
            const curr= localetoOriginal("currentUser");
            users=userfetch();
            const userone=userinfo(curr);
            const val2=userone.walletBalance;
            const newval=val+val2;
            userone.walletBalance=newval;
            const transactionmessage=`Added money ${val}      | ${new Date()}`;
            userone.transactions.push(transactionmessage);
            let nuser=[];
            const nus=users.map((user)=>{ if(user.id!==curr){
                nuser.push(user);
            }});
            nuser.push(userone);
            // console.log(nuser);
            users=nuser;
            const st=JSON.stringify(users);
            localStorage.setItem("users",st);
            removeAClass(addmoneysuccess,'notshow');
            setTimeout(()=>{addAClass(addmoneysuccess,'notshow');},1000);

            setTimeout(()=>{
                window.location.reload();
            },1000);
            
            
        }
        else{
            alert("please give a number");
        }
    }
});


let product=[];


function fetchproduct(){
    if(localStorage.getItem("product")===null){
        product=[];
    }
    else{
        product = JSON.parse(localStorage.getItem("product"));
    }
}

addproductbtn.addEventListener('click',(e)=>{card
    e.preventDefault();
    
    const namep=addproductname.value.trim();
    const pricep=addproductprice.value.trim();
    if(isNumber(pricep)===true){
        if(namep.length===0 || pricep.length===0 || parseFloat(pricep)<=0 ){
            alert("give product name and price");
        }
        else{

            const obj2={
                name:namep,
                price:pricep
            }
            fetchproduct();
            // console.log("ama");
            product.push(obj2);
            const str=JSON.stringify(product);
            localStorage.setItem("product",str);
            window.location.reload();

        }
    }
    else{
        alert("price is a number");
    }
});

fetchproduct();

if(product.length){
    let ii=0;

    card.innerHTML=``;
    product.forEach((pro)=>{
        const divone=document.createElement('div');
        const val2=`pro-${ii}`;
        divone.innerHTML=`<p>${pro.name}</p>
        <p>$ ${pro.price}</p>
        <button type="submit" id=${val2}>Buy</button>

        `;

        card.appendChild(divone);

        const val3=document.getElementById(val2);

        val3.addEventListener('click',(e)=>{
            e.preventDefault();
            users=userfetch();
            let val4=JSON.parse(localStorage.getItem("currentUser"));
            let userone=userinfo(val4);
            let balanceone=userone.walletBalance;
            const priceofproduct = parseFloat(pro.price);
            if(balanceone>=priceofproduct){
                let newbalance=balanceone-priceofproduct;
                let narr=[];
                users.forEach((user)=>{
                    if(user.id!==val4){
                        narr.push(user);
                    }
                });
                
                let previousSpend=parseFloat(userone.totalSpend)+parseFloat(pro.price);
                userone.totalSpend=previousSpend;
                userone.walletBalance=newbalance;
                const transactionmessage=`purchase ${pro.name} using $ ${priceofproduct}  |   ${new Date()}`;
                userone.transactions.push(transactionmessage);
                narr.push(userone);
                users=narr;
                localStorage.setItem("users",JSON.stringify(users));
                window.location.reload();
            }
            else{
                alert("insuffient balance");
            }


        });
        ii++;
        
        
        // console.log(card);
    });
}

if(localStorage.getItem("currentUser")!==null){
    const useridone = localetoOriginal("currentUser");
    const useroneinfo = userinfo(useridone);
    const message = useroneinfo.transactions;
    
    if(message.length!==0){
        message.reverse();
        let cntone=0;
        let arr=[];
        
        message.forEach((m)=>{
            if(cntone<5){
                arr.push(m);
            }

            cntone++;
        });
        arr.reverse();
        

        // transactiondiv
        removeAClass(transactiondiv,"notshow");
        transactiondiv.innerText="aaaa";

        transactiondiv.innerHTML=``;

        arr.forEach((e)=>{
            const cardtwo= document.createElement('div');
            cardtwo.classList.add("givemargin");
            cardtwo.innerText=e;
            transactiondiv.appendChild(cardtwo);
        });




    }
    
}