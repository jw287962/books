

Book.prototype.toggleRead = function(){
if(this.read === 'Read') this.read = 'Not Read';
else if(this.read === 'Not Read') this.read = 'Read';

}

let myLibrary =[];

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const coilingDragon = new Book('Coiling Dragon', 'I Eat Tomato', 1000, true);
const RangersApprentice = new Book('Rangers Apprentice', 'John Flanagan', 352, true);



addBookToLibrary(myLibrary,theHobbit);
addBookToLibrary(myLibrary,coilingDragon);
addBookToLibrary(myLibrary,RangersApprentice);

const addNewButton = document.getElementById('submitNewBook');
var Buttons = document.querySelectorAll('button');
var hasSubmit = false;
let clickButton = document.querySelectorAll('button');

const formButton = document.querySelector('.toggleform');

    findClickedButton();
    var toggle = false;
formButton.addEventListener('click', e =>{
    const form = document.querySelector('form');
  
    if(!toggle){
    form.setAttribute('id','active');
    toggle=true;
    }
    else{
        form.removeAttribute('id','active');
        toggle = false;
    }
});

// await click of add book

addNewButton.addEventListener('submit', e => {
    //gets form data
    hasSubmit = true;
    const title = document.getElementById("title").value;
  
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    const hasRead = haveRead(read);
    const newBook = new Book(title,author,pages,hasRead);
   addBookToLibrary(myLibrary,newBook);
   clickButton = document.querySelectorAll('button');
  
   findClickedButton();
    e.preventDefault();
});

let hasEventListener = false;

function findClickedButton(){
   
for (const clickButtons of clickButton)  {

    const handleButtonClicks = (e) =>
    {
 
        deleteButton(clickButtons,e);
        toggleReadButton(clickButtons,e,myLibrary);
    };

//    checks if an event has an eventlistener by adding an ID to it when it does
        if(!(clickButtons.id === 'added')){
        clickButtons.addEventListener('click', handleButtonClicks);
        }
        clickButtons.setAttribute('id','added')
    }
}


function deleteButton(clickButtons,e){
   
                    
                    if(clickButtons.textContent === 'Delete'){
                        const bookTitle =  e.composedPath()[2].firstChild.textContent;
                        const bookAuthor =  e.composedPath()[2].firstChild.nextSibling.textContent;

                    removeFromLibrary(myLibrary,bookTitle,bookAuthor);

                    e.composedPath()[2].remove()

                        e.preventDefault();
                    } 
                    
              
            
           
    }
    
function toggleReadButton(clickButtons,e,myLibrary){
  
    const bookTitle = clickButtons.parentElement.parentElement.firstChild.textContent;
    const bookAuthor = clickButtons.parentElement.parentElement.firstChild.nextSibling.textContent;  
   if(clickButtons.textContent.includes('Read')){
                        
            
            
              
           var count = 0;
            for (const books of myLibrary) { 
                if(books.title === bookTitle && books.author === bookAuthor){
                  myLibrary[count].toggleRead();
                   }
                if(clickButtons.textContent === 'Read'){
                    clickButtons.textContent = 'Not Read';
               
               
            }else if(clickButtons.textContent === 'Not Read'){
                clickButtons.textContent = 'Read';

            }
            
            count++
            }
           

        }
        
    }




// Funcitons Called
function removeFromLibrary(myLibrary,bookTitle,bookAuthor){
    var count = 0; 
    for (const books of myLibrary) { 
    
        if(books.title === bookTitle){
        if(books.author === bookAuthor){
            myLibrary.splice(count,1);
            console.log('true');
        };
    }
            count++;
    }
    event.preventDefault();
}


function Book(title, author, pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    
  
    this.read = haveRead(read);
}


function haveRead(read){
    if(read === false){ return 'Not Read';}
    else {
     return 'Read';
    };
}

//adds to Library
function addBookToLibrary(myLibrary,book){
    myLibrary.push(book);

    updateTable(myLibrary,book);
}

//Adds library to table in html
function updateTable(library,book){
    const table = document.getElementById("books");
    const array =  Object.values(book);

    const newTableRow =   document.createElement("tr");
    //Only for delete button
    const newTableData =   document.createElement("td");
    const newButtonText = document.createTextNode('Delete');
    const deleteButton = document.createElement('button');
    //array is the book. each element is added to the columns of a row
    array.forEach(bookDetail => {
        var toggleButton = document.createElement('button');
         //each col of the row is added. 
         if(bookDetail.toString().includes('Read')){
            const newTableData = document.createElement("td");
        var tableRowText = document.createTextNode(bookDetail);
        toggleButton.appendChild(tableRowText);
        newTableData.appendChild(toggleButton);
        newTableRow.appendChild(newTableData);
          
        }else{
        const newTableData = document.createElement("td");
        var tableRowText = document.createTextNode(bookDetail);
        newTableData.appendChild(tableRowText);
   
        newTableRow.appendChild(newTableData);
        }
    });
    deleteButton.appendChild(newButtonText);
    newTableData.appendChild(deleteButton);
    newTableRow.appendChild(newTableData)
    table.appendChild(newTableRow);

}


