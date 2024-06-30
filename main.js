let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let total = document.getElementById('total');
let mood = 'create';
let tmp;

console.log(title,price,ads,discount,taxes,count,category,submit,total);



//get total


function gettotal(){
  if(price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
    total.innerHTML = result;
    total.style.background='#0875';
  }
  else{
    total.innerHTML = '';
    total.style.background='#a00d02';

  }
}

//creat product

let storge;
 if(localStorage.newpro !=null){
 storge = JSON.parse(localStorage.newpro)
 }else{
  storge =[];
 }

submit.onclick = function(){
  let products = {
      title:title.value,
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      count:count.value,
      category:category.value,
      total:total.innerHTML,
    }

if(title.value !=''
  && price.value != ''
  && category.value != ''
  && taxes.value != ''
  && ads.value != ''
  && discount.value != ''
  && products.count <100){
  if(mood==='create'){
    if(products.count=1){
     for(let i=0;i<products.count;i++){
      storge.push(products);
     }
  }
      else{
        storge.push(products);
      }
    }else{
storge[tmp]=products;
mood = 'create';
submit.innerHTML = 'Create';
count.style.display = 'block';
    }
    clearproduct()
}

      localStorage.setItem('newpro',JSON.stringify(storge))
      displayproduct();
}


 //clear product

function clearproduct(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}


//read product


function displayproduct (){
  gettotal()
  let data ='';
  for(let i=0 ; i<storge.length; i++){
    data+=`
    <tr>
    <td>${i+1}</td>
    <td>${storge[i].title}</td>
    <td>${storge[i].price}</td>
    <td>${storge[i].ads}</td>
    <td>${storge[i].taxes}</td>
    <td>${storge[i].discount}</td>
    <td>${storge[i].total}</td>
    <td>${storge[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
  <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
    </tr>
    `
}
document.getElementById('tbody').innerHTML=data;
let btnDelete = document.getElementById('deleteAll')
if(storge.length>0){
btnDelete.innerHTML = `
  <button onclick="deleteAll()">deleteAll(${storge.length})</button>
`
}else{
  btnDelete.innerHTML = '';
}
}
 displayproduct();


//delete

function deleteData(i){
storge.splice(i,1);
localStorage.newpro = JSON.stringify(storge);
displayproduct();
}


function deleteAll(){
  localStorage.clear();
  storge.splice(0)
  displayproduct();
}



//update

function updateData(i){
title.value = storge[i].title;
price.value = storge[i].price;
taxes.value = storge[i].taxes;
ads.value = storge[i].ads;
discount.value = storge[i].discount;
category.value = storge[i].category;
gettotal()
count.style.display = 'none';
submit.innerHTML = 'Update';
mood ='Update';
tmp = i;
scroll({
  top:0,
  behavior:'smooth',
})
}

//search


let searchMood = 'title';

function getSearchMood(id){
  let search = document.getElementById('search');
if(id == 'searchtitle'){
  searchMood = 'title';
  search.placeholder = 'search by title'
}else{
  searchMood = 'category';
  search.placeholder = 'search by category'

}
search.focus()
search.value = '';
displayproduct;

}


function searchData(value){
  let data = '';
if(searchMood == 'title'){
for(let i = 0; i < storge.length;i++){
  if(storge[i].title.includes(value)){
    data+=`
    <tr>
    <td>${i}</td>
    <td>${storge[i].title}</td>
    <td>${storge[i].price}</td>
    <td>${storge[i].ads}</td>
    <td>${storge[i].taxes}</td>
    <td>${storge[i].discount}</td>
        <td>${storge[i].total}</td>
    <td>${storge[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
  <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
    </tr>
    `
  }
}

}else{
  for(let i = 0; i < storge.length;i++){
    if(storge[i].category.includes(value)){
      data+=`
      <tr>
      <td>${i}</td>
      <td>${storge[i].title}</td>
      <td>${storge[i].price}</td>
      <td>${storge[i].ads}</td>
      <td>${storge[i].taxes}</td>
      <td>${storge[i].discount}</td>
      <td>${storge[i].total}</td>
      <td>${storge[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
      </tr>
      `
    }
  }
}
document.getElementById('tbody').innerHTML=data;
}


//clean




















