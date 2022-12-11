

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
console.log(myLibrary);




function Book(title, author, pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    
   if(read === false){ this.read = 'Not Read';}
   else {
    this.read = 'Read';
   };
}


//adds to Library
function addBookToLibrary(myLibrary,book){
    const table = document.getElementById("books");


    myLibrary.push(book);
    var array =  Object.values(book);
    const newTableRow =   document.createElement("tr");
 
    
    array.forEach(element => {
     console.log(element);
      
        const newTableData =   document.createElement("td");
        const tableRowText = document.createTextNode(element);
        newTableData.appendChild(tableRowText);

        newTableRow.appendChild(newTableData);

   
    });
    table.appendChild(newTableRow);
    

   
   
}

//Adds library to table in html
function updateTable(library){
   


}