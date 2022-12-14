

function Book(titles, author, pages,reads){
    //  read = haveRead(read);
    //  const changeRead = (newReadState) =>{
    //     read = newReadState;
    //  };
 
    function setNotRead(read){

            read.reads = 'NOT READ';
       
        }

  
   function setRead(read){
   
        read.reads = 'READ';
    }
     const getAuthor = () => {
        return author ; 
    };
     const getTitle = () => {
        return titles; 
    };
    const getRead = () =>{
        return reads;
    }
    function toggleRead(){
        var holder = this;
    
            if(getRead() === 'READ'){
                
               setNotRead(holder);
                
                }
            else if(getRead() === 'NOT READ'){
          
                setRead(holder);
            }
              
        }
    return {titles,author,pages,reads,getAuthor,getTitle,toggleRead};

   
}
// const Book = (title, author, pages,read) => {
//     var book =  Object.create(Book.proto);
//        read = haveRead(read);
//        book.title = title;
//     book.author = author;
//     book.pages = pages;
//     book.read = read;
//     // const {toggleRead} = Book.proto;
//     // return Object.assign(book,{toggleRead});
// return book;
// };




// Book.proto = {
//     toggleRead: function(){
       
//     if(this.read === 'READ') this.read = 'NOT READ';
//     else if(this.read === 'NOT READ') this.read = 'READ';
//     return this.read;
//     }};

let myLibrary =[];

const theHobbit = Book('The Hobbit', 'J.R.R. Tolkien', 295, 'NOT READ');
const coilingDragon = Book('Coiling Dragon', 'I Eat Tomato', 1000, 'READ');
const RangersApprentice = Book('Rangers Apprentice', 'John Flanagan', 352, 'READ');



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
  //toggle form
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
    const read = document.getElementsByName("read");
 
    const hasRead = checkRead(read);
    console.log(hasRead);
    const newBook =  Book(title,author,pages,hasRead);
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
// radio button checked
function checkRead(read){
    for (const hasRead of read){
      
if(hasRead.checked){
    return 'READ';
}
    else{
        return 'NOT READ';
    }
}

}

function deleteButton(clickButtons,e){
   
                    
                    if(clickButtons.textContent === 'DELETE'){
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
   if(clickButtons.textContent.includes('READ')){
   
           var count = 0;
            for (const books of myLibrary) { 
               
                if(books.getTitle() === bookTitle && books.getAuthor() === bookAuthor){
                  myLibrary[count].toggleRead();
            
                if(clickButtons.textContent === 'READ'){
                    clickButtons.textContent = 'NOT READ';
                    
               
            }else if(clickButtons.textContent === 'NOT READ'){
                clickButtons.textContent = 'READ';
              
               
            }
            
            
            }
            count++;
        }

        }
        
    }




// Funcitons Called
function removeFromLibrary(myLibrary,bookTitle,bookAuthor){
    var count = 0; 
    for (const books of myLibrary) { 
    
        if(books.getTitle() === bookTitle){
        if(books.getAuthor() === bookAuthor){
            myLibrary.splice(count,1);
            
        };
    }
            count++;
    }
    event.preventDefault();
}


// function Book(title, author, pages,read){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
    
  
//     this.read = haveRead(read);

    
// }



// function haveRead(read){
//     if(read === 'false'){ return 'NOT READ';}
//     else {
//      return 'READ';
//     };
// }

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
    const newButtonText = document.createTextNode('DELETE');
    const deleteButton = document.createElement('button');
    
    //array is the book. each element is added to the columns of a row
    array.forEach(bookDetail => {
        var toggleButton = document.createElement('button');
         //each col of the row is added. 
         if(typeof bookDetail === 'function'){
                
         }
         else if(bookDetail.toString().includes('READ')){
            
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
    deleteButton.setAttribute('class','delete');
}


