import blogData from "./src/components/Blog/blogData";

console.log("Checking blogData...");
blogData.forEach((blog, index) => {
    console.log(`Blog ${index}:`, blog.author);
    if (typeof blog.author.name !== 'string') {
        console.error(`Error in Blog ${index}: author.name is not a string! It is:`, blog.author.name);
    }
});
console.log("Done.");
