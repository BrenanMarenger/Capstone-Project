const scrollObserver = new IntersectionObserver(
    (entries, scrollObserver) =>{
        entries.forEach((entry) =>{
            if(entry.isIntersecting){
                entry.target.classList.add('enter')
                scrollObserver.unobserve(entry.target)
            }
        })
    }
)

export default{
    bind(element){
        element.classList.add('before-enter')
        scrollObserver.observe(element);

    }
}