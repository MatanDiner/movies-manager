export const uppercase_sentence = (movie) =>{
    const {Title} = movie;
    let words = Title.split(" ");
    let str = "";
    for(let i=0;i<words.length;i++){
        str += words[i].charAt(0).toUpperCase() + words[i].slice(1) + " ";
    }
    movie.Title = str;
}


export const remove_nonEnglish = (movie) =>{
    const {Title} = movie;
    movie.Title = Title.replace(/[^\w\s]/gi, '').trim();
}