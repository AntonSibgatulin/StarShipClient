// client/src/App.js

import React , { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  var host="https://localhost:9696";

  if(host.endsWith("/")){
    host = host.substring(0,host.length-2);
  }
  const result = useRef(null);
  const create = useRef(null);
  const update = useRef(null);
  const get = useRef(null);
  const deletes = useRef(null);
  const search = useRef(null);
  const preview_ship = useRef(null);
  const searchPanel = useRef(null);
  var lessThenCurret = useRef(null);
 var minimums = useRef(null)

 var marines = useRef(null);
  var searchType = 0;

  let inputDate = "2021-06-18";

const handleChange = (event) => {
  inputDate = event.target.value;
} 

  

  function onChangeSelectSearch(event){
    var doc = searchPanel.current;
    var a = Number(event.target.value);
    
    searchType = a;
    console.log(searchType);
    if(a==0){
      doc.querySelector("div[name='FindByName']").style="";
      doc.querySelector("div[name='FindByHealth']").style="display:none";
      doc.querySelector("div[name='FindByData']").style="display:none";
      doc.querySelector("div[name='FindByCategory']").style="display:none";
      doc.querySelector("div[name='FindByWeaponType']").style="display:none";
      doc.querySelector("div[name='FindByMeleeWeapon']").style="display:none";

    }
    
    if(a==1){
      doc.querySelector("div[name='FindByName']").style="display:none";
      doc.querySelector("div[name='FindByHealth']").style="";
      doc.querySelector("div[name='FindByData']").style="display:none";
      doc.querySelector("div[name='FindByCategory']").style="display:none";
      doc.querySelector("div[name='FindByWeaponType']").style="display:none";
      doc.querySelector("div[name='FindByMeleeWeapon']").style="display:none";

    }
    
    if(a==2){
      doc.querySelector("div[name='FindByName']").style="display:none";
      doc.querySelector("div[name='FindByHealth']").style="display:none";
      doc.querySelector("div[name='FindByData']").style="";
      doc.querySelector("div[name='FindByCategory']").style="display:none";
      doc.querySelector("div[name='FindByWeaponType']").style="display:none";
      doc.querySelector("div[name='FindByMeleeWeapon']").style="display:none";

    }
    
    if(a==3){
      doc.querySelector("div[name='FindByName']").style="display:none";
      doc.querySelector("div[name='FindByHealth']").style="display:none";
      doc.querySelector("div[name='FindByData']").style="display:none";
      doc.querySelector("div[name='FindByCategory']").style="";
      doc.querySelector("div[name='FindByWeaponType']").style="display:none";
      doc.querySelector("div[name='FindByMeleeWeapon']").style="display:none";

    }

    if(a==4){
      doc.querySelector("div[name='FindByName']").style="display:none";
      doc.querySelector("div[name='FindByHealth']").style="display:none";
      doc.querySelector("div[name='FindByData']").style="display:none";
      doc.querySelector("div[name='FindByCategory']").style="display:none";
      doc.querySelector("div[name='FindByWeaponType']").style="";
      doc.querySelector("div[name='FindByMeleeWeapon']").style="display:none";

    }

    if(a==5){
      doc.querySelector("div[name='FindByName']").style="display:none";
      doc.querySelector("div[name='FindByHealth']").style="display:none";
      doc.querySelector("div[name='FindByData']").style="display:none";
      doc.querySelector("div[name='FindByCategory']").style="display:none";
      doc.querySelector("div[name='FindByWeaponType']").style="display:none";
      doc.querySelector("div[name='FindByMeleeWeapon']").style="";

    }
    
    
  }


 
  function getSpaceMarineById(){
   
  }

  function clearResult (){
   result.current.innerHTML = "";
  }




  function searchFun(){



    var nxml = "";

    var sortXML = "<sortBy>"+searchPanel.current.querySelector("select[name='sortBy']").value+"</sortBy>";

    var size = Number(searchPanel.current.querySelector("input[name='size']").value)
    var page = Number(searchPanel.current.querySelector("input[name='page']").value)

    if(isNaN(size) || Number(size)<3){
      size = 10;
    }

    
    if(isNaN(page)){
      page = 1;
    }




    if(searchType==0){

       nxml  = "<name>"+searchPanel.current.querySelector("input[name='name']").value+"</name>"
    }
    if(searchType==1){     
      nxml  = "<health>"+searchPanel.current.querySelector("input[name='health']").value+"</health>\n"+
      "<maxhealth>"+searchPanel.current.querySelector("input[name='maxhealth']").value+"</maxhealth>"
   
    }

    if(searchType==2){
      nxml  = "<creationDate>"+searchPanel.current.querySelector("input[name='calendar']").value+"T00:00:00.00Z</creationDate>"
    }
    
     if(searchType==3){
       nxml  = "<category>"+searchPanel.current.querySelector("select[name='category']").value+"</category>"
    }
    if(searchType==4){
       nxml  = "<weaponType>"+searchPanel.current.querySelector("select[name='weaponType']").value+"</weaponType>"
    }
    if(searchType==5){
      nxml  = "<meleeWeapon>"+searchPanel.current.querySelector("select[name='meleeWeapon']").value+"</meleeWeapon>"
    }

    var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    "<SpaceMarineFilterRequest>\n" +
    "    <page>"+page+"</page>\n" +
    "    <limit>"+size+"</limit>\n" +
    "    <id>1</id>\n" +nxml+"\n"+
   sortXML+"\n"+
    "</SpaceMarineFilterRequest>";
   



    fetch(host+"/spacemarines/search", {
      method: 'POST', // Default is 'get'
      body: xml,
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
     /* result.current.innerHTML= text;*/
          if(!checkOnError(text)){
            showSpaceMarines(text);
          }
    });

  }





  function createSpaceMarine(){

    var doc = create.current;
    var name = doc.querySelector("input[name='name']").value;
    var x = doc.querySelector("input[name='x']").value;
    var y = doc.querySelector("input[name='y']").value;
    var health = doc.querySelector("input[name='health']").value;
    var category = doc.querySelector("select[name='category']").value;
     var shipId = doc.querySelector("input[name='shipId']").value;





    var err = false;

      if(name.length == 0){
      doc.querySelector("input[name='name']").style="background-color: antiquewhite;"
      err= true;}

    if(x.length == 0){
      doc.querySelector("input[name='x']").style="background-color: antiquewhite;"
      err= true;}


    if(y.length == 0){
      doc.querySelector("input[name='y']").style="background-color: antiquewhite;"
      err= true;}


    if(health.length == 0 || isNaN(Number(health)) || Number(health)<=0){
      doc.querySelector("input[name='health']").style="background-color: antiquewhite;"
      err= true;
      doc.querySelector("input[name='health']").value="100";
    }


   

    if(shipId.length == 0){
      doc.querySelector("input[name='shipId']").style="background-color: antiquewhite;"
      err= true;}

if(err){
  return;
}





    var xml = "<starship>\n" +
    "    <name>"+name+"</name>\n" +
    "    <length>"+health+"</length>\n" +
    "    <width>"+x+"</width>\n" +
    "    <starShipType>"+category+"</starShipType>\n" +
    "    <campacity>"+shipId+"</campacity>\n" +
    "    <height>"+y+"</height>\n" +
    "</starship>";


    fetch(host+"/starships/create", {
      method: 'POST', // Default is 'get'
      body: xml,
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
      setTimeout(function(){console.log(text)},500)
      
     /* result.current.innerHTML= text;*/
          if(!checkOnError(text)){
            getSpaceMarineFromXml(text);
          }
    });
    

  }



  
  function getSpaceMarineFromXml(xml){

    const parser = new DOMParser();
    const docs = parser.parseFromString(xml, "application/xml");

  
   
    var main = query(docs,"starship")
   
  var id = main.querySelector("id").innerHTML;
  
   
  if(isNaN(Number(id)))return;


    fetch(host+"/starships/get/"+id, {
      method: 'GET', // Default is 'get'
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
        showSpaceMarine(text);
    });
    


  }







  
  function getSpaceMarineFromXmls(xml){

    const parser = new DOMParser();
    const docs = parser.parseFromString(xml, "application/xml");

  
   
    var main = query(docs,"SpaceMarine")
   
  var id = main.querySelector("id").innerHTML;
  
   
  if(isNaN(Number(id)))return;


    fetch(host+"/spacemarines/get/"+id, {
      method: 'GET', // Default is 'get'
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
        showSpaceMarines(text);
    });
    


  }



  function checkOnError(xml){

    const parser = new DOMParser();
    const docs = parser.parseFromString(xml, "application/xml");


    if(docs.querySelector("action")!= null){
      var errorcode = docs.querySelector("action").querySelector("code").innerHTML;

      
        alert(docs.querySelector("action").querySelector("text").innerHTML+" "+docs.querySelector("action").querySelector("code").innerHTML)
      
        result.current.innerHTML = docs.querySelector("action").querySelector("text").innerHTML+" "+docs.querySelector("action").querySelector("code").innerHTML;

      return true;
    }else{
      return false;
    }
  }

  // showSpaceMarine(text);


  function loadById(){
    var doc = update.current;
    var id = doc.querySelector("input[name='id']").value;
    fetch(host+"/spacemarines/get/"+id, {
      method: 'GET', // Default is 'get'
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
      initLoadById(text);
    });
    
  }
  function initLoadById(xml){
    const parser = new DOMParser();
    const docs = parser.parseFromString(xml, "application/xml");


    if(checkOnError(xml))
    return;
    var doc = update.current;
    
    var main = query(docs,"SpaceMarineResponse")

   doc.querySelector("input[name='name']").value = main.querySelectorAll("name")[2].innerHTML;
    doc.querySelector("input[name='x']").value= main.querySelector("coordinates").querySelector("x").innerHTML;
    doc.querySelector("input[name='y']").value =main.querySelector("coordinates").querySelector("y").innerHTML;;
    doc.querySelector("input[name='health']").value =  main.querySelector("health").innerHTML;
    doc.querySelector("select[name='category']").value= main.querySelector("category").innerHTML;
    doc.querySelector("select[name='weaponType']").value= main.querySelector("weaponType").innerHTML;
    doc.querySelector("select[name='meleeWeapon']").value= main.querySelector("meleeWeapon").innerHTML;

    doc.querySelector("input[name='cname']").value=main.querySelector("chapter").querySelector("name").innerHTML;
    doc.querySelector("input[name='pname']").value=main.querySelector("chapter").querySelector("parentLegion").innerHTML;
    doc.querySelector("input[name='marinesCount']").value=main.querySelector("chapter").querySelector("marinesCount").innerHTML
    doc.querySelector("input[name='world']").value=main.querySelector("chapter").querySelector("world").innerHTML;
    doc.querySelector("input[name='shipId']").value=main.querySelector("starship").querySelector("id").innerHTML;;
     

  }
  function query(main,text){
    return main.querySelector(text)

  }







  

  function updateSpaceMarine(){
    clearResult();
    var doc = update.current;
    var id = doc.querySelector("input[name='id']").value;
    var name = doc.querySelector("input[name='name']").value;
    var x = doc.querySelector("input[name='x']").value;
    var y = doc.querySelector("input[name='y']").value;
    var health = doc.querySelector("input[name='health']").value;
    var category = doc.querySelector("select[name='category']").value;
    var weaponType = doc.querySelector("select[name='weaponType']").value;
    var meleeWeapon = doc.querySelector("select[name='meleeWeapon']").value;

    var cname = doc.querySelector("input[name='cname']").value
    var pname = doc.querySelector("input[name='pname']").value
    var marinesCount = doc.querySelector("input[name='marinesCount']").value;
    var world = doc.querySelector("input[name='world']").value;
    var shipId = doc.querySelector("input[name='shipId']").value;

    var err = false;

    if(id.length == 0){
      doc.querySelector("input[name='id']").style="background-color: antiquewhite;"
    err= true;
    }

    if(name.length == 0){
      doc.querySelector("input[name='name']").style="background-color: antiquewhite;"
      err= true;}

    if(x.length == 0){
      doc.querySelector("input[name='x']").style="background-color: antiquewhite;"
      err= true;}


    if(y.length == 0){
      doc.querySelector("input[name='y']").style="background-color: antiquewhite;"
      err= true;}


    if(health.length == 0 || isNaN(Number(health)) || Number(health)<=0){
      doc.querySelector("input[name='health']").style="background-color: antiquewhite;"
      err= true;
      doc.querySelector("input[name='health']").value="100";
    }


    if(cname.length == 0){
      doc.querySelector("input[name='cname']").style="background-color: antiquewhite;"
      err= true;}

      if(pname.length == 0){
        doc.querySelector("input[name='pname']").style="background-color: antiquewhite;"
        err= true;}
  


    if(marinesCount.length == 0){
      doc.querySelector("input[name='marinesCount']").style="background-color: antiquewhite;"
      err= true;}


    if(world.length == 0){
      doc.querySelector("input[name='world']").style="background-color: antiquewhite;"
      err= true;}


    if(shipId.length == 0){
      doc.querySelector("input[name='shipId']").style="background-color: antiquewhite;"
      err= true;}

if(err){
  return;
}


    var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    "<SpaceMarine>\n" +
    "    <id>"+id+"</id>\n" +
    "    <name>"+name+"</name>\n" +
    "    <coordinates>\n" +
    "        <x>"+x+"</x>\n" +
    "        <y>"+y+"</y>\n" +
    "    </coordinates>\n" +
    "    <health>"+health+"</health>\n" +
    "    <category>"+category+"</category>\n" +
    "    <weaponType>"+weaponType+"</weaponType>\n" +
    "    <meleeWeapon>"+meleeWeapon+"</meleeWeapon>\n" +
    "    <chapter>\n" +
    "        <name>"+cname+"</name>\n" +
    "        <parentLegion>"+pname+"</parentLegion>\n" +
    "        <marinesCount>"+marinesCount+"</marinesCount>\n" +
    "        <world>"+world+"</world>\n" +
    "    </chapter>\n" +
    "    <starshipId>"+shipId+"</starshipId>\n" +
    "</SpaceMarine>\n";


    fetch(host+"/spacemarines/update/"+id, {
      method: 'PUT', // Default is 'get'
      body: xml,
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
      //result.current.innerHTML= text;
      if(!checkOnError(text)){
        getSpaceMarineFromXml(text);
      }
    });
    

  }


  function getSpaceMarine(){
    var doc = get.current;
  var id = doc.querySelector("input[name='id']").value;
  if(isNaN(Number(id)))return;


    fetch(host+"/starships/"+id+"/unload-all", {
      method: 'PUT', // Default is 'get'
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
        showSpaceMarine(text);
    });
    

  }


  function showSpaceMarine(xml){
    const parser = new DOMParser();
    const docs = parser.parseFromString(xml, "application/xml");


    if(checkOnError(xml))return;
    var doc = preview_ship.current;
   
    var main = docs;// query(docs,"SpaceMarineResponse")

   

    doc.querySelector("div[name='shipId']").innerHTML="Id: "+main.querySelector("starship").querySelector("id").innerHTML;
    doc.querySelector("div[name='sname']").innerHTML="Name: "+main.querySelector("starship").querySelector("name").innerHTML;
    doc.querySelector("div[name='campacity']").innerHTML="Campacity: "+main.querySelector("starship").querySelector("campacity").innerHTML;
    doc.querySelector("div[name='length']").innerHTML="Length: "+main.querySelector("starship").querySelector("length").innerHTML
    doc.querySelector("div[name='width']").innerHTML="Width: "+main.querySelector("starship").querySelector("width").innerHTML;
    doc.querySelector("div[name='height']").innerHTML="Height: "+main.querySelector("starship").querySelector("height").innerHTML;
    doc.querySelector("div[name='starShipType']").innerHTML="StarShipType: "+main.querySelector("starship").querySelector("starShipType").innerHTML;
    

    preview_ship.current.style="";
    result.current.innerHTML = preview_ship.current.innerHTML;
    preview_ship.current.style="display:none";
  }







  

  function showSpaceMarines(xml){
    const parser = new DOMParser();
    const docs = parser.parseFromString(xml, "application/xml");

    
    if(checkOnError(xml))return;


    result.current.innerHTML = "";
    var doc = preview_ship.current;
   var elemento = docs.querySelector("SpaceMarines");

console.log(xml)
for(var i = 0 ;i<elemento.querySelectorAll("SpaceMarine").length;i++){
    var main = elemento.querySelectorAll("SpaceMarine")[i];

   doc.querySelector("div[name='id']").innerHTML = "Id "+main.querySelectorAll("id")[1].innerHTML;
   
   doc.querySelector("div[name='name']").innerHTML ="Name: "+ main.querySelectorAll("name")[2].innerHTML;
    doc.querySelector("div[name='x']").innerHTML= "X: "+main.querySelector("coordinates").querySelector("x").innerHTML;
    doc.querySelector("div[name='y']").innerHTML ="Y: "+main.querySelector("coordinates").querySelector("y").innerHTML;;
    doc.querySelector("div[name='health']").innerHTML = "Health: "+ main.querySelector("health").innerHTML;
    doc.querySelector("select[name='category']").innerHTML= "<option>"+main.querySelector("category").innerHTML+"</option>";
    doc.querySelector("select[name='weaponType']").innerHTML= "<option>"+main.querySelector("weaponType").innerHTML+"</option>";
    doc.querySelector("select[name='meleeWeapon']").innerHTML= "<option>"+main.querySelector("meleeWeapon").innerHTML+"</option>";

    
    
    doc.querySelector("div[name='cname']").innerHTML="Name: "+main.querySelector("chapter").querySelector("name").innerHTML;
    doc.querySelector("div[name='pname']").innerHTML="parentLegion: "+main.querySelector("chapter").querySelector("parentLegion").innerHTML;
    doc.querySelector("div[name='marinesCount']").innerHTML="Count of marine: "+main.querySelector("chapter").querySelector("marinesCount").innerHTML
    doc.querySelector("div[name='world']").innerHTML="World name: "+main.querySelector("chapter").querySelector("world").innerHTML;
    doc.querySelector("div[name='shipId']").innerHTML="ShipId: "+main.querySelector("starship").querySelector("id").innerHTML;;
   


    if(main.querySelector("starship").querySelector("name").innerHTML!="null"){

    doc.querySelector("div[name='sname']").innerHTML="Name: "+main.querySelector("starship").querySelector("name").innerHTML;
    doc.querySelector("div[name='campacity']").innerHTML="Campacity: "+main.querySelector("starship").querySelector("campacity").innerHTML;
    doc.querySelector("div[name='length']").innerHTML="Length: "+main.querySelector("starship").querySelector("length").innerHTML
    doc.querySelector("div[name='width']").innerHTML="Width: "+main.querySelector("starship").querySelector("width").innerHTML;
    doc.querySelector("div[name='height']").innerHTML="Height: "+main.querySelector("starship").querySelector("height").innerHTML;
    doc.querySelector("div[name='starShipType']").innerHTML="StarShipType: "+main.querySelector("starship").querySelector("starShipType").innerHTML;
    }
    preview_ship.current.style="";
    result.current.innerHTML += preview_ship.current.innerHTML;
    preview_ship.current.style="display:none";
}
  }















  
  function deleteSpaceMarine(){
    var doc = deletes.current;
  var id = doc.querySelector("input[name='id']").value;
  if(isNaN(Number(id)))return;


    fetch(host+"/spacemarines/delete/"+id, {
      method: 'DELETE', // Default is 'get'
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
      checkOnError(text);
    });
    

  }

  function buttonCreate(){
    create.current.style="";
    update.current.style="display:none";
    get.current.style="display:none";
    deletes.current.style="display:none";
    

    
   
    marines.current.style="display:none";





    clearResult();
  }


  function buttonUpdate(){
    create.current.style="display:none";
    update.current.style="";
    get.current.style="display:none";
    deletes.current.style="display:none";
    
    
   
    marines.current.style="display:none";

    clearResult();
    
  }

  function buttonGet(){
    create.current.style="display:none";
    update.current.style="display:none";
    get.current.style="";
    deletes.current.style="display:none";
    
    
   
    marines.current.style="display:none";

    clearResult();
    
  }

  function buttonDelete(){
    create.current.style="display:none";
    update.current.style="display:none";
    get.current.style="display:none";
    
    
   
    marines.current.style="display:none";

    deletes.current.style="";
    clearResult();
    
  }


  function searchButton(){
    create.current.style="display:none";
    update.current.style="display:none";
    get.current.style="display:none";
    searchPanel.current.style="";
    deletes.current.style="display:none";
    
   
    marines.current.style="display:none";

    clearResult();
  }


  function lessThenCurretFun(){
    create.current.style="display:none";
    update.current.style="display:none";
    get.current.style="display:none";
    
    deletes.current.style="display:none";
    lessThenCurret.current.style="";
   
    marines.current.style="display:none";
    
  }


  function minimumsFun(){
    create.current.style="display:none";
    update.current.style="display:none";
    get.current.style="display:none";
    
    deletes.current.style="display:none";
    
    minimums.current.style="";
    marines.current.style="display:none";

  }

  function marinesFun(){
    marines.current.style="";
    create.current.style="display:none";
    update.current.style="display:none";
    get.current.style="display:none";
    
    deletes.current.style="display:none";
    
   
    
  }




  function marinesFunS(){

    var SpaceMarineId = marines.current.querySelector("input[name='SpaceMarineId']").value;
    var StarShipId = marines.current.querySelector("input[name='StarShipId']").value;
    //console.log(value)
    fetch(host+"/starships/"+StarShipId+"/enter/"+SpaceMarineId, {
      method: 'POST', // Default is 'get'
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/xml'
      })
    })
    .then(response => response.text())
    .then((text) => {
     
     /* result.current.innerHTML= text;*/
          if(!checkOnError(text)){
            
            
            const parser = new DOMParser();
            const docs = parser.parseFromString(text, "application/xml");
        
        
            if(checkOnError(text))return;


            alert("Count of Marine "+docs.querySelector("SpaceMarines").querySelector("SpaceMarine").querySelector("spaceMarineCount").innerHTML)
            result.current.innerHTML="Count of Marine "+docs.querySelector("SpaceMarines").querySelector("SpaceMarine").querySelector("spaceMarineCount").innerHTML;


            
          }
    });
    


  }


  function lessTheCurret(){


  

  }

  function Minimum(){

  }

  function Marines(){

  }
  return (
    
    <div className="App">
    <div class="main-panel">
    <a onClick={buttonCreate}>Create</a>
      <a onClick={buttonGet}>UnloadAll</a>
      
      <a onClick={marinesFun}>Enter</a>
      
      <a href="https://se.ifmo.ru/~s282365/soa21/">SpaceMarine</a>
      
    </div>
    <div id="container">

      <div class="create" ref={create} id="create" >
        <div class="flex-center">
          <input type="text" placeholder="Name" name="name" />
        </div>
  
          <div class="flex-left">
            <input type="number" placeholder="width" name="x" />
          </div>
          <div class="flex-left">
            <input type="number" placeholder="height" name="y" />
          </div>
  



        <div class="flex-center">
          <input type="number" placeholder="Length" name="health" max={1000} min={1} />
        </div>
        

        <div class="flex-center">
          <select name="category">
            <option value="FRIGATE" selected>FRIGATE</option>
            <option value="BATTLESHIP">BATTLESHIP</option>
            <option value="CRUISER">CRUISER</option>
          </select>
        </div>

       
       

        <div class="flex-center">
            <input type="number" placeholder="Campacity" name="shipId" min={1}/>
          </div>

        <div class="flex-center">
            <a class="button" onClick={createSpaceMarine}>Create</a>
          </div>

      </div>





      <div class="create" id="update" ref={update} style={{display:"none"}}>
      <div class="flex-center">
          <input type="number" placeholder="id" name="id" />
          <a class="button" onClick={loadById}>load</a>
        </div>
        <div class="flex-center">
          <input type="text" placeholder="Name" name="name" />
        </div>
        <div class="block">
          <div class="flex-left margin-left"> Coordinates </div>
          <div class="flex-center">
            <input type="number" placeholder="x" name="x" />
          </div>
          <div class="flex-center">
            <input type="number" placeholder="y" name="y" />
          </div>
        </div>
        <div class="flex-center">
          <input type="number" placeholder="health" name="health" max={1000} min={1} />
        </div>
        <div class="flex-center">
          <select name="category">
            <option value="DREADNOUGHT" selected>DREADNOUGHT</option>
            <option value="AGGRESSOR">AGGRESSOR</option>
            <option value="SUPPRESSOR">SUPPRESSOR</option>
          </select>
        </div>
        <div class="flex-center">
          <select name="weaponType">
            <option value="BOLTGUN" selected>BOLTGUN</option>
            <option value="MELTAGUN">MELTAGUN</option>
            <option value="MISSILE_LAUNCHER">MISSILE_LAUNCHER</option>
          </select>
        </div>
        <div class="flex-center">
          <select name="meleeWeapon">
            <option value="CHAIN_AXE" selected>CHAIN_AXE</option>
            <option value="MANREAPER">MANREAPER</option>
            <option value="LIGHTING_CLAW">LIGHTING_CLAW</option>
            <option value="POWER_FIST">POWER_FIST</option>
          </select>
        </div>
        <div class="block">
          <div class="flex-left margin-left"> Chapter </div>
          <div class="flex-center">
            <input type="text" placeholder="name" name="cname" />
          </div>
          <div class="flex-center">
            <input type="text" placeholder="parentLegion" name="pname" />
          </div>
          <div class="flex-center">
            <input type="number" placeholder="marinesCount" name="marinesCount" />
          </div>
          <div class="flex-center">
            <input type="text" placeholder="world" name="world" />
          </div>
        </div>

        <div class="flex-center">
            <input type="number" placeholder="shipId" name="shipId" />
          </div>
        <div class="flex-center">
            <a class="button" onClick={updateSpaceMarine}>Update</a>
          </div>

      </div>
    

    
      <div class="create" style={{display:"none"}} ref={get} id="get">
        <div class="flex-center">
            <input type="number" placeholder="id" name="id" />
        </div>
      <div class="flex-center">
            <a class="button" onClick={getSpaceMarine}>UnloadAll</a>
          </div>
      </div>



      <div class="create" style={{display:"none"}} ref={deletes} id="delete">
        <div class="flex-center">
            <input type="number" placeholder="id" name="id" />
        </div>
      <div class="flex-center">
            <a class="button" onClick={deleteSpaceMarine} style={{background:"red"}}>Delete</a>
          </div>
      </div>



<div class="create" ref={marines}  style={{display:"none"}}>
<div class="flex-center">
<input type="number" min={0} placeholder="SpaceMarineId" name="SpaceMarineId" />
        
        </div>

        <div class="flex-center">
<input type="number" min={0} placeholder="StarShipId" name="StarShipId" />
        
        </div>

        
      <div class="flex-center">
        <a class="button" onClick={marinesFunS}>Enter</a>
      </div>
</div>






    </div>








<div style={{display:"none"}} ref={preview_ship}>
    <div id="preview_ship" class="SpaceMarineResponse" >



        <div class="flex-center">
            <div type="number" placeholder="shipId" name="shipId"></div>
          </div>
        

          <div class="block">
          <div class="flex-center margin-left"> Ship </div>
          <div class="flex-center">
            <div type="text" placeholder="name" name="sname"></div>
          </div>
          <div class="flex-left">
            <div type="text" placeholder="parentLegion" name="campacity"></div>
          </div>
          <div class="flex-left">
            <div type="number" placeholder="marinesCount" name="length"></div>
          </div>
          <div class="flex-left">
            <div type="text" placeholder="world" name="width"></div>
          </div>

          <div class="flex-left">
            <div type="text" placeholder="world" name="height"></div>
          </div>


          <div class="flex-left">
            <div type="text" placeholder="world" name="starShipType"></div>
          </div>


        </div>



      </div>


   
      </div>








   
    <div id="result" ref={result}>
    
    




      </div>


   
   



  </div>


  );
}

export default App;