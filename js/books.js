

Book.prototype.getTitle = function(){
    return this.title;
}

Book.prototype.getAuthor = function(){
    return this.author;
}
Book.prototype.getPages = function(){
    return this.pages;
}
Book.prototype.hasRead = function(){
    return this.read;
}






let myLibrary =[];

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const coilingDragon = new Book('Coiling Dragon', 'I Eat Tomato', 1000, true);
const RangersApprentice = new Book('Rangers Apprentice', 'John Flanagan', 352, true);
addBookToLibrary(myLibrary,theHobbit);
addBookToLibrary(myLibrary,coilingDragon);
addBookToLibrary(myLibrary,RangersApprentice);

const addNewButton = document.getElementById('submitNewBook');
let deleteButton = document.querySelectorAll('button');
removeAll(deleteButton);
// await click of add book
addNewButton.addEventListener('submit', e => {
    var title = document.getElementById("title").value;
  
    var author = document.getElementById("author").value;
    var pages = document.getElementById("pages").value;
    var hasRead = document.getElementById("read").value;
    hasRead = haveRead(hasRead);
    var newBook = new Book(title,author,pages,hasRead);
   addBookToLibrary(myLibrary,newBook);
   deleteButton = document.querySelectorAll('button');
   removeAll(deleteButton);
    event.preventDefault();
});




function removeAll(deleteButton){
   for (const deleteButtons of deleteButton) 
    {
    
            deleteButtons.addEventListener('click',e =>{
           var bookTitle =  e.composedPath()[2].firstChild.textContent;
           var bookAuthor =  e.composedPath()[2].firstChild.nextSibling.textContent;

            removeFromLibrary(myLibrary,bookTitle,bookAuthor);

            e.composedPath()[2].remove()

                event.preventDefault();
                });
        }
    }





// Funcitons Called
function removeFromLibrary(myLibrary,bookTitle,bookAuthor){
    var count = 0; 
    for (const books of myLibrary) { 
    
        if(books.title === bookTitle && books.author === bookAuthor){
            myLibrary.splice(count,count+1);
            console.log('true');
        };
     
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
    var array =  Object.values(book);

    const newTableRow =   document.createElement("tr");
    const newTableData =   document.createElement("td");
    const newButtonText = document.createTextNode('Delete');
    var newButton = document.createElement('button');
    //need to add delete button to table
    array.forEach(element => {
         
        const newTableData =   document.createElement("td");
        const tableRowText = document.createTextNode(element);
        newTableData.appendChild(tableRowText);

        newTableRow.appendChild(newTableData);
   
    });
    newButton.appendChild(newButtonText);
    newTableData.appendChild(newButton);
    newTableRow.appendChild(newTableData)
    table.appendChild(newTableRow);

}


