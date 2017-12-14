"use strict";

(function(){
  // creates a new object called xhr
  // which will handle the API call
  let xhr = new XMLHttpRequest();
  // console.log(`Current readyState: ${xhr.readyState}`);

  let queryBox = document.getElementById("wikiQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");
  let cSharp = document.getElementById("csharp");
  let Html = document.getElementById("html");
  let CSS3 = document.getElementById("css3");
  let JavaScript = document.getElementById("javaScript");
  let MySQL = document.getElementById("mySQL");
  let ASP = document.getElementById("asp.net");
  let Networking = document.getElementById("networking");
  let UML = document.getElementById("uml");

  // constructs the base for the request url
  let baseURL = "https://en.wikipedia.org/w/api.php? \
                format=json& \
                action=query& \
                generator=search& \
                gsrnamespace=0& \
                gsrlimit=1& \
                prop=info|extracts|langlinks|pageimages& \
                inprop=url& \
                exintro& \
                explaintext& \
                exsentences=1& \
                exlimit=max& \
                llprop=url& \
                lllimit=max& \
                piprop=thumbnail|name& \
                origin=*& \
                gsrsearch=";

/*
API Sandbox url
https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&generator=search&prop=extracts%7Clanglinks%7Cpageimages&gsrlimit=10&gsrnamespace=0&exintro&explaintext&exsentences=1&exlimit=max&llprop=url&lllimit=max&piprop=thumbnail|name&origin=*&gsrsearch=kittens
Request url
https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts%7Clanglinks%7Cpageimages&gsrlimit=10&gsrnamespace=0&exintro&explaintext&exsentences=1&exlimit=max&llprop=url&lllimit=max&piprop=thumbnail|name&origin=*&gsrsearch=kittens
*/
	
  cSharp.addEventListener("click", searchLanguage, false);
  
  function searchLanguage(){
	  // alert(cSharp.innerHTML);
	  console.log(queryBox.value);
	  queryBox.value = cSharp.innerHTML;
	  searchWiki();
  }
  
   Html.addEventListener("click", searchLanguage2, false);
  
  function searchLanguage2(){
	  // alert(cSharp.innerHTML);
	  queryBox.value = Html.innerHTML;
	  searchWiki();
  }
  
  CSS3.addEventListener("click", searchLanguage3, false);
  
  function searchLanguage3(){
	  // alert(cSharp.innerHTML);
	  queryBox.value = CSS3.innerHTML;
	  searchWiki();
  }
  
  JavaScript.addEventListener("click", searchLanguage4, false);
  
  function searchLanguage4(){
	  // alert(cSharp.innerHTML);
	  queryBox.value = JavaScript.innerHTML;
	  searchWiki();
  }
  MySQL.addEventListener("click", searchLanguage5, false);
  
  function searchLanguage5(){
	  // alert(cSharp.innerHTML);
	  queryBox.value = MySQL.innerHTML;
	  searchWiki();
  }
  
  ASP.addEventListener("click", searchLanguage6, false);
  
  function searchLanguage6(){
	  // alert(cSharp.innerHTML);
	  queryBox.value = ASP.innerHTML;
	  searchWiki();
  }
  
   Networking.addEventListener("click", searchLanguage7, false);
  
  function searchLanguage7(){
	  // alert(cSharp.innerHTML);
	  queryBox.value = Networking.innerHTML;
	  searchWiki();
  }
  
   UML.addEventListener("click", searchLanguage8, false);
  
  function searchLanguage8(){
	  // alert(cSharp.innerHTML);
	  queryBox.value = UML.innerHTML;
	  searchWiki();
  }
  
  function gatherData(data) {
    // console.log(data);
    // initialise some variables
    let theData = "";
    let langLinks = "";
    let img = "<img>";
    const languages = ["en", "de", "zh", "fr", "es", "ja", "ar", "ko", "el"];
    let k;
    let key;
    // loop through the result pages by pageid
    for(key in data.query.pages) {
      let tmp = data.query.pages[key];
      if (tmp.thumbnail) {
        img = `<img src="${tmp.thumbnail.source}" alt="${tmp.title}"> `;
      }
      let title = `<strong><a href="${tmp.fullurl}">${tmp.title}</a></strong>`;
      let extract = `<span class="txt">${tmp.extract}</span>`;
      let langLinks = "";
      for (k in tmp.langlinks) {
        if (languages.includes(tmp.langlinks[k].lang)) {
          langLinks += `<a href=${tmp.langlinks[k].url}>${tmp.langlinks[k].lang}</a> `;
        }
      }
      theData += `<p> ${title} ${extract} </p>`;
    }
    demoJSON.innerHTML = theData;
  }

  // the API call is triggered once the user submits a query
  searchForm.addEventListener("submit", searchWikiSubmit, false);
  
  
  function searchWiki(){
    // complete the request url
    let wiki = baseURL + queryBox.value;
    // open a connection to the requested API url
    xhr.open("GET", wiki, true);
    // be polite to Wikipedia
    xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
    // send off that request
    xhr.send();
    // if the response was ok, handle the response data using the gatherData function
    xhr.onreadystatechange = function() {
      // console.log(`Current readyState: ${xhr.readyState}`);
      if (xhr.readyState === 4 && xhr.status === 200) {
        // parse the response JSON
        let response = JSON.parse(xhr.responseText);
        // deal with the parsed JSON data
        gatherData(response);
      }
    };
    // clear the search box
    queryBox.value = "";

  }
  
  function searchWikiSubmit(ev){
    // complete the request url
    let wiki = baseURL + queryBox.value;
    // open a connection to the requested API url
    xhr.open("GET", wiki, true);
    // be polite to Wikipedia
    xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
    // send off that request
    xhr.send();
    // if the response was ok, handle the response data using the gatherData function
    xhr.onreadystatechange = function() {
      // console.log(`Current readyState: ${xhr.readyState}`);
      if (xhr.readyState === 4 && xhr.status === 200) {
        // parse the response JSON
        let response = JSON.parse(xhr.responseText);
        // deal with the parsed JSON data
        gatherData(response);
      }
    };
    // clear the search box
    queryBox.value = "";
	ev.preventDefault();
  }

}());
