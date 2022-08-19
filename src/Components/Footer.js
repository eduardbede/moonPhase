export default function Footer(){
    const date = new Date();
    let year = date.getFullYear();
    const an = year + " @eduardbede ";

    return(
            <footer className="flex flex-col items-center static pt-10 bottom-0 left-1/2 text-white ">
                <p>Build by Eduard Bede</p>
                <div className="">
                        {an}  
                        <a href="https://github.com/eduardbede" className="underline decoration-mySecondBlue no_highlights">Visit GitHub</a>
                </div>
                
              </footer>
    )
}