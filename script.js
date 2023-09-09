let notes = [];
let submitBtn = document.getElementById('submitBtn');
let container = document.querySelector('.container');
let noteBody = document.getElementById('noteBody');
let search = document.getElementById('search');
let noteHeading = document.getElementById('noteHeading');


showData();
submitBtn.addEventListener('click', function(e){
  e.preventDefault();
  let save = localStorage.getItem('notes');
  if(save == null){
    notes = [];
  }else{
    notes = JSON.parse(save);
  }
  notes.push({
    head: noteHeading.value,
    body: noteBody.value
  });
  noteBody.value =""
  noteHeading.value =""
  localStorage.setItem('notes', JSON.stringify(notes));
  // console.log(notes);
  showData();
});

function showData(){
  let cardElement = "";
  let save = localStorage.getItem('notes');
  if(save == null){
    notes = [];
  }else{
    notes = JSON.parse(save);
  }
  notes.forEach(function(Element, idx){
    // console.log(idx)
    cardElement += `
    <div class="noteCard">
            <h2 class="heading" id="heading">${Element.head}</h2>
            <p class="body" id="body">${Element.body}</p>
            <button id="${idx}"  class="btn" onclick="deleteFun(this.id)">Delete</button>
        </div>
    `
  });
  if(notes.length != 0){
    container.innerHTML = cardElement
  }else{
    container.innerHTML = 'Nothing to show'
  };
};


function deleteFun(idx){
  let save = localStorage.getItem('notes');
  if(save == null){
    notes = [];
  }else{
    notes = JSON.parse(save);
  }

  notes.splice(idx, 1)
  localStorage.setItem('notes', JSON.stringify(notes));
  showData();
}





search.addEventListener('input', function(){
  let inputVal = search.value.toLowerCase()
  let headingEle = container.querySelectorAll('h2')
  headingEle.forEach(Element => {
   let modhead = Element.innerText;
   if(modhead.includes(inputVal)){
        Element.parentElement.style.display = 'block'
      }else{
        Element.parentElement.style.display = 'none'
      }
  })
  
})