import Base from "../components/Base";

function Services(){
    return (
        <Base 
        title="Services we provide" 
        description={"In this page we will discuss about the services we provide."} 
        buttonEnabled={"true"}
        buttonLink="/"
        buttonText="Home"
        buttonType="warning"
        >
            <div>This is service page</div>
        </Base>
    )
}

export default Services;